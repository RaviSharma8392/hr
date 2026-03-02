import React, { useState } from "react";
import { Plus, X, Trash2, Info, Lightbulb } from "lucide-react";

const StepContent = ({ form, setForm }) => {
  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm((prev) => ({ ...prev, [field]: updated }));
  };

  const addField = (field) =>
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));

  const removeField = (field, index) =>
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));

  // Skills specific logic
  const [skillInput, setSkillInput] = useState("");
  const handleAddSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!form.skills.includes(skillInput.trim())) {
        setForm((prev) => ({
          ...prev,
          skills: [...prev.skills, skillInput.trim()],
        }));
      }
      setSkillInput("");
    }
  };
  const removeSkill = (skillToRemove) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // INTERNSHALA STYLE CLASSES
  const labelStyle =
    "text-[12px] font-bold text-[#484848] mb-1.5 block uppercase tracking-wider";
  const inputStyle =
    "w-full px-3.5 py-2.5 bg-white border border-[#DDD] rounded-md text-[#212121] text-[15px] font-medium placeholder:text-gray-400 placeholder:font-normal focus:bg-white focus:border-[#008BDC] focus:ring-1 focus:ring-[#008BDC] outline-none transition-all duration-200 shadow-sm";
  const sleekAddBtnStyle =
    "inline-flex items-center gap-1.5 text-[13px] font-bold text-[#008BDC] hover:text-[#0073B6] transition-colors mt-2 p-1 -ml-1 rounded focus:outline-none";

  const dynamicSections = [
    {
      id: "responsibilities",
      title: "Day-to-day Responsibilities",
      subtitle: "What will the candidate do on a daily basis?",
      placeholder: "e.g. Develop and maintain scalable React applications...",
      addButton: "Add another responsibility",
    },
    {
      id: "requirements",
      title: "Who can apply? (Requirements)",
      subtitle: "List the essential education, certifications, and experience.",
      placeholder:
        "e.g. Must have a B.Tech in Computer Science or related field...",
      addButton: "Add another requirement",
    },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-300">
      {/* Header */}
      <div className="border-b border-[#EEE] pb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-[#212121] leading-tight">
          Job Content
        </h2>
        <p className="text-[14px] text-[#8A8A8A] mt-1">
          Draft the external-facing description that candidates will read.
        </p>
      </div>

      {/* Internshala Best Practice Card */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-md p-4 flex gap-3.5 items-start">
        <Lightbulb className="w-5 h-5 text-[#008BDC] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-[13px] font-bold text-[#008BDC]">
            Pro Tip for High Conversion
          </h4>
          <p className="text-[13px] text-gray-600 mt-1 leading-relaxed">
            Keep bullet points concise. Postings with 4-6 clear bullet points
            per section receive{" "}
            <strong className="text-[#212121]">40% more applications</strong>{" "}
            from top-tier candidates than long paragraphs.
          </p>
        </div>
      </div>

      {/* Role Overview / About Company */}
      <div>
        <div className="flex justify-between items-end mb-1.5">
          <label className={labelStyle}>
            About the role / Company <span className="text-red-500">*</span>
          </label>
        </div>
        <textarea
          name="description"
          value={form.description}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Provide a brief, exciting overview of your company and why this role matters..."
          rows={4}
          className={`${inputStyle} resize-y min-h-[100px] leading-relaxed`}
        />
      </div>

      <div className="h-px bg-[#EEE] w-full" />

      {/* Skills Required (Tag System) */}
      <div>
        <label className={labelStyle}>
          Skills Required{" "}
          <span className="text-gray-400 font-normal normal-case tracking-normal ml-1">
            (Optional)
          </span>
        </label>
        <p className="text-[13px] text-gray-500 mb-3">
          Add skills to help us match your job with the right candidates.
        </p>

        <div className="border border-[#DDD] rounded-md bg-white p-2 shadow-sm focus-within:border-[#008BDC] focus-within:ring-1 focus-within:ring-[#008BDC] transition-all">
          <div className="flex flex-wrap gap-2 mb-2">
            {form.skills?.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F8F9FA] border border-[#EEE] text-[#212121] text-[13px] font-semibold rounded-md">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-gray-400 hover:text-red-500 transition-colors">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleAddSkill}
            placeholder={
              form.skills?.length === 0
                ? "e.g. JavaScript, SEO, Figma (Press Enter to add)"
                : "Type and press enter..."
            }
            className="w-full px-2 py-1 text-[15px] font-medium text-[#212121] placeholder:text-gray-400 placeholder:font-normal outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="h-px bg-[#EEE] w-full" />

      {/* Dynamic Sections (Responsibilities & Requirements) */}
      <div className="space-y-10">
        {dynamicSections.map((section) => (
          <div key={section.id} className="space-y-4">
            <div>
              <label className={labelStyle}>
                {section.title} <span className="text-red-500">*</span>
              </label>
              <p className="text-[13px] text-gray-500">{section.subtitle}</p>
            </div>

            {/* List Items Container */}
            <div className="space-y-3">
              {form[section.id].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group relative">
                  {/* Custom Numbered/Bullet Marker */}
                  <div className="mt-2.5 w-6 h-6 rounded-full bg-[#F8F9FA] border border-[#EEE] text-gray-500 text-[11px] font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>

                  <input
                    value={item}
                    onChange={(e) =>
                      handleArrayChange(section.id, index, e.target.value)
                    }
                    placeholder={section.placeholder}
                    className={inputStyle}
                    autoFocus={
                      index === form[section.id].length - 1 && item === ""
                    }
                  />

                  {/* Delete Button (Visible on hover on desktop, always visible on mobile) */}
                  <button
                    type="button"
                    onClick={() => removeField(section.id, index)}
                    className="mt-1.5 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-all duration-200 shrink-0 md:opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Remove item">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={() => addField(section.id)}
              className={sleekAddBtnStyle}>
              <Plus size={16} strokeWidth={3} />
              {section.addButton}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepContent;
