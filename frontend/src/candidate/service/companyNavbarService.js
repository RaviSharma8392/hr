/**
 * White Label SaaS Mock Branding Service
 * Replace this with real API:
 * Example:
 * fetch(`/api/tenant/${tenantId}/branding`)
 */

export const fetchCompanyBranding = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "tenant_meta_style_001",

        /* ================= BRANDING ================= */
        name: "Meta Careers",
        tagline: "Connecting People With Opportunities",

        logo: "https://static.xx.fbcdn.net/rsrc.php/y9/r/tL_v571NdZ0.svg",

        themeColor: "#1877F3", // Meta Blue

        fontFamily: "'Inter', system-ui, sans-serif",

        /* ================= NAVIGATION ================= */
        careersNav: [
          { label: "Jobs", path: "/jobs" },
          { label: "Engineering", path: "/engineering" },
          { label: "Design", path: "/design" },
          { label: "Research", path: "/research" },
          { label: "Students & Interns", path: "/students" },
        ],

        /* ================= FEATURES ENABLED ================= */
        features: {
          enableSavedJobs: true,
          enableJobAlerts: true,
          enableApplications: true,
          enableCompanyCulturePages: true,
        },

        /* ================= COMPANY PORTAL SETTINGS ================= */
        portalSettings: {
          showLogin: true,
          showRegister: true,
          showTalentNetworkCTA: true,
        },

        /* ================= SOCIAL / FOOTER ================= */
        socialLinks: {
          linkedin: "https://linkedin.com",
          twitter: "https://twitter.com",
          facebook: "https://facebook.com",
        },
      });
    }, 200);
  });
};