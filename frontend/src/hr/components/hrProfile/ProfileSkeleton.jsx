// --- Skeleton Loader ---
const ProfileSkeleton = () => (
  <div className="min-h-screen bg-[#F8F9FA] pb-24 md:pb-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 animate-pulse pb-safe">
    <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-72 mb-8"></div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white border border-[#EEE] rounded-2xl p-6 flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
      <div className="lg:col-span-2 bg-white border border-[#EEE] rounded-2xl p-6 sm:p-8">
        <div className="h-6 bg-gray-200 rounded w-40 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i}>
              <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-11 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
          <div className="sm:col-span-2">
            <div className="h-3 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-24 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileSkeleton;
