import React from "react";
import {
  Plus,
  Trash2,
  HelpCircle,
  FileText,
  CheckCircle2,
  Link,
} from "lucide-react";

const StepScreening = ({ form, setForm }) => {
  const questions = form.screeningQuestions || [];

  const addQuestion = () =>
    setForm((prev) => ({
      ...prev,
      screeningQuestions: [
        ...questions,
        { question: "", type: "text", required: true },
      ],
    }));

  const addPresetQuestion = (preset) => {
    // Prevent adding duplicates
    if (!questions.some((q) => q.question === preset.question)) {
      setForm((prev) => ({
        ...prev,
        screeningQuestions: [...questions, { ...preset, required: true }],
      }));
    }
  };

  const updateQuestion = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;
    setForm((prev) => ({ ...prev, screeningQuestions: updated }));
  };

  const removeQuestion = (index) => {
    setForm((prev) => ({
      ...prev,
      screeningQuestions: questions.filter((_, i) => i !== index),
    }));
  };

  // INTERNSHALA STYLE CLASSES
  const labelStyle =
    "text-[12px] font-bold text-[#484848] mb-1.5 block uppercase tracking-wider";
  const inputStyle =
    "w-full px-3.5 py-2.5 bg-white border border-[#DDD] rounded-md text-[#212121] text-[15px] font-medium placeholder:text-gray-400 placeholder:font-normal focus:bg-white focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC] outline-none transition-all duration-200 shadow-sm";
  const sleekAddBtnStyle =
    "inline-flex items-center gap-1.5 text-[13px] font-bold text-[#008BDC] hover:text-[#0073B6] transition-colors mt-2 p-1 -ml-1 rounded focus:outline-none";

  // Genuine Internshala-style HR Presets
  const presets = [
    {
      question:
        "Are you available for the required duration starting immediately?",
      type: "yes_no",
    },
    {
      question: "Please share a link to your portfolio, GitHub, or Behance.",
      type: "text",
    },
    {
      question: "Are you willing to relocate to the job location?",
      type: "yes_no",
    },
    {
      question:
        "Describe a recent project you worked on related to this field.",
      type: "text",
    },
    { question: "What is your current/expected CTC or Stipend?", type: "text" },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
      {/* Header */}
      <div className="border-b border-[#EEE] pb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-[#212121] leading-tight">
          Screening Questions
        </h2>
        <p className="text-[14px] text-[#8A8A8A] mt-1">
          Ask candidates targeted questions to filter applicants faster.
        </p>
      </div>

      {/* Internshala Core Requirement: Cover Letter */}
      <div className="bg-[#F8F9FA] border border-[#EEE] p-5 rounded-md">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center mt-0.5 shrink-0">
            <input
              type="checkbox"
              name="requireCoverLetter"
              checked={form.requireCoverLetter !== false} // Default to true
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  requireCoverLetter: e.target.checked,
                }))
              }
              className="peer appearance-none w-5 h-5 border-2 border-[#DDD] rounded bg-white checked:bg-[#008BDC] checked:border-[#008BDC] focus:outline-none transition-all"
            />
            <CheckCircle2
              size={14}
              className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-bold text-[#212121] group-hover:text-[#008BDC] transition-colors flex items-center gap-2">
              Require Cover Letter{" "}
              <FileText size={16} className="text-gray-400" />
            </span>
            <span className="text-[13px] text-gray-500 mt-1 leading-relaxed">
              Applicants will be asked:{" "}
              <em>"Why should you be hired for this role?"</em> This is highly
              recommended to judge communication skills and intent.
            </span>
          </div>
        </label>
      </div>

      {/* Suggested Questions (Quick Add Chips) */}
      <div>
        <label className={labelStyle}>Suggested Questions</label>
        <div className="flex flex-wrap gap-2.5 mt-2">
          {presets.map((preset, idx) => {
            const isAdded = questions.some(
              (q) => q.question === preset.question,
            );
            return (
              <button
                key={idx}
                type="button"
                disabled={isAdded}
                onClick={() => addPresetQuestion(preset)}
                className={`px-3.5 py-2 rounded-md text-[12px] font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                  isAdded
                    ? "bg-gray-100 border border-[#EEE] text-gray-400 cursor-not-allowed"
                    : "bg-white border border-[#DDD] text-[#484848] hover:border-[#008BDC] hover:bg-blue-50 hover:text-[#008BDC]"
                }`}>
                {isAdded ? <CheckCircle2 size={14} /> : <Plus size={14} />}
                {preset.question}
              </button>
            );
          })}
        </div>
      </div>

      <div className="h-px bg-[#EEE] w-full" />

      {/* Custom Questions List */}
      <div className="space-y-4">
        <div className="flex justify-between items-end mb-2">
          <label className={`${labelStyle} mb-0`}>Custom Assessment</label>
          <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded">
            {questions.length} Added
          </span>
        </div>

        {questions.length === 0 ? (
          /* Empty State */
          <div className="bg-white border-2 border-dashed border-[#DDD] rounded-md p-8 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-[#F8F9FA] rounded-full flex items-center justify-center mb-3">
              <HelpCircle className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-[14px] font-semibold text-[#484848] mb-1">
              No extra questions added
            </p>
            <p className="text-[13px] text-gray-500 max-w-sm">
              Use the suggestions above or click below to create your own
              screening questions.
            </p>
          </div>
        ) : (
          /* Active Questions */
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div
                key={index}
                className="bg-white border border-[#DDD] p-4 sm:p-5 rounded-md relative group shadow-sm transition-all focus-within:border-[#008BDC]">
                {/* Delete Button (Mobile visible, Desktop hover) */}
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all md:opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Remove question">
                  <Trash2 size={18} />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 pr-8">
                  {/* Question Input */}
                  <div className="sm:col-span-8">
                    <label className="text-[11px] font-bold text-[#008BDC] uppercase tracking-widest mb-1.5 block">
                      Question {index + 1}
                    </label>
                    <input
                      value={q.question}
                      onChange={(e) =>
                        updateQuestion(index, "question", e.target.value)
                      }
                      placeholder="e.g. Do you have a two-wheeler for daily commute?"
                      className={inputStyle}
                      autoFocus={q.question === ""}
                    />
                  </div>

                  {/* Response Type Dropdown */}
                  <div className="sm:col-span-4">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block">
                      Answer Type
                    </label>
                    <div className="relative">
                      <select
                        value={q.type}
                        onChange={(e) =>
                          updateQuestion(index, "type", e.target.value)
                        }
                        className={`${inputStyle} pr-8 cursor-pointer`}>
                        <option value="text">Short Text</option>
                        <option value="yes_no">Yes / No</option>
                        <option value="number">Number</option>
                        <option value="url">URL / Link</option>
                      </select>
                      <ChevronIcon />
                    </div>
                  </div>
                </div>

                {/* Required Toggle */}
                <div className="mt-5 pt-4 border-t border-[#F5F5F5]">
                  <label className="flex items-center gap-2.5 cursor-pointer w-max">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={q.required}
                        onChange={(e) =>
                          updateQuestion(index, "required", e.target.checked)
                        }
                        className="peer appearance-none w-4 h-4 border-2 border-[#DDD] rounded-sm bg-white checked:bg-[#008BDC] checked:border-[#008BDC] focus:outline-none transition-all"
                      />
                      <CheckCircle2
                        size={12}
                        className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                      />
                    </div>
                    <span className="text-[13px] font-semibold text-[#484848]">
                      Mandatory question
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Custom Question Action */}
        <button
          type="button"
          onClick={addQuestion}
          className={sleekAddBtnStyle}>
          <Plus size={16} strokeWidth={3} />
          Add Custom Question
        </button>
      </div>
    </div>
  );
};

// Reusable Chevron for Select inputs
const ChevronIcon = () => (
  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);

export default StepScreening;
