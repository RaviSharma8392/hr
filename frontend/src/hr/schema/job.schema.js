export const defaultJobForm = {
  // ==========================================
  // 1. BASIC DETAILS
  // ==========================================
  title: "",
  jobType: "Internship", // Options: "Internship", "Job", "Fresher Job"
  category: "Software Development", // e.g., Engineering, Design, Marketing
  department: "",
  openings: 1, // Internshala ALWAYS requires the number of openings
  workMode: "Work from home", // Options: "Work from home", "In-office", "Hybrid"
  location: [], // Array of cities (e.g., ["Bangalore", "Mumbai"]). Empty if WFH.

  // ==========================================
  // 2. TIMELINE & DURATION
  // ==========================================
  startDateType: "Immediately", // Options: "Immediately" (within 30 days), "Later"
  exactStartDate: "", // Used if startDateType is "Later"
  duration: "3 Months", // Required for Internships (e.g., 1 Month, 3 Months, 6 Months)
  applicationDeadline: "",

  // ==========================================
  // 3. CONTENT & REQUIREMENTS
  // ==========================================
  description: "", // About the company/role
  responsibilities: [""], // "Selected intern's day-to-day responsibilities include:"
  requirements: [""], // "Who can apply" (Eligibility criteria)
  skills: [], // e.g., ["React", "Node.js", "MongoDB"]

  // ==========================================
  // 4. COMPENSATION & PERKS
  // ==========================================
  compensationType: "Fixed", // Options: "Fixed", "Negotiable", "Performance-based", "Unpaid"
  salaryMin: "", // Used as exact stipend if Min = Max
  salaryMax: "",
  currency: "INR",
  salaryPeriod: "Month", // Options: "Month" (for stipend), "Year" (for job CTC)
  variablePay: "", // Bonus, incentives, or performance-based extra pay
  
  // Job specific:
  probation: false, // Is there a probation period before full-time?
  probationDuration: "", // e.g., "3 Months"
  probationSalary: "", // LPA or Monthly during probation

  // Internship specific:
  ppo: false, // Pre-placement Offer (PPO) available after internship?
  ppoSalary: "", // Expected CTC if PPO is granted

  perks: [], // Internshala standard checkboxes: ["Certificate", "Letter of recommendation", "Flexible work hours", "5 days a week", "Informal dress code", "Free snacks & beverages"]

  // ==========================================
  // 5. SCREENING & ASSESSMENT
  // ==========================================
  // Internshala always includes this default cover-letter style question:
  screeningQuestions: [
    "Why should you be hired for this role?" 
  ],
  requireCoverLetter: true,
  requireCustomAssignment: false, // Flag if you want them to submit a link/file

  // ==========================================
  // 6. SYSTEM & META
  // ==========================================
  applicationMethod: "platform", // "platform" (apply within your app) or "external"
  externalApplyUrl: "",
  
  visibility: "public",
  seoTitle: "",
  seoDescription: "",
  status: "draft" // "draft", "active", "closed", "paused"
};