import React from 'react';
import Image from 'next/image';

const Statistics: React.FC = () => {
  return (
    <>
      {/* Statistics Section */}
      <section id="statistics" className="py-20 bg-background">
        <div className="container mx-auto max-w-[1440px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Target Analisis Prioritas SMP Nias Selatan
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Sistem menganalisis prioritas kebutuhan sarana prasarana dari
                seluruh SMP di Kabupaten Nias Selatan untuk perencanaan
                pembangunan yang efektif.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="border border-border rounded-lg p-6 text-center bg-card">
                  <div className="text-4xl font-bold text-primary mb-2">43</div>
                  <div className="text-muted-foreground">Total SMP</div>
                </div>
                <div className="border border-border rounded-lg p-6 text-center bg-card">
                  <div className="text-4xl font-bold text-primary mb-2">13</div>
                  <div className="text-muted-foreground">Kategori Data</div>
                </div>
                <div className="border border-border rounded-lg p-6 text-center bg-card">
                  <div className="text-4xl font-bold text-primary mb-2">3</div>
                  <div className="text-muted-foreground">Level Prioritas</div>
                </div>
                <div className="border border-border rounded-lg p-6 text-center bg-card">
                  <div className="text-4xl font-bold text-primary mb-2">
                    100%
                  </div>
                  <div className="text-muted-foreground">Cakupan Analisis</div>
                </div>
              </div>
            </div>

            <div>
              <Image
                src="/school.png"
                alt="Peta Sebaran SMP Nias Selatan"
                className="rounded-lg shadow-lg w-full h-auto"
                height={500}
                width={700}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Statistics;
