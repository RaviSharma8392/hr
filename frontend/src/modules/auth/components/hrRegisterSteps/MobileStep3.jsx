// src/pages/auth/HRRegisterSteps/MobileStep3.jsx
import React from "react";

export default function MobileStep3({ form, handleSubmit, loading, error }) {
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-right-8 duration-500">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Confirm your details
      </h3>
      <div className="bg-gray-50 p-5 rounded-xl text-sm border border-gray-100 mb-8">
        <p className="flex justify-between py-1">
          <strong className="text-gray-700">Name:</strong>{" "}
          <span className="text-gray-600">{form.fullName}</span>
        </p>
        <p className="flex justify-between py-1">
          <strong className="text-gray-700">Email:</strong>{" "}
          <span className="text-gray-600">{form.email}</span>
        </p>
        <p className="flex justify-between py-1">
          <strong className="text-gray-700">Company:</strong>{" "}
          <span className="text-gray-600">{form.companyName}</span>
        </p>
        <p className="flex justify-between py-1">
          <strong className="text-gray-700">Size:</strong>{" "}
          <span className="text-gray-600">{form.companySize}</span>
        </p>
      </div>

      {error && (
        <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg mb-6">
          {error}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="btn-primary mb-4">
        {loading ? "Creating Account..." : "Create HR Account"}
      </button>
    </div>
  );
}
