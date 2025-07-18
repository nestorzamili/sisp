import React from 'react';
import {
  CheckCircle,
  School,
  Users,
  ChevronRight,
  GraduationCap,
  Building2,
  Wrench,
  Target,
  FileText,
  Eye,
} from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: number[];
  dataCompletionStatus: {
    sekolahStatus?: string;
    step1: boolean;
    step2: boolean;
    step3: boolean;
    step4: boolean;
    step5: boolean;
    step6: boolean;
    step7: boolean;
    step8: boolean;
  };
  onStepClick: (stepNumber: number) => void;
}

export function StepIndicator({
  currentStep,
  dataCompletionStatus,
  onStepClick,
}: StepIndicatorProps) {
  const getStepIcon = (stepNumber: number) => {
    // Check if step has actual data completion
    const hasData =
      dataCompletionStatus[
        `step${stepNumber}` as keyof typeof dataCompletionStatus
      ];
    if (hasData) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else if (stepNumber === currentStep) {
      return stepNumber === 1 ? (
        <School className="w-5 h-5 text-primary" />
      ) : stepNumber === 2 ? (
        <Users className="w-5 h-5 text-primary" />
      ) : stepNumber === 3 ? (
        <GraduationCap className="w-5 h-5 text-primary" />
      ) : stepNumber === 4 ? (
        <Building2 className="w-5 h-5 text-primary" />
      ) : stepNumber === 5 ? (
        <Wrench className="w-5 h-5 text-primary" />
      ) : stepNumber === 6 ? (
        <Target className="w-5 h-5 text-primary" />
      ) : stepNumber === 7 ? (
        <FileText className="w-5 h-5 text-primary" />
      ) : (
        <Eye className="w-5 h-5 text-primary" />
      );
    } else {
      return stepNumber === 1 ? (
        <School className="w-5 h-5 text-muted-foreground" />
      ) : stepNumber === 2 ? (
        <Users className="w-5 h-5 text-muted-foreground" />
      ) : stepNumber === 3 ? (
        <GraduationCap className="w-5 h-5 text-muted-foreground" />
      ) : stepNumber === 4 ? (
        <Building2 className="w-5 h-5 text-muted-foreground" />
      ) : stepNumber === 5 ? (
        <Wrench className="w-5 h-5 text-muted-foreground" />
      ) : stepNumber === 6 ? (
        <Target className="w-5 h-5 text-muted-foreground" />
      ) : stepNumber === 7 ? (
        <FileText className="w-5 h-5 text-muted-foreground" />
      ) : (
        <Eye className="w-5 h-5 text-muted-foreground" />
      );
    }
  };
  const steps = [
    { number: 1, label: 'Informasi Sekolah' },
    { number: 2, label: 'Data Guru' },
    { number: 3, label: 'Data Siswa' },
    { number: 4, label: 'Data Sarana' },
    { number: 5, label: 'Data Prasarana' },
    { number: 6, label: 'Prioritas Kebutuhan' },
    { number: 7, label: 'Lampiran' },
    { number: 8, label: 'Review & Submit' },
  ];
  return (
    <div className="w-full">
      <div className="flex items-center justify-center py-2 px-2 overflow-x-auto">
        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 min-w-max">
          {steps.map((step, index) => {
            const hasData =
              dataCompletionStatus[
                `step${step.number}` as keyof typeof dataCompletionStatus
              ];

            return (
              <React.Fragment key={step.number}>
                <div
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    currentStep === step.number
                      ? 'bg-primary/10 text-primary shadow-sm border border-primary/20'
                      : hasData
                        ? 'bg-green-50 text-green-600 shadow-sm border border-green-200'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                  onClick={() => onStepClick(step.number)}
                >
                  {getStepIcon(step.number)}
                  <span className="text-xs sm:text-sm font-medium hidden md:inline">
                    {step.label}
                  </span>
                  <span className="text-xs font-medium md:hidden">
                    {step.number}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground/60 flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
