/**
 * Simulates a database or API endpoint that stores branding data for different companies (tenants).
 * In a real application, this would fetch data from a backend service.
 */
const mockBrandingDB = {
  "tenant_google_careers_001": {
    id: "tenant_google_careers_001",
    name: "Google", // Cleaner name for display
    tagline: "Find Your Next Opportunity",
    logo: "https://darwinbox-data-prod-mum.s3.ap-south-1.amazonaws.com/INSTANCE3_a647feda58d4ee_55/logo/a1394701086597d50584098__tenant-avatar-55_54373435.png", // Example Google logo URL

    themeColor: "#1A73E8", // Google Blue
    secondaryColor: "#E8F0FE", // Light Blue Background for elements
    accentColor: "#34A853", // Google Green
    warningColor: "#FBBC05", // Google Yellow
    dangerColor: "#EA4335", // Google Red

    backgroundColor: "#FFFFFF", // Clean White for cards/surfaces
    surfaceColor: "#F8F9FA", // Light Gray Background for the page itself
    textColor: "#202124", // Google Dark Text
    headingColor: "#1F1F1F",
    mutedTextColor: "#5F6368",
    borderColor: "#DADCE0",
    borderRadius: "8px",
    fontFamily: "'Google Sans', 'Roboto', system-ui, -apple-system, sans-serif",

    careersNav: [
      { label: "Jobs", path: "/jobs" },
      { label: "Teams", path: "/teams" },
      { label: "Locations", path: "/locations" },
      { label: "Early Careers", path: "/students" },
      { label: "Life at Google", path: "/culture" },
    ],
    features: {
      showLogin: true,
      showRegister: true,
      showTalentNetworkCTA: true,
      enableSavedJobs: true,
      enableJobAlerts: true,
      enableApplications: true,
      enableCompanyCulturePages: true,
      enableReferralSharing: true,
    },
    socialLinks: {
      linkedin: "https://linkedin.com/company/google",
      twitter: "https://twitter.com/google",
      facebook: "https://facebook.com/google",
    },
  },
  "tenant_meta_careers_002": {
    id: "tenant_meta_careers_002",
    name: "Meta",
    tagline: "Join the Team That Builds the Metaverse",
    logo: "https://darwinbox-data-prod-mum.s3.ap-south-1.amazonaws.com/INSTANCE3_a647feda58d4ee_55/logo/a1394701086597d50584098__tenant-avatar-55_54373435.png", // Example Meta logo URL

    themeColor: "#0078FF", // Meta Blue
    secondaryColor: "#E0F2FF", // Light Meta Blue
    accentColor: "#00C300", // Meta Green (example)
    warningColor: "#FFCC00", // Meta Yellow (example)
    dangerColor: "#FF3B30", // Meta Red (example)

    backgroundColor: "#FFFFFF",
    surfaceColor: "#F0F2F5", // Lighter grey for Meta
    textColor: "#050505", // Meta Dark Text
    headingColor: "#050505",
    mutedTextColor: "#65676B",
    borderColor: "#CED0D4",
    borderRadius: "6px", // Slightly less rounded
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",

    careersNav: [
      { label: "Open Roles", path: "/jobs" },
      { label: "Areas", path: "/areas" },
      { label: "Locations", path: "/locations" },
      { label: "Students", path: "/students" },
      { label: "Culture", path: "/life-at-meta" },
    ],
    features: {
      showLogin: true,
      showRegister: true,
      showTalentNetworkCTA: true,
      enableSavedJobs: true,
      enableJobAlerts: true,
      enableApplications: true,
      enableCompanyCulturePages: true,
      enableReferralSharing: true,
    },
    socialLinks: {
      linkedin: "https://linkedin.com/company/meta",
      twitter: "https://twitter.com/meta",
      facebook: "https://facebook.com/Meta",
    },
  },
  // Add more companies here
};

/**
 * Default branding to use if a specific company's branding is not found.
 */
const genericFallbackBranding = {
  id: "tenant_generic_000",
  name: "Your Company",
  tagline: "Your Next Opportunity Awaits",
  logo: null, // No logo by default, relies on text
  themeColor: "#4F46E5", // Default Indigo
  secondaryColor: "#EEF2FF", // Light Indigo
  accentColor: "#10B981", // Emerald
  warningColor: "#F59E0B", // Amber
  dangerColor: "#EF4444", // Red

  backgroundColor: "#FFFFFF",
  surfaceColor: "#F9FAFB",
  textColor: "#1F2937",
  headingColor: "#111827",
  mutedTextColor: "#6B7280",
  borderColor: "#D1D5DB",
  borderRadius: "6px",
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",

  careersNav: [
    { label: "Jobs", path: "/jobs" },
    { label: "About Us", path: "/about" },
    { label: "Benefits", path: "/benefits" },
  ],
  features: {
    showLogin: true,
    showRegister: true,
    showTalentNetworkCTA: true,
    enableSavedJobs: true,
    enableJobAlerts: true,
    enableApplications: true,
    enableCompanyCulturePages: true,
    enableReferralSharing: true,
  },
  socialLinks: {}, // No social links by default
};

/**
 * Fetches branding data for a given company ID.
 *
 * @param {string} companyId - The ID of the company/tenant whose branding is to be fetched.
 * @returns {Promise<object>} A promise that resolves with the branding data.
 */
export const fetchCompanyBranding = async (companyId = "tenant_google_careers_001") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Look up branding data in our mock "database"
      const brandingData = mockBrandingDB[companyId];

      if (brandingData) {
        resolve(brandingData);
      } else {
        // If not found, log a warning and return generic fallback
        console.warn(`Branding not found for companyId: ${companyId}. Returning generic fallback.`);
        resolve(genericFallbackBranding);
      }
    }, 300); // Simulate network delay
  });
};