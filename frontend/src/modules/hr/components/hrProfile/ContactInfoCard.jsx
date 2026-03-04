import { Linkedin, Mail, MailIcon, MapPin, Phone } from "lucide-react";
import {
  iconInputWrapper,
  iconStyle,
  inputStyle,
  labelStyle,
} from "./ReusableStyles";

const ContactInfoCard = ({ profile, userEmail, handleChange }) => (
  <div className="bg-white border border-[#EEE] rounded-2xl p-5 sm:p-8 shadow-sm">
    <h3 className="text-lg font-bold text-[#212121] mb-6 flex items-center gap-2 border-b border-[#EEE] pb-4">
      <Mail size={20} className="text-[#008BDC]" /> Contact Details
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
      <div className="sm:col-span-2">
        <label htmlFor="email" className={labelStyle}>
          Work Email Address
        </label>
        <div className={iconInputWrapper}>
          <MailIcon className={iconStyle} />
          <input
            id="email"
            type="email"
            value={userEmail || profile.email}
            className={`${inputStyle} pl-10 bg-gray-50 text-gray-500 cursor-not-allowed`}
            disabled
            title="Email cannot be changed here."
          />
        </div>
        <p className="text-[11px] text-gray-400 mt-1.5 font-medium">
          To change your login email, please contact IT support.
        </p>
      </div>
      <div>
        <label htmlFor="phone" className={labelStyle}>
          Phone Number
        </label>
        <div className={iconInputWrapper}>
          <Phone className={iconStyle} />
          <input
            id="phone"
            name="phone"
            type="tel"
            value={profile.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className={`${inputStyle} pl-10`}
          />
        </div>
      </div>
      <div>
        <label htmlFor="location" className={labelStyle}>
          Location / City
        </label>
        <div className={iconInputWrapper}>
          <MapPin className={iconStyle} />
          <input
            id="location"
            name="location"
            type="text"
            value={profile.location}
            onChange={handleChange}
            placeholder="e.g. New York, USA"
            className={`${inputStyle} pl-10`}
          />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="linkedin" className={labelStyle}>
          LinkedIn Profile
        </label>
        <div className={iconInputWrapper}>
          <Linkedin className={iconStyle} />
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            value={profile.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className={`${inputStyle} pl-10`}
          />
        </div>
      </div>
    </div>
  </div>
);

export default ContactInfoCard;
