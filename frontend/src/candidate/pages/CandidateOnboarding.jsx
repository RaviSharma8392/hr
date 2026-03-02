import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Briefcase,
  User,
  MapPin,
  Link as LinkIcon,
  GraduationCap,
  Code2,
  FileText,
  UploadCloud,
  X,
  Loader2,
  ArrowRight,
  Phone,
} from "lucide-react";

export default function CandidateOnboarding() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [form, setForm] = useState({
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
    degree: "",
    college: "",
    gradYear: "",
    experience: "fresher", // fresher, 1-3, 3-5, 5+
  });

  // Skills State (Tag Input)
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  // Resume State
  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newSkill = skillInput.trim().toUpperCase();
      if (newSkill && !skills.includes(newSkill) && skills.length < 15) {
        setSkills([...skills, newSkill]);
        setSkillInput("");
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResume(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Send data, skills array, and resume file to Firebase
      // await saveCandidateProfile(user.uid, { ...form, skills, resumeUrl });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to Candidate Dashboard
      navigate("/candidate/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- STYLES ---
  const labelStyle =
    "block text-[12px] font-bold text-[#484848] mb-1.5 uppercase tracking-wider";
  const inputStyle =
    "w-full px-4 py-3 bg-[#F8F9FA] border border-[#DDD] rounded-lg text-[#212121] text-[14px] font-medium placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC] transition-all";
  const iconInputWrapper = "relative flex items-center";
  const iconStyle =
    "absolute left-3.5 text-gray-400 w-4 h-4 pointer-events-none";

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#484848] pb-24 md:pb-12 pt-6 sm:pt-10">
      {/* 1. MINIMAL HEADER */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-8 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className="bg-[#008BDC] p-1.5 rounded-md text-white shadow-sm">
            <Briefcase className="w-5 h-5" />
          </div>
          <span className="text-xl font-black text-[#212121] tracking-tight">
            HRMastery<span className="text-[#008BDC]">.</span>
          </span>
        </Link>
        <span className="text-[12px] font-bold text-[#008BDC] bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
          Profile Setup
        </span>
      </div>

      {/* 2. MAIN ONBOARDING FORM */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-[#212121] tracking-tight mb-2">
            Build your professional profile 🚀
          </h1>
          <p className="text-[15px] text-gray-500 font-medium">
            Stand out to top employers. The more details you provide, the better
            your job matches will be.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* --- SECTION 1: CONTACT & LINKS --- */}
          <div className="bg-white border border-[#EEE] rounded-2xl p-5 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-[#EEE] pb-4">
              <div className="bg-blue-50 text-[#008BDC] p-2 rounded-lg">
                <User size={20} />
              </div>
              <h2 className="text-lg font-bold text-[#212121]">
                Contact & Web Presence
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className={labelStyle}>Phone Number *</label>
                <div className={iconInputWrapper}>
                  <Phone className={iconStyle} />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className={`${inputStyle} pl-10`}
                  />
                </div>
              </div>
              <div>
                <label className={labelStyle}>Current City *</label>
                <div className={iconInputWrapper}>
                  <MapPin className={iconStyle} />
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Bangalore, Mumbai"
                    className={`${inputStyle} pl-10`}
                  />
                </div>
              </div>
              <div>
                <label className={labelStyle}>LinkedIn URL</label>
                <div className={iconInputWrapper}>
                  <LinkIcon className={iconStyle} />
                  <input
                    type="url"
                    name="linkedin"
                    value={form.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className={`${inputStyle} pl-10`}
                  />
                </div>
              </div>
              <div>
                <label className={labelStyle}>Portfolio / GitHub URL</label>
                <div className={iconInputWrapper}>
                  <Briefcase className={iconStyle} />
                  <input
                    type="url"
                    name="portfolio"
                    value={form.portfolio}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    className={`${inputStyle} pl-10`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- SECTION 2: EDUCATION & EXP --- */}
          <div className="bg-white border border-[#EEE] rounded-2xl p-5 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-[#EEE] pb-4">
              <div className="bg-purple-50 text-purple-600 p-2 rounded-lg">
                <GraduationCap size={20} />
              </div>
              <h2 className="text-lg font-bold text-[#212121]">
                Education & Experience
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div className="sm:col-span-2">
                <label className={labelStyle}>Highest Degree *</label>
                <input
                  type="text"
                  name="degree"
                  value={form.degree}
                  onChange={handleChange}
                  required
                  placeholder="e.g. B.Tech in Computer Science"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>College / University *</label>
                <input
                  type="text"
                  name="college"
                  value={form.college}
                  onChange={handleChange}
                  required
                  placeholder="e.g. IIT Delhi"
                  className={inputStyle}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelStyle}>Grad. Year *</label>
                  <input
                    type="text"
                    name="gradYear"
                    value={form.gradYear}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 2024"
                    maxLength="4"
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelStyle}>Experience *</label>
                  <select
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    className={`${inputStyle} cursor-pointer`}>
                    <option value="fresher">Fresher</option>
                    <option value="1-3">1-3 Years</option>
                    <option value="3-5">3-5 Years</option>
                    <option value="5+">5+ Years</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* --- SECTION 3: SKILLS & RESUME --- */}
          <div className="bg-white border border-[#EEE] rounded-2xl p-5 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 border-b border-[#EEE] pb-4">
              <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg">
                <Code2 size={20} />
              </div>
              <h2 className="text-lg font-bold text-[#212121]">
                Skills & Resume
              </h2>
            </div>

            <div className="space-y-8">
              {/* Skills Tag Input */}
              <div>
                <label className={labelStyle}>
                  Core Skills (Press Enter to add)
                </label>
                <div className="p-3 bg-[#F8F9FA] border border-[#DDD] rounded-lg focus-within:border-[#008BDC] focus-within:ring-1 focus-within:ring-[#008BDC] transition-all min-h-[52px] flex flex-wrap gap-2 items-center">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1.5 bg-white border border-[#008BDC]/30 text-[#008BDC] px-3 py-1.5 rounded-md text-[13px] font-bold shadow-sm animate-in zoom-in-95 duration-200">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-red-500 transition-colors focus:outline-none">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                    placeholder={
                      skills.length === 0
                        ? "e.g. REACT, JAVASCRIPT, FIGMA"
                        : "Add more..."
                    }
                    className="flex-1 bg-transparent border-none focus:outline-none text-[14px] font-medium text-[#212121] min-w-[120px] px-1"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-2 font-medium">
                  Add up to 15 skills. This helps us match you with the right
                  jobs.
                </p>
              </div>

              {/* Resume Upload Dropzone */}
              <div>
                <label className={labelStyle}>Upload Resume (PDF) *</label>
                <div className="relative mt-2">
                  <input
                    type="file"
                    accept=".pdf"
                    required={!resume}
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all ${resume ? "border-[#10b981] bg-emerald-50/30" : "border-[#DDD] bg-[#F8F9FA] hover:border-[#008BDC] hover:bg-blue-50/30"}`}>
                    {resume ? (
                      <div className="flex flex-col items-center text-[#10b981] animate-in zoom-in-95 duration-300">
                        <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                          <FileText size={28} />
                        </div>
                        <p className="text-[14px] font-bold">{resume.name}</p>
                        <p className="text-[12px] font-medium mt-1 text-emerald-600/80">
                          Click or drag to replace
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <div className="bg-white p-3 rounded-full shadow-sm mb-3 border border-[#EEE]">
                          <UploadCloud size={28} className="text-[#008BDC]" />
                        </div>
                        <p className="text-[14px] font-bold text-[#484848]">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-[12px] font-medium mt-1">
                          Only PDF format supported (Max 5MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- SUBMIT BAR --- */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#EEE]">
            <p className="text-[12px] text-gray-500 font-medium text-center sm:text-left">
              You can update your profile anytime from your dashboard.
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#008BDC] hover:bg-[#0073B6] text-white px-8 py-3.5 rounded-lg text-[15px] font-bold shadow-[0_4px_14px_rgba(0,139,220,0.3)] transition-all active:scale-95 disabled:opacity-70 disabled:shadow-none">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Saving Profile...
                </>
              ) : (
                <>
                  Save & Go to Dashboard <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
