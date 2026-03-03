import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../services/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
// Components
import ProfileSkeleton from "../../components/hrProfile/ProfileSkeleton";
import AvatarCard from "../../components/hrProfile/AvatarCard";
import PersonalInfoCard from "../../components/hrProfile/PersonalInfoCard";
import ContactInfoCard from "../../components/hrProfile/ContactInfoCard";
import StickyActionBar from "../../components/hrProfile/StickyActionBar";

// =========================================================
// 1. DATA HELPERS
// =========================================================
const getCachedProfile = () => {
  try {
    const cached = localStorage.getItem("hr_profile_cache");
    return cached ? JSON.parse(cached) : null;
  } catch (e) {
    return null;
  }
};

const defaultProfile = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  designation: "",
  department: "",
  location: "",
  linkedin: "",
  bio: "",
};

// =========================================================
// 2. MAIN SMART CONTAINER
// =========================================================
export default function HRProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(
    () => getCachedProfile() || defaultProfile,
  );
  const [isLoading, setIsLoading] = useState(() => !getCachedProfile());
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sync with Firebase
  useEffect(() => {
    const fetchProfileFromFirebase = async () => {
      if (!user?.uid) return;
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const freshData = { ...defaultProfile, ...docSnap.data() };
          setProfile(freshData);
          localStorage.setItem("hr_profile_cache", JSON.stringify(freshData));
        }
      } catch (error) {
        console.error("Failed to sync profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileFromFirebase();
  }, [user]);

  const handleChange = (e) =>
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Save to Firebase
  const handleSave = async (e) => {
    e.preventDefault();
    if (!user?.uid) return;
    setIsSaving(true);
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, profile);
      localStorage.setItem("hr_profile_cache", JSON.stringify(profile));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      alert("Failed to save profile. Please check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <ProfileSkeleton />;

  return (
    // 1. App Background: A very subtle gray to make white cards pop
    <div className="min-h-screen bg-[#F2F4F7] md:bg-[#F8F9FA] font-sans text-[#484848] selection:bg-blue-100 selection:text-[#008BDC]">
      {/* 2. Native Mobile Sticky Header */}
      {/* 2. Native Mobile Sticky Header with Back Button */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB] px-4 py-3.5 md:static md:bg-transparent md:border-none md:pt-8 md:pb-4 sm:px-6 lg:px-8 max-w-6xl mx-auto transition-all">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* App-Style Back Button */}
          <button
            onClick={() => navigate(-1)} // Goes back to the previous page
            className="p-2 -ml-2 md:ml-0 text-[#484848] hover:text-[#008BDC] hover:bg-blue-50 rounded-full transition-all active:scale-95 flex items-center justify-center focus:outline-none"
            aria-label="Go back">
            <ArrowLeft size={24} />
          </button>

          {/* Title & Subtitle */}
          <div className="flex flex-col justify-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#212121] tracking-tight leading-none md:leading-tight">
              My Profile
            </h1>
            <p className="hidden md:block text-[14px] text-gray-500 font-medium mt-1">
              Manage your personal HR details and professional identity.
            </p>
          </div>
        </div>
      </div>
      {/* 3. Main Scrollable Content Area */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-32 md:pb-12 pb-safe">
        <form onSubmit={handleSave} className="relative h-full">
          {/* Tighter gap on mobile (gap-4) for a grouped app feel, wider on desktop (gap-8) */}
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column (Avatar) */}
            <div className="lg:col-span-1 flex flex-col gap-4 sm:gap-6">
              <AvatarCard profile={profile} role={user?.role} />
            </div>

            {/* Right Column (Forms) */}
            <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
              <PersonalInfoCard profile={profile} handleChange={handleChange} />
              <ContactInfoCard
                profile={profile}
                userEmail={user?.email}
                handleChange={handleChange}
              />
            </div>
          </div>

          <StickyActionBar isSaving={isSaving} showSuccess={showSuccess} />
        </form>
      </div>

      {/* Global CSS for PWA Safe Areas */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pb-safe { padding-bottom: max(6rem, env(safe-area-inset-bottom)); }
        @supports (-webkit-touch-callout: none) {
          /* iOS specific tweaks for smoother scrolling */
          .min-h-screen { min-height: -webkit-fill-available; }
        }
      `,
        }}
      />
    </div>
  );
}
