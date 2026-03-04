import React, { useState, useEffect } from "react";
import {
  UploadCloud,
  FileText,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Briefcase,
  Clock,
  Linkedin,
  Globe,
  IndianRupee,
  Code2,
} from "lucide-react";

export default function ApplicationStep2({
  formData,
  handleChange,
  resume,
  handleResumeUpload,
  removeResume,
}) {
  // Local storage resume tracking
  const [savedResume, setSavedResume] = useState(null);
  const [useSaved, setUseSaved] = useState(false);

  // UI Focus tracking for icon color shifting
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    // 1. Check local storage for an existing resume profile
    const storedResume = localStorage.getItem("user_resume_metadata");

    // Fallback Mock for Ravi (Remove fallback object in production)
    const parsedResume = storedResume
      ? JSON.parse(storedResume)
      : {
          name: "Ravi_Portfolio_2026.pdf",
          size: "1.2 MB",
          date: "Feb 28, 2026",
        };

    if (parsedResume) {
      setSavedResume(parsedResume);
      // Default to saved resume ONLY if the user hasn't uploaded a new one in this session
      if (!resume) {
        setUseSaved(true);
      }
    }
  }, [resume]);

  const handleSwitchToUpload = (e) => {
    e.preventDefault();
    setUseSaved(false);
    removeResume(); // Clear any new files if they cancel/switch
  };

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#212121] mb-1">
          Professional Profile
        </h2>
        <p className="text-sm text-[#8A8A8A]">
          Upload your latest resume and share your professional background
          details.
        </p>
      </div>

      {/* ---------------- RESUME UPLOADER MODULE ---------------- */}
      <div className="mb-10">
        <label className="block text-sm font-semibold text-[#484848] mb-3">
          Resume / CV Document <span className="text-red-500">*</span>
        </label>

        {/* STATE A: Show Saved Resume from LocalStorage (Trust/Success Theme) */}
        {useSaved && savedResume && !resume ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border border-emerald-200 bg-emerald-50 rounded-lg transition-all">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="p-3 bg-white rounded-lg shadow-sm border border-emerald-100 text-emerald-600">
                <FileText size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[15px] font-bold text-gray-900">
                    {savedResume.name}
                  </p>
                  <CheckCircle2 size={16} className="text-emerald-500" />
                </div>
                <p className="text-xs text-emerald-700 font-medium mt-0.5">
                  Saved Resume • {savedResume.size}
                </p>
              </div>
            </div>
            <button
              onClick={handleSwitchToUpload}
              className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-[#008BDC] bg-white border border-[#008BDC] rounded hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
              <RefreshCw size={14} /> Upload New
            </button>
          </div>
        ) : resume ? (
          /* STATE B: Show Freshly Uploaded File */
          <div className="flex items-center justify-between p-5 border border-[#008BDC] bg-blue-50/50 rounded-lg transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm text-[#008BDC]">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-[15px] font-bold text-gray-900">
                  {resume.name}
                </p>
                <p className="text-xs text-[#008BDC] font-semibold mt-0.5 uppercase tracking-tighter">
                  {(resume.size / 1024 / 1024).toFixed(2)} MB • Ready to submit
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                removeResume();
              }}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 size={20} />
            </button>
          </div>
        ) : (
          /* STATE C: Show Standard Drag & Drop Zone */
          <div className="relative flex flex-col items-center justify-center w-full py-10 px-4 border-2 border-dashed border-[#DDD] rounded-lg hover:border-[#008BDC] hover:bg-blue-50/30 transition-all cursor-pointer bg-[#FBFBFB] group">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-14 h-14 bg-white border border-[#EEE] rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:text-[#008BDC] transition-colors">
              <UploadCloud
                size={28}
                className="text-gray-400 group-hover:text-[#008BDC]"
              />
            </div>
            <p className="text-sm font-bold text-[#484848]">
              Click to upload resume
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PDF, DOC, DOCX (Max 5MB)
            </p>

            {savedResume && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setUseSaved(true);
                }}
                className="mt-4 text-xs font-bold text-[#008BDC] hover:underline relative z-20">
                Use saved resume ({savedResume.name})
              </button>
            )}
          </div>
        )}
      </div>

      {/* ---------------- FORM FIELDS (INTERNSHALA STYLE) ---------------- */}

      {/* Experience & Notice Period Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-6">
        <FormGroup label="Total Experience" required>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Briefcase
                size={18}
                className={`transition-colors ${focusedField === "experience" ? "text-[#008BDC]" : "text-gray-400"}`}
              />
            </div>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              onFocus={() => handleFocus("experience")}
              onBlur={handleBlur}
              className="form-input pl-10 cursor-pointer appearance-none bg-white">
              <option value="" disabled hidden>
                Select experience
              </option>
              <option value="0">Fresher (0 years)</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3-5">3 - 5 Years</option>
              <option value="5+">5+ Years</option>
            </select>
            <DropdownArrow />
          </div>
        </FormGroup>

        <FormGroup label="Notice Period" required>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock
                size={18}
                className={`transition-colors ${focusedField === "noticePeriod" ? "text-[#008BDC]" : "text-gray-400"}`}
              />
            </div>
            <select
              name="noticePeriod"
              value={formData.noticePeriod}
              onChange={handleChange}
              onFocus={() => handleFocus("noticePeriod")}
              onBlur={handleBlur}
              className="form-input pl-10 cursor-pointer appearance-none bg-white">
              <option value="Immediate">Immediate / Serving</option>
              <option value="15 Days">15 Days</option>
              <option value="1 Month">1 Month</option>
              <option value="2 Months">2 Months</option>
            </select>
            <DropdownArrow />
          </div>
        </FormGroup>
      </div>

      {/* Salary & Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-6">
        <FormGroup label="Expected Salary (LPA)" required>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IndianRupee
                size={18}
                className={`transition-colors ${focusedField === "expectedSalary" ? "text-[#008BDC]" : "text-gray-400"}`}
              />
            </div>
            <input
              type="text"
              name="expectedSalary"
              required
              value={formData.expectedSalary}
              onChange={handleChange}
              onFocus={() => handleFocus("expectedSalary")}
              onBlur={handleBlur}
              className="form-input pl-10"
              placeholder="e.g. 10 LPA"
            />
          </div>
        </FormGroup>

        <FormGroup label="Primary Skillsets" required>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Code2
                size={18}
                className={`transition-colors ${focusedField === "skills" ? "text-[#008BDC]" : "text-gray-400"}`}
              />
            </div>
            <input
              type="text"
              name="skills"
              required
              value={formData.skills}
              onChange={handleChange}
              onFocus={() => handleFocus("skills")}
              onBlur={handleBlur}
              className="form-input pl-10"
              placeholder="e.g. MERN, React, AWS"
            />
          </div>
        </FormGroup>
      </div>

      {/* Professional Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        <FormGroup label="LinkedIn URL">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Linkedin
                size={18}
                className={`transition-colors ${focusedField === "linkedin" ? "text-[#008BDC]" : "text-gray-400"}`}
              />
            </div>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              onFocus={() => handleFocus("linkedin")}
              onBlur={handleBlur}
              className="form-input pl-10"
              placeholder="linkedin.com/in/username"
            />
          </div>
        </FormGroup>

        <FormGroup label="Portfolio / Website">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe
                size={18}
                className={`transition-colors ${focusedField === "portfolio" ? "text-[#008BDC]" : "text-gray-400"}`}
              />
            </div>
            <input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              onFocus={() => handleFocus("portfolio")}
              onBlur={handleBlur}
              className="form-input pl-10"
              placeholder="github.com/username"
            />
          </div>
        </FormGroup>
      </div>
    </div>
  );
}

/* --- Sub-Components --- */

const FormGroup = ({ label, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-[#484848]">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const DropdownArrow = () => (
  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
    <svg
      className="w-4 h-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"></path>
    </svg>
  </div>
);
