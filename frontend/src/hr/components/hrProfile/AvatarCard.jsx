import { Camera, Shield } from "lucide-react";

const AvatarCard = ({ profile, role }) => (
  <div className="bg-white border border-[#EEE] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center">
    <div className="relative group cursor-pointer mb-5">
      <div className="w-32 h-32 rounded-full p-1 bg-white border-2 border-[#EEE] shadow-sm overflow-hidden group-hover:border-[#008BDC] transition-colors">
        <img
          src={
            profile.firstName
              ? `https://ui-avatars.com/api/?name=${profile.firstName}+${profile.lastName}&background=008BDC&color=fff&size=200`
              : `https://ui-avatars.com/api/?name=HR+Admin&background=008BDC&color=fff&size=200`
          }
          alt="Profile"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <div className="absolute inset-1 bg-black/50 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Camera className="text-white mb-1" size={24} />
        <span className="text-white text-[10px] font-bold uppercase tracking-wider">
          Change
        </span>
      </div>
    </div>
    <h2 className="text-xl font-black text-[#212121]">
      {profile.firstName || profile.lastName
        ? `${profile.firstName} ${profile.lastName}`
        : "HR Representative"}
    </h2>
    <p className="text-[14px] text-gray-500 font-medium mt-1">
      {profile.designation || "Add your job title"}
    </p>
    <div className="w-full h-px bg-[#EEE] my-6"></div>
    <div className="w-full flex items-center justify-between text-[13px] font-bold">
      <span className="text-gray-400 uppercase tracking-widest">
        System Role
      </span>
      <div className="flex items-center gap-1.5 text-[#008BDC] bg-blue-50 px-2.5 py-1 rounded-md">
        <Shield size={14} />{" "}
        {role === "company_admin" ? "Super Admin" : "HR Admin"}
      </div>
    </div>
  </div>
);

export default AvatarCard;
