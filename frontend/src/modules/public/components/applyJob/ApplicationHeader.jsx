import { ChevronLeft } from "lucide-react";

export default function ApplicationHeader({ brand, title, onBack }) {
  return (
    <div
      className="flex items-center justify-between p-4 border-b bg-white"
      style={{ borderColor: brand.borderColor }}>
      <button onClick={onBack} className="flex items-center gap-2">
        <ChevronLeft />
        Back
      </button>

      <h2 className="font-bold text-lg">{title}</h2>
      <div />
    </div>
  );
}
