import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAuth } from "../../../app/context/AuthContext";
import { ApplicationService } from "../services/jobDetail/applicationService";

import ApplicationHeader from "../components/applyJob/ApplicationHeader";
import CandidateForm from "../components/applyJob/CandidateForm";
import GuestApplicationFlow from "../components/applyJob/GuestApplicationFlow";
import { useApplicationForm } from "../hooks/useApplicationForm";

export default function ApplyJobPage({ job }) {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const { user, loadingAuth } = useAuth();

  const [resumeFile, setResumeFile] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  const { form, updateField, setForm } = useApplicationForm({
    name: "",
    email: "",
    resume: "",
  });

  useEffect(() => {
    if (user?.role === "candidate") {
      setForm({
        name: user.name,
        email: user.email,
        resume: user.resumeLink || "",
      });
    }
  }, [user]);

  const submitApplication = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        jobId,
        userId: user?.uid || "guest",
        ...form,
        answers,
      };

      const res = await ApplicationService.applyForJob(payload);

      if (res.success) {
        alert("Application submitted");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  if (loadingAuth) return <div>Loading...</div>;

  if (!user && !isGuest) {
    return (
      <GuestApplicationFlow
        onLogin={() => navigate("/login")}
        onGuestApply={() => setIsGuest(true)}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <ApplicationHeader
        title="Apply Job"
        onBack={() => navigate(-1)}
        brand={{ borderColor: "#eee" }}
      />

      <div className="p-6">
        <CandidateForm
          form={form}
          updateField={updateField}
          job={job}
          brand={{ borderColor: "#eee" }}
          onSubmit={submitApplication}
          resumeFile={resumeFile}
          setResumeFile={setResumeFile}
          answers={answers}
          setAnswers={setAnswers}
          loading={loading}
        />
      </div>
    </div>
  );
}
