import { db } from "../../../../app/services/firebase/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

const JOBS_COLLECTION = "jobs";
const DEFAULT_PAGE_SIZE = 12;

/**
 * Standardizes Firebase timestamps and prevents nested object mutation.
 */
const serialize = (data) => {
  if (!data) return null;
  const obj = { ...data };
  for (const key in obj) {
    if (obj[key]?.toDate) {
      obj[key] = obj[key].toDate().toISOString();
    }
  }
  return obj;
};

export const jobDetailService = {
  /**
   * 1. GET ALL JOBS (High Scalability Feed)
   * Optimization: Only fetches summary data. 
   * Call this for the main job feed or company careers page.
   */
  async getCompanyJobs(companyId, lastDoc = null, filters = {}) {
    try {
      if (!companyId) throw new Error("Company ID required");

      const { status = "active", category, jobType } = filters;

      // Start building optimized query
      let q = query(
        collection(db, JOBS_COLLECTION),
        where("company.id", "==", companyId),
        where("status", "==", status),
        orderBy("createdAt", "desc")
      );

      // Add conditional filters
      if (category && category !== "all") q = query(q, where("category", "==", category));
      if (jobType && jobType !== "all") q = query(q, where("employmentType", "==", jobType));
      
      // Pagination handling
      if (lastDoc) q = query(q, startAfter(lastDoc));
      q = query(q, limit(DEFAULT_PAGE_SIZE));

      const snap = await getDocs(q);

      // Map results with minimal processing
      const jobs = snap.docs.map(d => ({
        id: d.id,
        ...serialize(d.data())
      }));

      return {
        success: true,
        jobs,
        lastDoc: snap.docs[snap.docs.length - 1] || null,
        hasMore: snap.docs.length === DEFAULT_PAGE_SIZE
      };
    } catch (err) {
      return { success: false, jobs: [], message: err.message };
    }
  },

  /**
   * 2. GET JOB BY ID (Single API Call)
   * Optimization: We now assume 'description' and 'requirements' are in the main doc.
   * This reduces 2 API calls to 1.
   */
  async getJobById(jobId) {
    try {
      if (!jobId) return { success: false, message: "Invalid ID" };

      const jobRef = doc(db, JOBS_COLLECTION, jobId);
      const jobSnap = await getDoc(jobRef);

      if (!jobSnap.exists()) {
        return { success: false, message: "Job not found" };
      }

      const data = serialize(jobSnap.data());

      // Security/Cleanliness check: ensure status is active before showing details
      if (data.status !== "active") {
        return { success: false, message: "This position is no longer accepting applications" };
      }

      return {
        success: true,
        data: { id: jobSnap.id, ...data }
      };
    } catch (err) {
      return { success: false, message: "Failed to load job details" };
    }
  },

  /**
   * 3. GET RECOMMENDATIONS (Fastest Fetch)
   * Logic: Only fetch the top 3 IDs and Titles to save bandwidth.
   */
  async getSimilarJobs(companyId, currentJobId) {
    try {
      // Scale optimization: Use a simpler query for suggestions
      const q = query(
        collection(db, JOBS_COLLECTION),
        where("company.id", "==", companyId),
        where("status", "==", "active"),
        limit(4) 
      );

      const snap = await getDocs(q);
      const jobs = snap.docs
        .filter(d => d.id !== currentJobId)
        .map(d => {
            const data = d.data();
            return {
                id: d.id,
                title: data.title,
                location: data.location,
                employmentType: data.employmentType
            };
        })
        .slice(0, 3);

      return { success: true, jobs };
    } catch (err) {
      return { success: false, jobs: [] };
    }
  }
};