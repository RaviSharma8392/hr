// src/hooks/useApplicationForm.js
import { useState, useCallback } from 'react';

export const useApplicationForm = (initialFormState) => {
  const [form, setForm] = useState(initialFormState);

  const updateField = useCallback((fieldName, value) => {
    setForm(prevForm => ({
     ...prevForm,
      [fieldName]: value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setForm(initialFormState);
  }, [initialFormState]);

  return { form, updateField, setForm, resetForm };
};

// Initial state for the full form
export const initialApplicationFormState = {
  name: "",
  email: "",
  mobileNumber: "",
  resume: "", // Can be URL or filename of uploaded file
  skills: [], // Array of strings
  experienceLevel: "", // "student", "fresher", "experienced"
  education: "",
  coverLetter: "",
  // Add any other fields here
};