export const FormGroup = ({ label, required, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[13px] font-bold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);
