import { useAuth } from "../../../../app/context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function ApplyLandingPage() {
  const { user, loadingAuth } = useAuth();
  const navigate = useNavigate();
  const { jobId, jobSlug } = useParams();

  /* ---------------- Auto Redirect Logic ---------------- */

  useEffect(() => {
    if (loadingAuth) return;

    /* Candidate → Direct Apply */
    if (user?.role === "candidate") {
      if (!user.name || !user.email) {
        navigate("/candidate/profile?completeProfile=true");
        return;
      }

      navigate(`/apply/${jobId}/${jobSlug}/form`);
      return;
    }
  }, [user, loadingAuth, jobId, jobSlug, navigate]);

  /* ---------------- Loading State ---------------- */

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  /* ---------------- UI For Guest / Non Candidate ---------------- */

  return (
    <div className="max-w-md mx-auto p-10 text-center space-y-6">
      <h2 className="text-2xl font-bold">Apply for this Job</h2>

      <p className="text-gray-500">
        Create account or continue as guest to apply for this opportunity
      </p>

      {/* Login */}
      <button
        className="w-full p-4 bg-blue-500 text-white rounded-lg font-semibold hover:opacity-90"
        onClick={() => navigate(`/login?redirect=/apply/${jobId}/${jobSlug}`)}>
        Login to Apply
      </button>

      {/* Guest */}
      <button
        className="w-full p-4 border rounded-lg font-medium hover:bg-gray-50"
        onClick={() => navigate(`/apply/${jobId}/${jobSlug}/guest`)}>
        Continue as Guest
      </button>
    </div>
  );
}
