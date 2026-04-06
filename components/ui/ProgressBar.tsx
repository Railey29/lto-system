interface ProgressBarProps {
  activeStep: number;
}

const steps = ["System Access", "User Info", "Modules", "Submit"];

export function ProgressBar({ activeStep }: ProgressBarProps) {
  return (
    <div className="progress-wrap">
      <div className="progress-inner">
        {steps.map((label, index) => {
          const isLastStep = index === steps.length - 1;
          const isDone =
            index < activeStep || (isLastStep && activeStep === index);
          const isActive = activeStep === index && !isLastStep;

          return (
            <div
              key={label}
              className={`progress-step ${isDone ? "done" : ""} ${isActive ? "active" : ""}`}
            >
              <div className="step-num">{index + 1}</div>
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
