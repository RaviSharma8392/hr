import React, { useState, useEffect } from "react";
import {
  Inbox,
  Filter,
  MessageSquare,
  BellRing,
  Save,
  CheckCircle2,
  Mail,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export default function HRSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("routing");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // MOCK HIRING/APPLICATION FORM STATE
  const [form, setForm] = useState({
    // Routing
    routingMethod: "platform", // platform, email, external
    forwardingEmail: "hr@nexussystems.com",
    externalAtsUrl: "",

    // Screening
    requireCoverLetter: true,
    autoRejectLocation: false,
    autoRejectExperience: true,

    // Auto-Replies
    sendAutoReply: true,
    autoReplyMessage:
      "Hi there! Thank you for applying to Nexus Systems. Our team is reviewing your application and will get back to you within 3-5 business days if your profile matches our requirements.",

    // Team Notifications
    notifyOnApply: "digest", // instant, digest, none
  });

  // SIMULATE LAZY LOADING
  useEffect(() => {
    const fetchSettings = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsLoading(false);
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // --- STYLES ---
  const labelStyle =
    "text-[12px] font-bold text-[#484848] mb-1.5 uppercase tracking-wider block";
  const inputStyle =
    "w-full px-3.5 py-2.5 bg-white border border-[#DDD] rounded-md text-[#212121] text-[15px] font-medium placeholder:text-gray-400 focus:bg-white focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC] outline-none transition-all duration-200 shadow-sm";

  const tabs = [
    { id: "routing", label: "Application Routing", icon: <Inbox size={18} /> },
    { id: "screening", label: "Screening Rules", icon: <Filter size={18} /> },
    {
      id: "autoreply",
      label: "Auto-Replies",
      icon: <MessageSquare size={18} />,
    },
    { id: "alerts", label: "Team Alerts", icon: <BellRing size={18} /> },
  ];

  // ==========================================
  // SKELETON UI
  // ==========================================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] pb-24 md:pb-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          <div className="w-full md:w-60 lg:w-64 shrink-0 flex gap-3 md:flex-col overflow-x-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-11 bg-gray-200 rounded-md shrink-0 w-40 md:w-full"></div>
            ))}
          </div>
          <div className="flex-1 bg-white border border-[#EEE] rounded-xl p-6 sm:p-8">
            <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="space-y-4 mb-8">
              <div className="h-20 bg-gray-200 rounded-lg w-full"></div>
              <div className="h-20 bg-gray-200 rounded-lg w-full"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN SETTINGS UI
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24 md:pb-12 text-[#484848] font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#212121] tracking-tight">
            Hiring & Application Settings
          </h1>
          <p className="text-[14px] text-[#8A8A8A] mt-1">
            Configure how you receive applications, automated screening, and
            candidate communication.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {/* 1. NAVIGATION TABS */}
          <div className="w-full md:w-60 lg:w-64 shrink-0">
            <nav className="flex md:flex-col overflow-x-auto hide-scrollbar snap-x gap-2 pb-2 md:pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md text-[14px] font-bold transition-all duration-200 shrink-0 snap-start
                    ${
                      activeTab === tab.id
                        ? "bg-blue-50/50 text-[#008BDC] shadow-[0_0_0_1px_#008BDC]"
                        : "bg-transparent text-[#8A8A8A] hover:bg-[#EEE] hover:text-[#212121]"
                    }`}>
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* 2. TAB CONTENT AREA */}
          <div className="flex-1 bg-white border border-[#EEE] rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* --- APPLICATION ROUTING TAB --- */}
            {activeTab === "routing" && (
              <div className="p-5 sm:p-8">
                <h2 className="text-lg font-bold text-[#212121] border-b border-[#EEE] pb-4 mb-6">
                  Application Destination
                </h2>

                <p className="text-[13px] text-gray-500 mb-4">
                  Choose where candidates should be directed when they click
                  "Apply Now" on your job postings.
                </p>

                <div className="space-y-4 mb-6">
                  {/* Option 1: In Platform */}
                  <label
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${form.routingMethod === "platform" ? "border-[#008BDC] bg-blue-50/30" : "border-[#DDD] hover:border-[#008BDC]"}`}>
                    <input
                      type="radio"
                      name="routingMethod"
                      value="platform"
                      checked={form.routingMethod === "platform"}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-[#008BDC] focus:ring-[#008BDC]"
                    />
                    <div>
                      <span className="text-[14px] font-bold text-[#212121] block">
                        In-Platform ATS (Recommended)
                      </span>
                      <span className="text-[13px] text-gray-500">
                        Collect and manage all applications directly inside this
                        HR dashboard.
                      </span>
                    </div>
                  </label>

                  {/* Option 2: Email */}
                  <label
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${form.routingMethod === "email" ? "border-[#008BDC] bg-blue-50/30" : "border-[#DDD] hover:border-[#008BDC]"}`}>
                    <input
                      type="radio"
                      name="routingMethod"
                      value="email"
                      checked={form.routingMethod === "email"}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-[#008BDC] focus:ring-[#008BDC]"
                    />
                    <div className="w-full">
                      <span className="text-[14px] font-bold text-[#212121] block">
                        Email Forwarding
                      </span>
                      <span className="text-[13px] text-gray-500 block mb-3">
                        Send applicant resumes and details directly to an email
                        address.
                      </span>
                      {form.routingMethod === "email" && (
                        <div className="relative animate-in fade-in duration-200">
                          <Mail
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="email"
                            name="forwardingEmail"
                            value={form.forwardingEmail}
                            onChange={handleChange}
                            placeholder="hr@yourcompany.com"
                            className={`${inputStyle} pl-10`}
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Option 3: External URL */}
                  <label
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${form.routingMethod === "external" ? "border-[#008BDC] bg-blue-50/30" : "border-[#DDD] hover:border-[#008BDC]"}`}>
                    <input
                      type="radio"
                      name="routingMethod"
                      value="external"
                      checked={form.routingMethod === "external"}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-[#008BDC] focus:ring-[#008BDC]"
                    />
                    <div className="w-full">
                      <span className="text-[14px] font-bold text-[#212121] block">
                        External Website / ATS
                      </span>
                      <span className="text-[13px] text-gray-500 block mb-3">
                        Redirect candidates to a custom URL (like Lever,
                        Greenhouse, or your site).
                      </span>
                      {form.routingMethod === "external" && (
                        <div className="relative animate-in fade-in duration-200">
                          <ExternalLink
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="url"
                            name="externalAtsUrl"
                            value={form.externalAtsUrl}
                            onChange={handleChange}
                            placeholder="https://careers.company.com"
                            className={`${inputStyle} pl-10`}
                          />
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* --- SCREENING RULES TAB --- */}
            {activeTab === "screening" && (
              <div className="p-5 sm:p-8 animate-in fade-in duration-300">
                <h2 className="text-lg font-bold text-[#212121] border-b border-[#EEE] pb-4 mb-6">
                  Automated Screening Rules
                </h2>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-md flex gap-3 items-start mb-6">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[13px] text-amber-800 leading-relaxed font-medium">
                    Auto-rejection rules permanently hide unqualified candidates
                    from your main pipeline. Use these settings carefully to
                    avoid missing out on potential talent.
                  </p>
                </div>

                <div className="space-y-6">
                  <ToggleOption
                    title="Mandatory Cover Letter"
                    description="Force all candidates to answer 'Why should you be hired for this role?' before applying."
                    checked={form.requireCoverLetter}
                    onChange={(e) =>
                      setForm({ ...form, requireCoverLetter: e.target.checked })
                    }
                  />
                  <div className="w-full h-px bg-[#EEE]"></div>
                  <ToggleOption
                    title="Auto-Reject by Location"
                    description="Automatically reject candidates who do not live in the specified job location."
                    checked={form.autoRejectLocation}
                    onChange={(e) =>
                      setForm({ ...form, autoRejectLocation: e.target.checked })
                    }
                  />
                  <div className="w-full h-px bg-[#EEE]"></div>
                  <ToggleOption
                    title="Auto-Reject by Experience"
                    description="Automatically reject candidates who have less experience than the required minimum."
                    checked={form.autoRejectExperience}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        autoRejectExperience: e.target.checked,
                      })
                    }
                  />
                </div>
              </div>
            )}

            {/* --- AUTO-REPLIES TAB --- */}
            {activeTab === "autoreply" && (
              <div className="p-5 sm:p-8 animate-in fade-in duration-300">
                <h2 className="text-lg font-bold text-[#212121] border-b border-[#EEE] pb-4 mb-6">
                  Candidate Auto-Replies
                </h2>

                <ToggleOption
                  title="Enable Auto-Reply Email"
                  description="Send an automated confirmation email to candidates as soon as they apply."
                  checked={form.sendAutoReply}
                  onChange={(e) =>
                    setForm({ ...form, sendAutoReply: e.target.checked })
                  }
                />

                {form.sendAutoReply && (
                  <div className="mt-6 animate-in slide-in-from-top-2 fade-in duration-300">
                    <label className={labelStyle}>
                      Auto-Reply Message Template
                    </label>
                    <textarea
                      name="autoReplyMessage"
                      value={form.autoReplyMessage}
                      onChange={handleChange}
                      rows={6}
                      className={`${inputStyle} resize-y text-[14px] leading-relaxed`}
                      placeholder="Hi [Candidate Name], thank you for applying..."
                    />
                    <p className="text-[12px] text-gray-500 mt-2 font-medium">
                      Variables like{" "}
                      <span className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                        [Candidate Name]
                      </span>{" "}
                      and{" "}
                      <span className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                        [Job Title]
                      </span>{" "}
                      will be filled automatically.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* --- TEAM ALERTS TAB --- */}
            {activeTab === "alerts" && (
              <div className="p-5 sm:p-8 animate-in fade-in duration-300">
                <h2 className="text-lg font-bold text-[#212121] border-b border-[#EEE] pb-4 mb-6">
                  Hiring Team Notifications
                </h2>

                <label className={labelStyle}>
                  When should HR receive email alerts?
                </label>
                <div className="space-y-3 mt-3">
                  <label
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${form.notifyOnApply === "instant" ? "border-[#008BDC] bg-blue-50/30" : "border-[#DDD] hover:border-[#008BDC]"}`}>
                    <input
                      type="radio"
                      name="notifyOnApply"
                      value="instant"
                      checked={form.notifyOnApply === "instant"}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#008BDC] focus:ring-[#008BDC]"
                    />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[#212121]">
                        Instant Alert
                      </span>
                      <span className="text-[13px] text-gray-500">
                        Email me immediately for every single application.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${form.notifyOnApply === "digest" ? "border-[#008BDC] bg-blue-50/30" : "border-[#DDD] hover:border-[#008BDC]"}`}>
                    <input
                      type="radio"
                      name="notifyOnApply"
                      value="digest"
                      checked={form.notifyOnApply === "digest"}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#008BDC] focus:ring-[#008BDC]"
                    />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[#212121]">
                        Daily Digest (Recommended)
                      </span>
                      <span className="text-[13px] text-gray-500">
                        Send me one email at the end of the day summarizing all
                        new applicants.
                      </span>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${form.notifyOnApply === "none" ? "border-[#008BDC] bg-blue-50/30" : "border-[#DDD] hover:border-[#008BDC]"}`}>
                    <input
                      type="radio"
                      name="notifyOnApply"
                      value="none"
                      checked={form.notifyOnApply === "none"}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#008BDC] focus:ring-[#008BDC]"
                    />
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-[#212121]">
                        Do Not Notify
                      </span>
                      <span className="text-[13px] text-gray-500">
                        I will manually check the dashboard.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* 3. STICKY BOTTOM ACTION BAR */}
            <div className="bg-[#F8F9FA] border-t border-[#EEE] p-5 sm:px-8 flex items-center justify-between">
              {showSuccess ? (
                <span className="flex items-center gap-2 text-[14px] font-bold text-[#10b981] animate-in slide-in-from-left-4">
                  <CheckCircle2 size={18} /> Settings saved
                </span>
              ) : (
                <span />
              )}

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center justify-center gap-2 bg-[#008BDC] hover:bg-[#0073B6] text-white px-6 py-2.5 rounded-md text-[14px] font-bold shadow-sm transition-all active:scale-95 disabled:opacity-70 w-full sm:w-auto">
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{" "}
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} /> Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS to hide scrollbar on mobile tabs */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </div>
  );
}

// --- Reusable Toggle Component ---
const ToggleOption = ({ title, description, checked, onChange }) => (
  <label className="flex items-start sm:items-center justify-between gap-4 cursor-pointer group">
    <div className="flex flex-col pr-4">
      <span className="text-[14px] font-bold text-[#212121] group-hover:text-[#008BDC] transition-colors">
        {title}
      </span>
      <span className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">
        {description}
      </span>
    </div>
    <div className="relative shrink-0 mt-1 sm:mt-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`block w-11 h-6 rounded-full transition-colors duration-300 ${checked ? "bg-[#008BDC]" : "bg-gray-300"}`}></div>
      <div
        className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-300 ${checked ? "transform translate-x-5" : ""}`}></div>
    </div>
  </label>
);
