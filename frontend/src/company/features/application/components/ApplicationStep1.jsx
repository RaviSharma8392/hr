import React, { useState } from "react";
import { User, Mail, Phone, CalendarDays, Users, MapPin } from "lucide-react";

export default function ApplicationStep1({ formData, handleChange }) {
  // State to track focus for icon color shifting
  const [focusedField, setFocusedField] = useState(null);

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Internshala Style Section Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#212121] mb-1">
          Personal Details
        </h2>
        <p className="text-sm text-[#8A8A8A]">
          Please provide your contact details for the hiring team.
        </p>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        {/* First Name */}
        <FormGroup label="First Name" required>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User
                size={18}
                className={`transition-colors duration-200 ${focusedField === "firstName" ? "text-[#008BDC]" : "text-[#AAA]"}`}
              />
            </div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onFocus={() => handleFocus("firstName")}
              onBlur={handleBlur}
              className="form-input pl-10"
              placeholder="e.g. John"
            />
          </div>
        </FormGroup>

        {/* Last Name */}
        <FormGroup label="Last Name" required>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User
                size={18}
                className={`transition-colors duration-200 ${focusedField === "lastName" ? "text-[#008BDC]" : "text-[#AAA]"}`}
              />
            </div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onFocus={() => handleFocus("lastName")}
              onBlur={handleBlur}
              className="form-input pl-10"
              placeholder="e.g. Doe"
            />
          </div>
        </FormGroup>

        {/* Email Address */}
        <FormGroup label="Email Address" required>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail
                size={18}
                className={`transition-colors duration-200 ${focusedField === "email" ? "text-[#008BDC]" : "text-[#AAA]"}`}
              />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
              className="form-input pl-10"
              placeholder="john.doe@example.com"
            />
          </div>
        </FormGroup>

        {/* Phone Number */}
        <FormGroup label="Phone Number" required>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone
                size={18}
                className={`transition-colors duration-200 ${focusedField === "phone" ? "text-[#008BDC]" : "text-[#AAA]"}`}
              />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => handleFocus("phone")}
              onBlur={handleBlur}
              className="form-input pl-10"
              placeholder="e.g. +91 98765 43210"
            />
          </div>
        </FormGroup>

        {/* Date of Birth */}
        <FormGroup label="Date of Birth">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarDays
                size={18}
                className={`transition-colors duration-200 ${focusedField === "dob" ? "text-[#008BDC]" : "text-[#AAA]"}`}
              />
            </div>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              onFocus={() => handleFocus("dob")}
              onBlur={handleBlur}
              className="form-input pl-10"
            />
          </div>
        </FormGroup>

        {/* Gender */}
        <FormGroup label="Gender">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Users
                size={18}
                className={`transition-colors duration-200 ${focusedField === "gender" ? "text-[#008BDC]" : "text-[#AAA]"}`}
              />
            </div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              onFocus={() => handleFocus("gender")}
              onBlur={handleBlur}
              className="form-input pl-10 cursor-pointer appearance-none bg-white">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {/* Standard Internshala Dropdown Arrow */}
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </FormGroup>

        {/* Current City */}
        <div className="sm:col-span-2">
          <FormGroup label="Current City" required>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin
                  size={18}
                  className={`transition-colors duration-200 ${focusedField === "location" ? "text-[#008BDC]" : "text-[#AAA]"}`}
                />
              </div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                onFocus={() => handleFocus("location")}
                onBlur={handleBlur}
                className="form-input pl-10"
                placeholder="e.g. Mumbai, Maharashtra"
              />
            </div>
          </FormGroup>
        </div>
      </div>
    </div>
  );
}

/* --- Reusable Internshala Form Group --- */
const FormGroup = ({ label, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-[#484848]">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);
