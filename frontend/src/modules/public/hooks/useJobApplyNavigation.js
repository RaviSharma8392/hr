import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/context/AuthContext";

export function useJobApplyNavigation(job) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleApply = () => {

    if (!user) {
      navigate(`/login?redirect=/apply/${job.id}`);
      return;
    }

    if (user.role !== "candidate") {
      alert("Only candidates can apply");
      return;
    }

    if (job?.screeningQuestions?.length > 0) {
      navigate(`/apply/${job.id}/questions`);
      return;
    }

    navigate(`/apply/${job.id}/form`);
  };

  return { handleApply };
}