import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <>
      {/* Call to Action */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto max-w-[1440px] px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Bantu Tentukan Prioritas Kebutuhan Sekolah Anda
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Input data sarana dan prasarana sekolah Anda untuk analisis
            prioritas kebutuhan yang akan mendukung perencanaan pembangunan
            pendidikan di Nias Selatan.
          </p>
          <div className="flex justify-center">
            <Button className="!rounded-button whitespace-nowrap bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-6 cursor-pointer">
              Mulai Input Data Sekolah
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
