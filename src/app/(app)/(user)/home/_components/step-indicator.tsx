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
} from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (stepNumber: number) => void;
}

export function StepIndicator({
  currentStep,
  completedSteps,
  onStepClick,
}: StepIndicatorProps) {
  const getStepIcon = (stepNumber: number) => {
    if (completedSteps.includes(stepNumber)) {
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
      ) : (
        <FileText className="w-5 h-5 text-primary" />
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
      ) : (
        <FileText className="w-5 h-5 text-muted-foreground" />
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
  ];

  return (
    <div className="flex items-center justify-center mb-2 px-4">
      <div className="flex items-center space-x-2 md:space-x-4 overflow-x-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div
              className={`flex items-center space-x-2 px-2 md:px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 whitespace-nowrap ${
                currentStep === step.number
                  ? 'bg-primary/10 text-primary shadow-sm border border-primary/20'
                  : completedSteps.includes(step.number)
                  ? 'bg-green-50 text-green-600 shadow-sm border border-green-200'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              onClick={() => onStepClick(step.number)}
            >
              {getStepIcon(step.number)}
              <span className="text-xs md:text-sm font-medium hidden sm:inline">
                {step.label}
              </span>
              <span className="text-xs font-medium sm:hidden">
                {step.number}
              </span>
            </div>

            {index < steps.length - 1 && (
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground/60 flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
