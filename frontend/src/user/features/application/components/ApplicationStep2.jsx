import { FormGroup } from "./FormGroup";

export default function ApplicationStep2({ formData, handleChange }) {
  return (
    <>
      <h2 className="text-xl font-bold mb-6 border-b pb-4">
        Experience & Professional Details
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        <FormGroup label="Experience">
          <input
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="form-input"
          />
        </FormGroup>

        <FormGroup label="Expected Salary">
          <input
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleChange}
            className="form-input"
          />
        </FormGroup>

        <FormGroup label="Notice Period">
          <select
            name="noticePeriod"
            value={formData.noticePeriod}
            onChange={handleChange}
            className="form-input">
            <option>Immediate</option>
            <option>15 Days</option>
            <option>1 Month</option>
            <option>2 Months</option>
          </select>
        </FormGroup>

        <FormGroup label="Skills">
          <input
            name="skills"
            placeholder="React, Node, MongoDB"
            value={formData.skills}
            onChange={handleChange}
            className="form-input"
          />
        </FormGroup>
      </div>
    </>
  );
}
