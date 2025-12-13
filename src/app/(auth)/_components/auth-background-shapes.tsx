'use client';

export function AuthBackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Simple corner decorations */}
      <div className="absolute top-0 left-0 w-64 h-64">
        <svg viewBox="0 0 200 200" className="w-full h-full text-primary/5 dark:text-primary/10">
          <circle cx="0" cy="0" r="150" fill="currentColor" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-80 h-80">
        <svg viewBox="0 0 200 200" className="w-full h-full text-blue-500/5 dark:text-blue-400/10">
          <circle cx="200" cy="200" r="180" fill="currentColor" />
        </svg>
      </div>

      {/* Minimal accent lines */}
      <div className="absolute top-1/4 left-0 w-32 h-[1px] bg-gradient-to-r from-primary/20 to-transparent" />
      <div className="absolute top-1/3 left-0 w-20 h-[1px] bg-gradient-to-r from-primary/10 to-transparent" />

      <div className="absolute bottom-1/4 right-0 w-32 h-[1px] bg-gradient-to-l from-blue-500/20 to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-20 h-[1px] bg-gradient-to-l from-blue-500/10 to-transparent" />

      {/* Soft vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
    </div>
  );
}
