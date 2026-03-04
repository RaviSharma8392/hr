import { db, storage, ref, uploadBytes, getDownloadURL } from "../../../../app/services/firebase/firebase";
import { collection, addDoc, query, where, getDocs, Timestamp } from "firebase/firestore";
// import { v4 as uuidv4 } from 'uuid'; // You might need uuid to generate unique filenames

const APPLICATIONS_COLLECTION = "jobApplications";
const RESUMES_STORAGE_PATH = "resumes/"; // Path in Firebase Storage

// Assuming you have a utility to normalize errors, similar to AuthService
const normalizeError = (error) => {
  if (!error) return "Something went wrong.";
  if (typeof error === 'string') return error;
  return error.message || "An unexpected error occurred.";
};

export const ApplicationService = {

  // Function to upload resume file to Firebase Storage
  async uploadResume(file, userId) {
    if (!file) throw new Error("No resume file provided.");
    if (!userId) throw new Error("User ID is required for resume upload.");

    const fileExtension = file.name.split('.').pop();
    const fileName = `${userId}_${Date.now()}.${fileExtension}`; // Unique filename
    const storageRef = ref(storage, `${RESUMES_STORAGE_PATH}${fileName}`);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  },

  /* Apply for Job */
  async applyForJob(applicationData) {
    try {
      const { jobId, userId, name, email, resume, skills, experienceLevel, education, coverLetter,...additionalFormData } = applicationData;

      // Basic validation for critical fields
      if (!jobId ||!userId ||!name ||!email ||!resume) {
        throw new Error("Missing essential application details. Please fill in all fields.");
      }

      /* Prevent Duplicate Applications */
      // If userId is 'guest-user', we should allow multiple guest applications unless
      // you have a more sophisticated way to identify guests (e.g., by email + job).
      // For now, only prevent duplicate applications for logged-in users.
      // For guest users, check by email + job ID
      const queryConditions = [
        where("jobId", "==", jobId),
        where("email", "==", email)
      ];

      // If it's a logged-in user, also add userId condition
      if (userId!== "guest-user") {
        queryConditions.push(where("userId", "==", userId));
      }

      const q = query(collection(db, APPLICATIONS_COLLECTION),...queryConditions);
      const existingApplications = await getDocs(q);

      if (!existingApplications.empty) {
        throw new Error("An application with this email for this job already exists.");
      }

      // Construct the application payload
      const payload = {
        jobId,
        userId,
        name,
        email,
        resume, // This will be the URL (either link or uploaded file URL)
        skills: skills || [],
        experienceLevel: experienceLevel || "",
        education: education || "",
        coverLetter: coverLetter || "",
       ...additionalFormData,
        status: "pending",
        createdAt: Timestamp.now(),
      };

      // Add the application document
      const docRef = await addDoc(
        collection(db, APPLICATIONS_COLLECTION),
        payload
      );

      return { success: true, message: "Application submitted successfully!", id: docRef.id };

    } catch (err) {
      console.error("Application Service Error:", err);
      return { success: false, message: normalizeError(err) };
    }
  }
};