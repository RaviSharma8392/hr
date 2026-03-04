import { db } from "../../../../app/services/firebase/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

/**
 * CandidateService - Optimized for Single-Collection (Applications Only)
 */
export const CandidateService = {
  
  /**
   * 1. MOCK UPLOAD RESUME
   * Simulation logic to keep the frontend flow functional without Storage costs.
   */
  async uploadResume(uid, file) {
    try {
      console.log(`🚀 [MOCK] Logged Resume: ${file.name} for UID: ${uid}`);
      
      // Return a placeholder that satisfies the Firestore string requirement
      return { 
        success: true, 
        url: "https://via.placeholder.com/resume_placeholder.pdf" 
      };
    } catch (err) {
      return { success: false, message: "Upload simulation failed." };
    }
  },

  /**
   * 2. APPLY FOR JOB
   * The ONLY API call needed. Saves everything into a single document.
   * Logic includes workflow and status for HR management.
   */
  async applyJobApplication(applicationId, payload) {
    try {
      const appRef = doc(db, "applications", applicationId);
      
      // Clean and Structure the data for the Application record
      const finalApplication = {
        ...payload,
        // HR Workflow state - contained within the application
        workflow: {
          status: "applied",
          isShortlisted: false,
          isRejected: false,
          notes: ""
        },
        // Metadata for tracking
        metadata: {
          platform: "HRMastery",
          device: window.innerWidth < 768 ? "mobile" : "desktop",
        },
        appliedAt: serverTimestamp(),
      };

      await setDoc(appRef, finalApplication);

      return { success: true };
    } catch (err) {
      console.error("Application submission error:", err);
      return { success: false, message: err.message };
    }
  },
};