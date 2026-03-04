import { FormGroup } from "./FormGroup";

export default function ApplicationStep1({ formData, handleChange }) {
  return (
    <>
      <h2 className="text-xl font-bold mb-6 border-b pb-4">
        Personal Information
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        <FormGroup label="First Name" required>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-input"
          />
        </FormGroup>

        <FormGroup label="Last Name" required>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-input"
          />
        </FormGroup>

        <FormGroup label="Email" required>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </FormGroup>

        <FormGroup label="Phone" required>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
          />
        </FormGroup>

        <FormGroup label="Date of Birth">
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="form-input"
          />
        </FormGroup>

        <FormGroup label="Gender">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-input">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </FormGroup>

        <FormGroup label="Address" className="sm:col-span-2">
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-input"
          />
        </FormGroup>
      </div>
    </>
  );
}
