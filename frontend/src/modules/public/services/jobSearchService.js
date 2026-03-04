import { db } from "../../../app/services/firebase/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";

export const JobSearchService = {
  async searchJobs(companyId) {
    try {
      if (!companyId) return { success: false, jobs: [] };

      // Fetch all active jobs for the given companyId
      const q = query(
        collection(db, "jobs"),
        where("company.id", "==", companyId),
        where("status", "==", "active"),
        orderBy("createdAt", "desc") // Still good to have an order
      );
      const snap = await getDocs(q);

      const jobs = snap.docs.map((doc) => ({
        id: doc.id,
       ...doc.data(),
      }));

      return {
        success: true,
        jobs,
      };
    } catch (err) {
      console.error("Job fetch error:", err);
      return { success: false, jobs: [] };
    }
  },
};