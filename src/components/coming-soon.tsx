import { IconPlanet } from '@tabler/icons-react';

export default function ComingSoon() {
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <IconPlanet size={72} />
        <h1 className="text-4xl font-bold leading-tight">Segera Hadir 👀</h1>
        <p className="text-center text-muted-foreground">
          Halaman ini belum dibuat. <br />
          Tetap pantau ya!
        </p>
      </div>
    </div>
  );
}
