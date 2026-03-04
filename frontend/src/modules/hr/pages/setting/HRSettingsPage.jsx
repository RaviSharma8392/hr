import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Building2,
  Bell,
  Lock,
  CreditCard,
  Users,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function HRSettingsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Settings Configuration Data
  const settingCategories = [
    {
      id: "profile",
      title: "My Profile",
      description: "Manage your personal details, avatar, and job title.",
      icon: User,
      path: "/hr/profile",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "company",
      title: "Company Settings",
      description: "Update company logo, industry, and organization details.",
      icon: Building2,
      path: "/hr/settings/company",
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "security",
      title: "Security & Password",
      description: "Update your password and enable two-factor authentication.",
      icon: Lock,
      path: "/hr/settings/security",
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: "notifications",
      title: "Notifications",
      description:
        "Control email alerts for new candidates and system updates.",
      icon: Bell,
      path: "/hr/settings/notifications",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "team",
      title: "Team Management",
      description: "Invite other HR members and manage their access roles.",
      icon: Users,
      path: "/hr/settings/team",
      iconColor: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      id: "billing",
      title: "Billing & Plans",
      description: "Manage your subscription, payment methods, and invoices.",
      icon: CreditCard,
      path: "/hr/settings/billing",
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/hr/login", { replace: true });
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7] md:bg-[#F8F9FA] font-sans text-[#484848] selection:bg-blue-100 selection:text-[#008BDC]">
      {/* ========================================== */}
      {/* NATIVE MOBILE STICKY HEADER                */}
      {/* ========================================== */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB] px-4 py-3.5 md:static md:bg-transparent md:border-none md:pt-8 md:pb-4 sm:px-6 lg:px-8 max-w-5xl mx-auto transition-all">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 md:ml-0 text-[#484848] hover:text-[#008BDC] hover:bg-blue-50 rounded-full transition-all active:scale-95 flex items-center justify-center focus:outline-none"
            aria-label="Go back">
            <ArrowLeft size={24} />
          </button>
          <div className="flex flex-col justify-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#212121] tracking-tight leading-none md:leading-tight">
              Settings
            </h1>
            <p className="hidden md:block text-[14px] text-gray-500 font-medium mt-1">
              Manage your account preferences and organization details.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* SETTINGS GRID                              */}
      {/* ========================================== */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-24 md:pb-12 pb-safe">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {settingCategories.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="group bg-white border border-[#EEE] rounded-2xl p-5 sm:p-6 flex items-start gap-4 sm:gap-5 hover:border-[#008BDC]/30 hover:shadow-[0_8px_30px_rgba(0,139,220,0.06)] transition-all duration-200 active:scale-[0.98]">
              {/* Icon Container */}
              <div
                className={`p-3 rounded-xl ${item.bgColor} ${item.iconColor} shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                <item.icon size={24} strokeWidth={2.5} />
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <h2 className="text-[16px] sm:text-[17px] font-bold text-[#212121] mb-1 group-hover:text-[#008BDC] transition-colors">
                  {item.title}
                </h2>
                <p className="text-[13px] sm:text-[14px] text-gray-500 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Navigation Chevron */}
              <div className="text-gray-300 group-hover:text-[#008BDC] transition-colors shrink-0 mt-2 sm:mt-1 group-hover:translate-x-1 duration-200">
                <ChevronRight size={20} strokeWidth={2.5} />
              </div>
            </Link>
          ))}
        </div>

        {/* ========================================== */}
        {/* DANGER ZONE / LOGOUT                       */}
        {/* ========================================== */}
        <div className="mt-8 sm:mt-12 border-t border-[#E5E7EB] pt-8">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-5 py-3.5 bg-white border border-red-100 text-red-600 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors duration-200 w-full md:w-auto font-bold text-[14px] shadow-sm active:scale-95">
            <LogOut size={18} strokeWidth={2.5} />
            Log out of HRMastery
          </button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pb-safe { padding-bottom: max(2rem, env(safe-area-inset-bottom)); }
      `,
        }}
      />
    </div>
  );
}
