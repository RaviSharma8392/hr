import React from "react";

const jobs = [
  {
    title: "Frontend Developer",
    dept: "Engineering",
    status: "Open",
    applicants: 45,
  },
  {
    title: "HR Executive",
    dept: "Human Resources",
    status: "Open",
    applicants: 18,
  },
  { title: "Sales Manager", dept: "Sales", status: "Closed", applicants: 72 },
];

const JobsTable = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="px-6 py-4 border-b border-slate-200 flex justify-between">
        <h3 className="text-lg font-semibold">Job Listings</h3>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
          + Create Job
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Department</th>
            <th className="px-6 py-3 text-left">Applicants</th>
            <th className="px-6 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, i) => (
            <tr key={i} className="border-t border-slate-100">
              <td className="px-6 py-4 font-medium">{job.title}</td>
              <td className="px-6 py-4">{job.dept}</td>
              <td className="px-6 py-4">{job.applicants}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    job.status === "Open"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                  {job.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsTable;
