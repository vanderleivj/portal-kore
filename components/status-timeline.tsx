interface SubStatus {
  id: string;
  status: string;
  responsible: string;
  date: string;
  time: string;
  active: boolean;
  icon: JSX.Element;
}

export interface Step {
  id: number;
  status: string;
  responsible: string;
  date: string;
  time: string;
  active: boolean;
  icon: JSX.Element;
  subStatus?: SubStatus[];
}

interface StatusTimelineProps {
  steps: Step[];
}

export function StatusTimeline({ steps }: StatusTimelineProps) {
  return (
    <div className="flex flex-col items-start overflow-y-auto mt-6">
      {steps.map((step) => (
        <div key={step.id} className="w-full">
          <div
            className={`flex items-center h-16 mb-4 w-full ${
              step.active ? "opacity-100" : "opacity-50"
            }`}
          >
            <div
              className={`w-10 h-9 rounded-full flex items-center justify-center mr-4 ${
                step.active
                  ? "bg-[#A2C616] text-white"
                  : "bg-[#235A81] text-white/50"
              }`}
            >
              {step.icon}
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <div>
                <div className="text-sm text-primary-color">{step.status}</div>
                {step.responsible && (
                  <div className="text-sm text-primary-color font-bold">
                    Responsável: {step.responsible}
                  </div>
                )}
              </div>
              {step.date && (
                <div className="text-sm text-primary-color text-right">
                  {step.date}
                  <br /> {step.time}
                </div>
              )}
            </div>
          </div>
          {step.subStatus &&
            step.subStatus.map((subStep) => (
              <div
                key={subStep.id}
                className={`flex items-center h-5 mb-4 w-auto ml-8 ${
                  subStep.active ? "opacity-100" : "opacity-50"
                }`}
              >
                <div
                  className={`w-8 h-7 rounded-full flex items-center justify-center mr-4 ${
                    subStep.active
                      ? "bg-[#A2C616] text-white"
                      : "bg-[#235A81] text-white/50"
                  }`}
                >
                  {subStep.icon}
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                  <div>
                    <div className="text-sm text-primary-color">
                      {subStep.status}
                    </div>
                    {subStep.responsible && (
                      <div className="text-sm text-primary-color font-bold">
                        Responsável: {subStep.responsible}
                      </div>
                    )}
                  </div>
                  {subStep.date && (
                    <div className="text-sm text-primary-color text-right">
                      {subStep.date}
                      <br /> {subStep.time}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
