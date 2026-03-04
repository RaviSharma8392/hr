// pages/UnauthorizedPage.jsx

import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Home } from "lucide-react"; // Import some relevant icons

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect to the home page after 5 seconds
    const redirectTimer = setTimeout(() => {
      navigate("/"); // Redirect to your home page
    }, 5000); // 5 seconds

    // Clear the timeout if the component unmounts before redirection
    return () => clearTimeout(redirectTimer);
  }, [navigate]); // Dependency array includes navigate to ensure effect runs correctly

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] text-[#484848] p-4">
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-red-100 text-center max-w-md w-full animate-in zoom-in-95 duration-500">
        <div className="flex justify-center mb-6">
          <Lock size={64} className="text-red-500" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#212121] mb-4">
          Access Denied
        </h1>
        <p className="text-base text-gray-600 mb-6 leading-relaxed">
          It looks like you don't have permission to view this page. Please
          ensure you're logged in with an authorized account.
        </p>

        <p className="text-sm text-gray-500 mb-8">
          You will be redirected to the homepage shortly.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#008BDC] hover:bg-[#0073B6] text-white text-base font-bold rounded-lg shadow-md transition-all active:scale-95">
          <Home size={20} />
          Go to Homepage Now
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
