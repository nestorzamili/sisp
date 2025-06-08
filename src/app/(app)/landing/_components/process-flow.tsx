import React from 'react';
import { Building2, Target, CheckCircle, BarChart3 } from 'lucide-react';

const ProcessFlow: React.FC = () => {
  const processSteps = [
    {
      icon: Building2,
      title: 'Input Data',
      description: 'Sekolah menginput kondisi sarana dan prasarana',
    },
    {
      icon: CheckCircle,
      title: 'Verifikasi Data',
      description: 'Tim verifikasi melakukan validasi data yang diinput',
    },
    {
      icon: Target,
      title: 'Analisis Sistem',
      description: 'Sistem menganalisis dan menentukan prioritas',
    },
    {
      icon: BarChart3,
      title: 'Laporan',
      description: 'Dinas Pendidikan mendapat laporan prioritas',
    },
  ];

  return (
    <section id="process" className="py-20 bg-muted">
      <div className="container mx-auto max-w-[1440px] px-6">
        <div className="bg-gradient-to-r from-accent to-accent/80 rounded-2xl p-8 border border-primary/20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Proses Analisis Prioritas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Data yang dikumpulkan melalui proses yang terstruktur untuk
              menghasilkan rekomendasi prioritas kebutuhan yang akurat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={index} className="text-center relative">
                  {/* Connection Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-4 left-[calc(50%+1rem)] w-[calc(100%-1rem)] h-0.5 bg-primary/30 z-0">
                      <div className="absolute right-0 top-[-3px] w-2 h-2 bg-primary/50 rounded-full"></div>
                    </div>
                  )}

                  {/* Step Content */}
                  <div className="relative">
                    {/* Step Number Badge */}
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold mb-4 z-20 relative">
                      {index + 1}
                    </div>

                    {/* Icon Container */}
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 relative z-10 shadow-sm border border-primary/20">
                      <StepIcon className="text-primary" size={36} />
                    </div>

                    {/* Step Content */}
                    <h4 className="font-bold text-foreground mb-2 text-lg">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed px-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;
