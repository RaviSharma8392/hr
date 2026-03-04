function JobOverviewCard({ job, brand }) {
  return (
    <div className="p-6 border rounded-xl space-y-4">
      <h2 className="text-xl font-bold" style={{ color: brand.headingColor }}>
        Job Overview
      </h2>

      <p>Work Mode : {job.workMode}</p>
      <p>Duration : {job.duration}</p>
      <p>Openings : {job.openings}</p>

      {job.requirements?.length > 0 && (
        <div>
          <h3 className="font-semibold">Requirements</h3>
          <ul className="list-disc pl-4">
            {job.requirements.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
