import { db } from "../../../app/services/firebase/firebase";
import {
  collection,
  doc,
  serverTimestamp,
  writeBatch,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getDoc,
} from "firebase/firestore";

const JOBS_COLLECTION = "jobs";
const PAGE_SIZE = 10;

/* -------------------------------------------------- */
/* Helpers */
/* -------------------------------------------------- */

const generateSlug = (title, id) => {
  if (!title) return id;
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "") + `-${id.substring(0, 6)}` // Shorter, cleaner URLs
  );
};

const validateJobData = (data) => {
  if (!data.title || data.title.trim().length < 3) {
    throw new Error("Job profile/title must be at least 3 characters long.");
  }
  if (!data.category) {
    throw new Error("Job category is required.");
  }
  // Internshala Logic: Location is only required if it's NOT Work From Home
  if (data.workMode !== "Work from home" && (!data.location || data.location.length === 0)) {
    throw new Error("Please specify at least one city for In-office or Hybrid roles.");
  }
};

// Helper to safely serialize Firestore timestamps for React state
const serializeTimestamps = (data) => ({
  ...data,
  createdAt: data.createdAt?.toDate?.().toISOString() || new Date().toISOString(),
  updatedAt: data.updatedAt?.toDate?.().toISOString() || new Date().toISOString(),
});

/* -------------------------------------------------- */
/* Service */
/* -------------------------------------------------- */

export const JobService = {
  /**
   * Creates a new job posting, splitting heavy arrays/text into a subcollection
   * to optimize list query performance and lower Firebase read costs.
   */
  async createJob(data, company) {
    try {
      validateJobData(data);

      // 1. Separate Heavy Data from Lightweight Data
      const {
        description = "",
        responsibilities = [],
        requirements = [],
        skills = [],              // Added for Internshala Schema
        perks = [],               // Added for Internshala Schema
        screeningQuestions = [],
        salaryMin = 0,
        salaryMax = 0,
        ...basicData
      } = data;

      const batch = writeBatch(db);

      // Create reference first (generates ID without network call)
      const jobRef = doc(collection(db, JOBS_COLLECTION));
      const detailsRef = doc(db, JOBS_COLLECTION, jobRef.id, "details", "main");

      const timestamp = serverTimestamp();
      const slug = generateSlug(data.title, jobRef.id);

      /* -------- Lightweight Data (List View) -------- */
      batch.set(jobRef, {
        ...basicData, // Contains jobType, openings, workMode, probation, ppo, etc.
        slug,
        salaryMin: Number(salaryMin),
        salaryMax: Number(salaryMax),
        company: {
          id: company.id,
          name: company.name,
          logo: company.logo || "",
          verified: !!company.verified,
        },
        viewsCount: 0,
        applicationsCount: 0,
        status: "active",
        createdAt: timestamp,
        updatedAt: timestamp,
      });

      /* -------- Heavy Details (Single Job View) -------- */
      batch.set(detailsRef, {
        description,
        responsibilities,
        requirements,
        skills,
        perks,
        screeningQuestions,
        createdAt: timestamp,
        updatedAt: timestamp,
      });

      // Execute single atomic write
      await batch.commit();

      return { success: true, id: jobRef.id };
    } catch (error) {
      console.error("[JobService.createJob] Error:", error);
      return {
        success: false,
        message: error.message || "Failed to create job.",
      };
    }
  },

  /**
   * Updates an existing job using a batch write to keep both
   * lightweight and heavy documents perfectly in sync.
   */
  async updateJob(id, data) {
    try {
      if (!id) throw new Error("Job ID is required.");

      // Separate updated fields
      const {
        description,
        responsibilities,
        requirements,
        skills,
        perks,
        screeningQuestions,
        salaryMin,
        salaryMax,
        ...basicData
      } = data;

      const batch = writeBatch(db);
      const timestamp = serverTimestamp();

      const jobRef = doc(db, JOBS_COLLECTION, id);
      const detailsRef = doc(db, JOBS_COLLECTION, id, "details", "main");

      /* -------- Update Lightweight -------- */
      // Only add fields that actually exist in the payload
      const updateData = { ...basicData, updatedAt: timestamp };
      if (salaryMin !== undefined) updateData.salaryMin = Number(salaryMin);
      if (salaryMax !== undefined) updateData.salaryMax = Number(salaryMax);
      
      batch.update(jobRef, updateData);

      /* -------- Update Heavy -------- */
      const heavyUpdates = { updatedAt: timestamp };
      if (description !== undefined) heavyUpdates.description = description;
      if (responsibilities !== undefined) heavyUpdates.responsibilities = responsibilities;
      if (requirements !== undefined) heavyUpdates.requirements = requirements;
      if (skills !== undefined) heavyUpdates.skills = skills;
      if (perks !== undefined) heavyUpdates.perks = perks;
      if (screeningQuestions !== undefined) heavyUpdates.screeningQuestions = screeningQuestions;

      batch.set(detailsRef, heavyUpdates, { merge: true });

      await batch.commit();

      return { success: true };
    } catch (error) {
      console.error("[JobService.updateJob] Error:", error);
      return {
        success: false,
        message: error.message || "Failed to update job.",
      };
    }
  },

  /**
   * Fetches a paginated list of active jobs for a specific company.
   */
  async getCompanyJobs(companyId, lastDocSnapshot = null, filters = {}) {
    try {
      if (!companyId) {
        throw new Error("Company ID required");
      }

      const {
        status = "active",
        category, // Changed from department to match schema
        jobType
      } = filters;

      /* Build Constraints Array */
      const constraints = [
        where("company.id", "==", companyId),
        where("status", "==", status),
        orderBy("createdAt", "desc"),
      ];

      /* Optional Filters */
      if (category && category !== "all") {
        constraints.push(where("category", "==", category));
      }

      if (jobType && jobType !== "all") {
        constraints.push(where("jobType", "==", jobType));
      }

      /* Pagination */
      if (lastDocSnapshot) {
        constraints.push(startAfter(lastDocSnapshot));
      }

      constraints.push(limit(PAGE_SIZE));

      const q = query(collection(db, JOBS_COLLECTION), ...constraints);
      const snapshot = await getDocs(q);

      return {
        success: true,
        jobs: snapshot.docs.map(doc => ({
          id: doc.id,
          ...serializeTimestamps(doc.data()),
        })),
        lastDoc:
          snapshot.docs.length > 0
            ? snapshot.docs[snapshot.docs.length - 1]
            : null,
        hasMore: snapshot.docs.length === PAGE_SIZE,
      };

    } catch (err) {
      console.error("[getCompanyJobs]", err);
      return {
        success: false,
        message: err.message,
        jobs: [],
        hasMore: false,
        lastDoc: null
      };
    }
  },

  /**
   * Fetches the complete job data by merging Light and Heavy documents.
   * Promise.all ensures both fetches happen simultaneously for speed.
   */
  async getJobById(jobId) {
    try {
      const jobRef = doc(db, JOBS_COLLECTION, jobId);
      const detailRef = doc(db, JOBS_COLLECTION, jobId, "details", "main");

      const [jobSnap, detailSnap] = await Promise.all([
        getDoc(jobRef),
        getDoc(detailRef),
      ]);

      if (!jobSnap.exists()) {
         return { success: false, message: "Job not found." };
      }

      return {
        success: true,
        data: {
          id: jobSnap.id,
          ...serializeTimestamps(jobSnap.data()),
          ...(detailSnap.exists() ? serializeTimestamps(detailSnap.data()) : {}),
        }
      };
    } catch (error) {
      console.error("[JobService.getJobById] Error:", error);
      return {
        success: false,
        message: error.message || "Failed to fetch job details.",
      };
    }
  },
};