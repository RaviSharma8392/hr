import React, { useState } from "react";
import { HelpCircle, Check, FileText } from "lucide-react";

export default function ApplicationStep3({
  job,
  formData,
  handleChange,
  customAnswers,
  handleCustomAnswerChange,
}) {
  // Focus state for the optional cover letter text area
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header Section */}
      <div className="mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Final Review
        </h2>
        <p className="text-[15px] text-gray-500 font-medium max-w-xl leading-relaxed">
          Please answer the questions below and review your application before
          submitting it to the hiring team.
        </p>
      </div>

      {/* ---------------- DYNAMIC EMPLOYER QUESTIONS ---------------- */}
      {job?.screeningQuestions?.length > 0 && (
        <div className="mb-10">
          {/* Context Banner */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 mb-6 flex gap-3.5">
            <div className="p-1.5 bg-white rounded-md shadow-sm h-fit shrink-0">
              <HelpCircle className="w-5 h-5 text-[#008bdc]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-0.5">
                Required by Employer
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                The hiring team at {job?.company?.name || "this company"}{" "}
                requires answers to these specific questions to process your
                application.
              </p>
            </div>
          </div>

          {/* Question Fields */}
          <div className="space-y-6">
            {job.screeningQuestions.map((question, index) => (
              <div key={index} className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-gray-800 leading-snug">
                  {index + 1}. {question}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={customAnswers[index] || ""}
                  onChange={(e) =>
                    handleCustomAnswerChange(index, e.target.value)
                  }
                  rows="3"
                  className="form-input resize-y bg-gray-50/50 focus:bg-white"
                  placeholder="Type your response here..."
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- COVER LETTER (OPTIONAL) ---------------- */}
      <div className="mb-10 border-t border-gray-100 pt-8">
        <div className="flex flex-col gap-2 relative group">
          <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider ml-0.5 flex items-center gap-2">
            <FileText
              className={`w-4 h-4 transition-colors duration-200 ${isFocused ? "text-[#008bdc]" : "text-gray-400 group-hover:text-gray-500"}`}
            />
            Cover Letter{" "}
            <span className="text-gray-400 normal-case tracking-normal font-medium">
              (Optional)
            </span>
          </label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows="4"
            className="form-input resize-y"
            placeholder={`Dear Hiring Manager,\n\nI am writing to express my interest in the ${job?.title || "open"} position...`}
          />
        </div>
      </div>

      {/* ---------------- LEGAL CONSENT ---------------- */}
      <div
        className={`p-5 rounded-xl border transition-colors duration-300 ${formData.consent ? "bg-emerald-50/30 border-emerald-200" : "bg-gray-50 border-gray-200"}`}>
        <div className="flex items-start gap-4">
          <div className="relative flex items-center justify-center mt-0.5 shrink-0">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="peer w-5 h-5 opacity-0 absolute cursor-pointer"
            />
            {/* Custom Checkbox UI */}
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${
                formData.consent
                  ? "bg-[#008bdc] border-[#008bdc]"
                  : "bg-white border-gray-300 peer-hover:border-[#008bdc]"
              }`}>
              <Check
                className={`w-3.5 h-3.5 text-white transition-opacity duration-200 ${formData.consent ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          </div>

          <label
            htmlFor="consent"
            className="text-[13px] sm:text-sm text-gray-600 leading-relaxed cursor-pointer select-none">
            I acknowledge that I have read the{" "}
            <span className="text-[#008bdc] font-medium hover:underline">
              Privacy Policy
            </span>{" "}
            and consent to my personal data being stored and processed by{" "}
            <strong className="text-gray-900">
              {job?.company?.name || "the employer"}
            </strong>{" "}
            for recruitment and hiring purposes.
          </label>
        </div>
      </div>
    </div>
  );
}
