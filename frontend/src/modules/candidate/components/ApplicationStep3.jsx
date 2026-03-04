import { FormGroup } from "./FormGroup";

export default function ApplicationStep3({
  job,
  customAnswers,
  handleAnswerChange,
  formData,
  handleChange,
}) {
  return (
    <>
      <h2 className="text-xl font-bold mb-6 border-b pb-4">Final Screening</h2>

      {job?.screeningQuestions?.map((q, i) => (
        <FormGroup key={i} label={q} required>
          <textarea
            value={customAnswers[i] || ""}
            onChange={(e) => handleAnswerChange(i, e.target.value)}
            className="form-input"
          />
        </FormGroup>
      ))}

      <div className="mt-6 p-4 bg-gray-50 border rounded">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
        />
        <span className="ml-3 text-sm">
          I agree to privacy policy and data processing
        </span>
      </div>
    </>
  );
}
