import { Check } from "lucide-react";

export default function ApplicationStepper({ steps, currentStep }) {
  return (
    <div className="space-y-6 relative">
      <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-gray-100" />

      {steps.map((step) => {
        const active = currentStep === step.num;
        const passed = currentStep > step.num;

        return (
          <div key={step.num} className="relative flex gap-4">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                active
                  ? "bg-blue-600 text-white"
                  : passed
                    ? "bg-green-500 text-white"
                    : "border-2 border-gray-200 text-gray-400"
              }`}>
              {passed ? <Check size={14} /> : step.num}
            </div>

            <div>
              <p className="text-sm font-bold">{step.title}</p>
              <p className="text-xs text-gray-500">{step.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
