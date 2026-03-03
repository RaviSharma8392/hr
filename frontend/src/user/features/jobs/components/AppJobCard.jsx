import React, { useState } from "react";
import {
  TrendingUp,
  MapPin,
  PlayCircle,
  Banknote,
  Briefcase,
  Clock,
  ChevronRight,
  Bookmark,
  Share2,
  Heart,
  Link,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AppJobCard = ({ job = {} }) => {
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const {
    title = "Business Development (Sales)",
    companyName = "Tech Solutions Private Limited",
    type = "Full Time",
    location = "Work From Home",
    startDate = "Immediately",
    salary = "₹ 3,00,000 - 5,00,000 /year",
    experience = "0-2 years",
    postedAt = "2 weeks ago",
    isActive = true,
  } = job;

  const handleApply = () => {
    alert(`Apply for ${title}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title,
          text: `Check this job: ${title} at ${companyName}`,
          url: window.location.href,
        })
        .catch(() => alert("Sharing cancelled"));
    } else {
      alert("Share link copied!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Job link copied!");
  };

  const handelViewDetails = () => {
    navigate(
      // `/companyName/${job.id}/${job.title.replace(/\s+/g, "-").toLowerCase()}`,
      `/companyName/${"AkfOO1BrP4JA2RAJj0Tv"}/${job.title.replace(/\s+/g, "-").toLowerCase()}`,
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6 hover:shadow-md transition-shadow duration-200 group">
      {/* Badge */}
      {isActive && (
        <div className="flex items-center gap-1.5 text-[13px] font-medium text-[blue-600] bg-blue-50 w-fit px-2.5 py-1 rounded border border-blue-100 mb-3">
          <TrendingUp className="w-4 h-4" />
          Actively hiring
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
        {title}
      </h3>

      <p className="text-sm text-gray-500 font-medium">{companyName}</p>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mt-3 mb-4">
        <MapPin className="w-4 h-4 text-gray-400" />
        {location}
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-5">
        <div>
          <div className="flex items-center gap-1 text-[11px] text-gray-500 uppercase tracking-wide">
            <PlayCircle className="w-3 h-3" /> Start Date
          </div>
          <div className="text-sm text-gray-800 font-medium">{startDate}</div>
        </div>

        <div>
          <div className="flex items-center gap-1 text-[11px] text-gray-500 uppercase tracking-wide">
            <Banknote className="w-3 h-3" /> Salary
          </div>
          <div className="text-sm text-gray-800 font-medium">{salary}</div>
        </div>

        <div>
          <div className="flex items-center gap-1 text-[11px] text-gray-500 uppercase tracking-wide">
            <Briefcase className="w-3 h-3" /> Experience
          </div>
          <div className="text-sm text-gray-800 font-medium">{experience}</div>
        </div>
      </div>

      <hr className="border-gray-100 mb-4" />

      {/* Footer Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-2.5 py-1 rounded border border-green-100">
          <Clock className="w-3.5 h-3.5" />
          {postedAt}
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Like */}
          <button
            onClick={() => setLiked(!liked)}
            className="text-sm font-medium flex items-center gap-1">
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            {liked ? "Liked" : "Like"}
          </button>

          {/* Save */}
          <button
            onClick={() => setSaved(!saved)}
            className="text-sm font-medium flex items-center gap-1">
            <Bookmark className="w-4 h-4" />
            {saved ? "Saved" : "Save"}
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="text-sm font-medium flex items-center gap-1">
            <Share2 className="w-4 h-4" />
            Share
          </button>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="text-sm font-medium flex items-center gap-1">
            <Link className="w-4 h-4" />
            Copy Link
          </button>

          {/* Apply */}
          <button
            onClick={handleApply}
            className="text-sm font-semibold border px-3 py-1.5 rounded">
            Apply Now
          </button>

          <button
            onClick={handelViewDetails}
            className="flex items-center gap-1 text-sm font-semibold text-[#008bdc]">
            View details
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppJobCard;
