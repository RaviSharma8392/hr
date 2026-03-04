import React, { useState } from "react";
import ResumeUploader from "../../components/applyJob/ResumeUploader";
import ScreeningQuestions from "../../components/applyJob/ScreeningQuestions";
import {
  Loader2,
  Mail,
  User,
  ChevronDown,
  Book,
  MessageSquare,
  Award,
  Phone,
  Check,
  CheckCircle2,
  Plus,
  X,
} from "lucide-react";

export default function CandidateForm({
  form,
  updateField,
  job,
  brand,
  onSubmit,
  resumeFile,
  setResumeFile,
  resumeError,
  setResumeError,
  answers,
  setAnswers,
  loading,
  isLoggedInCandidate = false,
}) {
  // Destructure branding with Internshala-style defaults
  const {
    themeColor = "#1295D8",
    themeColorLight = "#E8F5FD",
    backgroundColor = "#FFFFFF",
    headingColor = "#333333",
    mutedTextColor = "#777777",
    borderColor = "#EAEAEA",
    borderRadius = "6px",
    textColor = "#444444",
    surfaceColor = "#F8FAFC",
  } = brand || {};

  const [customSkillInput, setCustomSkillInput] = useState("");

  const commonSkillOptions = [
    "React",
    "Node.js",
    "Python",
    "Java",
    "JavaScript",
    "C++",
    "UI/UX Design",
    "Product Management",
    "Data Analysis",
    "Machine Learning",
    "Digital Marketing",
    "Content Writing",
    "Sales",
    "AWS",
    "SQL",
    "Git",
    "Blockchain",
  ];

  /* --- SKILL HANDLERS --- */
  const toggleSkill = (skill) => {
    const currentSkills = form.skills || [];
    const newSkills = currentSkills.includes(skill)
      ? currentSkills.filter((s) => s !== skill)
      : [...currentSkills, skill];
    updateField("skills", newSkills);
  };

  const addCustomSkill = () => {
    const skillToAdd = customSkillInput.trim();
    if (
      skillToAdd &&
      !(form.skills || []).includes(skillToAdd) &&
      (form.skills || []).length < 10
    ) {
      updateField("skills", [...(form.skills || []), skillToAdd]);
      setCustomSkillInput("");
    }
  };

  const removeCustomSkill = (skillToRemove) => {
    updateField(
      "skills",
      (form.skills || []).filter((s) => s !== skillToRemove),
    );
  };

  /* --- REUSABLE INPUT HELPER --- */
  const renderInput = (
    id,
    label,
    icon,
    type,
    placeholder,
    value,
    readOnly = false,
    optional = false,
  ) => {
    const Icon = icon;
    return (
      <div className="mb-5">
        <label
          htmlFor={id}
          className="block text-[13px] font-semibold mb-1.5"
          style={{ color: headingColor }}>
          {label}{" "}
          {optional && (
            <span className="font-normal" style={{ color: mutedTextColor }}>
              (Optional)
            </span>
          )}
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <Icon size={16} style={{ color: mutedTextColor }} />
          </span>
          <input
            type={type}
            id={id}
            name={id}
            placeholder={placeholder}
            value={value || ""}
            onChange={(e) => updateField(id, e.target.value)}
            readOnly={readOnly}
            required={!optional}
            className={`w-full h-[42px] pl-[38px] pr-4 text-[14px] transition-all outline-none ${
              readOnly ? "cursor-not-allowed" : "hover:border-gray-300"
            }`}
            style={{
              borderColor: borderColor,
              borderRadius: borderRadius,
              backgroundColor: readOnly ? surfaceColor : backgroundColor,
              color: readOnly ? mutedTextColor : textColor,
              border: `1px solid ${borderColor}`,
            }}
            onFocus={(e) => {
              if (!readOnly) {
                e.target.style.borderColor = themeColor;
                e.target.style.boxShadow = `0 0 0 1px ${themeColor}33`;
              }
            }}
            onBlur={(e) => {
              if (!readOnly) {
                e.target.style.borderColor = borderColor;
                e.target.style.boxShadow = "none";
              }
            }}
          />
        </div>
      </div>
    );
  };

  /* --- NUMBERED SECTION WRAPPER --- */
  const FormSection = ({ step, title, children }) => (
    <div className="mb-10">
      <div
        className="flex items-center gap-3 border-b pb-2 mb-5"
        style={{ borderColor }}>
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold"
          style={{ backgroundColor: themeColorLight, color: themeColor }}>
          {step}
        </div>
        <h3 className="text-[16px] font-bold" style={{ color: headingColor }}>
          {title}
        </h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="w-full">
      {/* Quick Apply Banner */}
      <div className="flex items-start gap-3 mb-8 p-4 rounded-lg bg-blue-50/50 border border-blue-100">
        <CheckCircle2
          size={20}
          className="mt-0.5 shrink-0"
          style={{ color: themeColor }}
        />
        <div>
          <h4 className="text-[14px] font-bold" style={{ color: headingColor }}>
            Fast-Track Application
          </h4>
          <p className="text-[13px] mt-0.5" style={{ color: mutedTextColor }}>
            Complete these quick steps to submit your profile directly to the
            employer.
          </p>
        </div>
      </div>

      {/* --- STEP 1: PERSONAL DETAILS --- */}
      <FormSection step="1" title="Personal Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          {renderInput(
            "name",
            "Full Name",
            User,
            "text",
            "e.g. Jane Doe",
            form.name,
            isLoggedInCandidate,
          )}
          {renderInput(
            "email",
            "Email Address",
            Mail,
            "email",
            "jane@example.com",
            form.email,
            isLoggedInCandidate,
          )}
        </div>
        <div className="md:w-[calc(50%-12px)]">
          {renderInput(
            "mobileNumber",
            "Mobile Number",
            Phone,
            "tel",
            "e.g. +91 9876543210",
            form.mobileNumber,
          )}
        </div>
      </FormSection>

      {/* --- STEP 2: RESUME --- */}
      <FormSection step="2" title="Resume">
        <div
          className="bg-slate-50/50 p-2 rounded-lg border border-dashed"
          style={{ borderColor }}>
          <ResumeUploader
            resumeUrl={form.resume}
            updateResumeField={(value) => updateField("resume", value)}
            resumeFile={resumeFile}
            setResumeFile={setResumeFile}
            resumeError={resumeError}
            setResumeError={setResumeError}
            brand={brand}
            isLoggedInCandidate={isLoggedInCandidate}
          />
        </div>
      </FormSection>

      {/* --- STEP 3: PROFESSIONAL PROFILE --- */}
      <FormSection step="3" title="Professional Profile">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          {/* Experience Level */}
          {(!isLoggedInCandidate || !form.experienceLevel) && (
            <div className="mb-5">
              <label
                htmlFor="experienceLevel"
                className="block text-[13px] font-semibold mb-1.5"
                style={{ color: headingColor }}>
                Experience Level
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <Award size={16} style={{ color: mutedTextColor }} />
                </span>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={form.experienceLevel || ""}
                  onChange={(e) =>
                    updateField("experienceLevel", e.target.value)
                  }
                  required
                  className="w-full h-[42px] pl-[38px] pr-10 text-[14px] appearance-none cursor-pointer outline-none transition-all hover:border-gray-300"
                  style={{
                    borderColor: borderColor,
                    borderRadius: borderRadius,
                    backgroundColor: backgroundColor,
                    color: textColor,
                    border: `1px solid ${borderColor}`,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = themeColor;
                    e.target.style.boxShadow = `0 0 0 1px ${themeColor}33`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = borderColor;
                    e.target.style.boxShadow = "none";
                  }}>
                  <option value="" disabled>
                    Select your experience
                  </option>
                  <option value="student">Student / Bootcamper</option>
                  <option value="fresher">Fresher / Graduate</option>
                  <option value="experienced">Experienced Professional</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: mutedTextColor }}
                />
              </div>
            </div>
          )}

          {/* Education */}
          {(!isLoggedInCandidate || !form.education) &&
            renderInput(
              "education",
              "Highest Education",
              Book,
              "text",
              "e.g. B.Tech Computer Science",
              form.education,
              false,
              true,
            )}
        </div>

        {/* Skills Selection */}
        {(!isLoggedInCandidate ||
          (form.skills && form.skills.length === 0)) && (
          <div className="mb-2">
            <label
              className="block text-[13px] font-semibold mb-2.5"
              style={{ color: headingColor }}>
              Top Skills{" "}
              <span className="font-normal" style={{ color: mutedTextColor }}>
                (Add up to 10)
              </span>
            </label>

            {/* Custom Skill Input - Appended directly to list */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                placeholder="Type a skill and click Add..."
                className="flex-1 max-w-[280px] h-[38px] px-3 text-[13px] transition-all outline-none"
                style={{
                  borderColor,
                  borderRadius,
                  backgroundColor,
                  color: textColor,
                  border: `1px solid ${borderColor}`,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = themeColor;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = borderColor;
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCustomSkill();
                  }
                }}
              />
              <button
                type="button"
                onClick={addCustomSkill}
                disabled={
                  (form.skills || []).length >= 10 || !customSkillInput.trim()
                }
                className="h-[38px] px-4 text-[13px] font-semibold text-white transition-opacity disabled:opacity-50 flex items-center gap-1"
                style={{ backgroundColor: themeColor, borderRadius: "4px" }}>
                <Plus size={16} /> Add
              </button>
            </div>

            {/* Display Selected Skills */}
            {(form.skills || []).length > 0 && (
              <div
                className="mb-4 p-3 rounded-lg border bg-slate-50/50"
                style={{ borderColor }}>
                <p
                  className="text-[12px] font-bold uppercase tracking-wider mb-2"
                  style={{ color: mutedTextColor }}>
                  Your Selected Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {(form.skills || []).map((skill) => (
                    <span
                      key={`selected-${skill}`}
                      className="px-2.5 py-1.5 text-[13px] font-semibold transition-all flex items-center gap-1.5 border"
                      style={{
                        backgroundColor: themeColorLight,
                        color: themeColor,
                        borderColor: themeColor,
                        borderRadius: "4px",
                      }}>
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeCustomSkill(skill)}
                        className="p-0.5 rounded-full hover:bg-white/60 transition-colors"
                        aria-label={`Remove ${skill}`}>
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Common Skills Suggestions */}
            <p
              className="text-[12px] font-medium mb-2"
              style={{ color: mutedTextColor }}>
              Or choose from common skills:
            </p>
            <div className="flex flex-wrap gap-2">
              {commonSkillOptions
                .filter((s) => !(form.skills || []).includes(s))
                .map((skill) => {
                  const isMaxed = (form.skills || []).length >= 10;
                  return (
                    <button
                      key={`common-${skill}`}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      disabled={isMaxed}
                      className={`px-3 py-1.5 text-[13px] font-medium transition-all flex items-center gap-1.5 border ${
                        isMaxed
                          ? "opacity-40 cursor-not-allowed"
                          : "active:scale-95 hover:bg-slate-50 hover:border-gray-300"
                      }`}
                      style={{
                        backgroundColor,
                        color: textColor,
                        borderColor,
                        borderRadius: "4px",
                      }}>
                      <Plus size={12} style={{ color: mutedTextColor }} />
                      {skill}
                    </button>
                  );
                })}
            </div>
          </div>
        )}
      </FormSection>

      {/* --- STEP 4: ADDITIONAL INFO --- */}
      <FormSection
        step={job?.screeningQuestions?.length > 0 ? "4" : "4"}
        title="Additional Info">
        <div className="mb-2">
          <label
            htmlFor="coverLetter"
            className="block text-[13px] font-semibold mb-1.5 flex items-center gap-1.5"
            style={{ color: headingColor }}>
            <MessageSquare size={16} style={{ color: mutedTextColor }} />
            Cover Letter{" "}
            <span className="font-normal" style={{ color: mutedTextColor }}>
              (Optional)
            </span>
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            placeholder="Why should you be hired for this role? Mention relevant projects or experience..."
            value={form.coverLetter || ""}
            onChange={(e) => updateField("coverLetter", e.target.value)}
            rows="4"
            className="w-full p-3 text-[14px] transition-all outline-none resize-y hover:border-gray-300"
            style={{
              borderColor: borderColor,
              borderRadius: borderRadius,
              backgroundColor: backgroundColor,
              color: textColor,
              border: `1px solid ${borderColor}`,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = themeColor;
              e.target.style.boxShadow = `0 0 0 1px ${themeColor}33`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = borderColor;
              e.target.style.boxShadow = "none";
            }}
          />
        </div>
      </FormSection>

      {/* --- STEP 5: SCREENING QUESTIONS --- */}
      {job?.screeningQuestions && job.screeningQuestions.length > 0 && (
        <FormSection step="5" title="Employer Questions">
          <ScreeningQuestions
            questions={job.screeningQuestions}
            answers={answers}
            setAnswers={setAnswers}
            brand={brand}
          />
        </FormSection>
      )}

      {/* --- SUBMIT BUTTON --- */}
      <div className="pt-6 mt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto md:min-w-[240px] ml-auto px-8 py-3.5 flex items-center justify-center font-bold text-[15px] text-white transition-all duration-200 shadow-md hover:shadow-lg hover:opacity-95 active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
          style={{ backgroundColor: themeColor, borderRadius: "6px" }}>
          {loading ? (
            <Loader2 className="animate-spin" size={20} color="#FFFFFF" />
          ) : (
            "Submit Application"
          )}
        </button>
      </div>
    </form>
  );
}
