// services/hrOnboarding.service.js

import { db } from '../services/firebase/firebase'; // Import your Firestore instance
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Saves or updates the HR representative's and company's profile data in Firestore.
 * This function expects to receive the Firebase User ID (UID) of the currently authenticated user.
 *
 * @param {string} userId - The Firebase UID of the HR user.
 * @param {object} formData - The form data containing representative and company details.
 * @returns {Promise<object>} A promise that resolves with the updated user data.
 * @throws {Error} If the operation fails or userId is missing.
 */
export const saveHROnboardingProfile = async ( formData) => {


  try {
    const userDocRef = doc(db, "users"); // Reference to the user's document in Firestore

    // Check if the document already exists
    const userDocSnap = await getDoc(userDocRef);

    const dataToSave = {
      // Representative Details
      firstName: formData.firstName,
      lastName: formData.lastName,
      designation: formData.designation,
      phone: formData.phone,
      // Company Details
      company: { // Nested object for company details
        name: formData.companyName,
        website: formData.website,
        industry: formData.industry,
        size: formData.companySize, // Renamed for clarity in database
        location: formData.location,
        about: formData.about,
      },
      // You might also store a `profileStatus` here to track onboarding completion
      profileStatus: 'onboarding_complete',
      updatedAt: serverTimestamp(), // Firestore timestamp
    };

    if (userDocSnap.exists()) {
      // Document exists, update it
      await updateDoc(userDocRef, dataToSave);
      console.log("HR profile updated successfully for user:", userId);
    } else {
      // Document does not exist (this shouldn't happen if user was created via signupUserWithEmail),
      // but if it does, create it.
      await setDoc(userDocRef, {
       ...dataToSave,
        createdAt: serverTimestamp(), // Add createdAt only on creation
        role: 'hr', // Ensure the role is set if this is the first time writing to this doc
        email: userDocSnap.data()?.email || formData.email || null, // Preserve email if exists or use from form
      }, { merge: true }); // Use merge to avoid overwriting existing fields like `email` or `role`
      console.log("HR profile created successfully for user:", userId);
    }

    // After saving/updating, fetch the complete updated user document to return
    const updatedUserDocSnap = await getDoc(userDocRef);
    if (updatedUserDocSnap.exists()) {
      return { id: updatedUserDocSnap.id,...updatedUserDocSnap.data() };
    } else {
      throw new Error("Failed to retrieve updated HR profile.");
    }

  } catch (error) {
    console.error("Error saving HR onboarding profile:", error);
    throw error; // Re-throw to be handled by the component
  }
};

/**
 * Fetches the current HR profile data for a given user.
 * This can be useful for pre-filling the onboarding form if the user returns.
 *
 * @param {string} userId - The Firebase UID of the HR user.
 * @returns {Promise<object|null>} A promise that resolves with the HR profile data, or null if not found.
 */
export const getHROnboardingProfile = async (userId) => {
  if (!userId) {
    console.warn("User ID is required to get HR onboarding profile.");
    return null;
  }

  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      // Flatten the company object for easier form pre-filling if needed
      return {
        id: userDocSnap.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        designation: userData.designation,
        phone: userData.phone,
        companyName: userData.company?.name || "",
        website: userData.company?.website || "",
        industry: userData.company?.industry || "",
        companySize: userData.company?.size || "",
        location: userData.company?.location || "",
        about: userData.company?.about || "",
        profileStatus: userData.profileStatus,
        // Add other fields you might need
      };
    }
    return null; // Profile not found
  } catch (error) {
    console.error("Error getting HR onboarding profile:", error);
    throw error;
  }
};

// Add other related functions here, e.g., uploadCompanyLogo
/*
export const uploadCompanyLogo = async (userId, file) => {
  // Implement Firebase Storage logic here
};
*/