import { Briefcase, User } from "lucide-react";
import {
  iconInputWrapper,
  iconStyle,
  labelStyle,
  inputStyle,
} from "./ReusableStyles";

const PersonalInfoCard = ({ profile, handleChange }) => (
  <div className="bg-white border border-[#EEE] rounded-2xl p-5 sm:p-8 shadow-sm">
    <h3 className="text-lg font-bold text-[#212121] mb-6 flex items-center gap-2 border-b border-[#EEE] pb-4">
      <User size={20} className="text-[#008BDC]" /> Personal Information
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
      <div>
        <label htmlFor="firstName" className={labelStyle}>
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={profile.firstName}
          onChange={handleChange}
          required
          className={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="lastName" className={labelStyle}>
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={profile.lastName}
          onChange={handleChange}
          required
          className={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="designation" className={labelStyle}>
          Job Title / Designation
        </label>
        <div className={iconInputWrapper}>
          <Briefcase className={iconStyle} />
          <input
            id="designation"
            name="designation"
            type="text"
            value={profile.designation}
            onChange={handleChange}
            placeholder="e.g. HR Manager"
            required
            className={`${inputStyle} pl-10`}
          />
        </div>
      </div>
      <div>
        <label htmlFor="department" className={labelStyle}>
          Department
        </label>
        <input
          id="department"
          name="department"
          type="text"
          value={profile.department}
          onChange={handleChange}
          placeholder="e.g. Talent Acquisition"
          className={inputStyle}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="bio" className={labelStyle}>
          Short Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows="3"
          value={profile.bio}
          onChange={handleChange}
          placeholder="Write a short introduction about yourself..."
          className={`${inputStyle} resize-y leading-relaxed`}
        />
      </div>
    </div>
  </div>
);

export default PersonalInfoCard;
