import React from 'react';

export function FormHeader() {
  return (
    <div className="text-center">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
        Formulir Pendataan Sarana dan Prasarana
      </h1>
      <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
        Silakan isi formulir di bawah ini untuk melaporkan kondisi sarana dan
        prasarana di sekolah Anda. Data ini akan digunakan untuk perencanaan dan
        pengembangan fasilitas pendidikan.
      </p>
    </div>
  );
}
