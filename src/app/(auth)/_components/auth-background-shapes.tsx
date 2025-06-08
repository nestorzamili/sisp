'use client';

export function AuthBackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* More visible gradient orbs with gentle animation */}
      <div className="absolute top-20 left-12 w-40 h-40 bg-gradient-to-br from-blue-300/70 to-blue-200/30 dark:from-blue-100/30 dark:to-blue-50/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute top-60 right-16 w-32 h-32 bg-gradient-to-br from-teal-300/60 to-teal-200/25 dark:from-teal-100/25 dark:to-teal-50/8 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: '2s', animationDuration: '4s' }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-36 h-36 bg-gradient-to-br from-slate-300/50 to-slate-200/20 dark:from-slate-100/20 dark:to-slate-50/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '4s', animationDuration: '6s' }}
      ></div>

      {/* Much more visible geometric grid */}
      <div className="absolute top-32 left-16">
        <div className="grid grid-cols-3 gap-8 opacity-80 dark:opacity-40">
          <div className="w-3 h-3 border-2 border-blue-500/80 dark:border-blue-300/50 rounded-sm"></div>
          <div className="w-3 h-3 border-2 border-blue-500/70 dark:border-blue-300/40"></div>
          <div className="w-3 h-3 border-2 border-blue-500/80 dark:border-blue-300/50 rounded-full"></div>
          <div className="w-3 h-3 border-2 border-teal-500/70 dark:border-teal-300/40"></div>
          <div className="w-3 h-3 bg-blue-400/50 dark:bg-blue-300/30 rounded-sm"></div>
          <div className="w-3 h-3 border-2 border-teal-500/80 dark:border-teal-300/50 rounded-sm"></div>
          <div className="w-3 h-3 border-2 border-blue-500/70 dark:border-blue-300/40 rounded-full"></div>
          <div className="w-3 h-3 border-2 border-teal-500/70 dark:border-teal-300/40 rounded-sm"></div>
          <div className="w-3 h-3 bg-teal-400/40 dark:bg-teal-300/25"></div>
        </div>
      </div>

      {/* Much more visible circular elements */}
      <div className="absolute top-1/4 right-20">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 w-24 h-24 border-2 border-blue-400/60 dark:border-blue-300/35 rounded-full"></div>
          <div className="absolute inset-3 w-18 h-18 border border-blue-400/50 dark:border-blue-300/30 rounded-full"></div>
          <div className="absolute inset-6 w-12 h-12 border border-blue-400/40 dark:border-blue-300/25 rounded-full"></div>
          <div className="absolute inset-9 w-6 h-6 bg-blue-300/50 dark:bg-blue-200/30 rounded-full"></div>
        </div>
      </div>

      {/* Much more visible book/education icons */}
      <div className="absolute bottom-1/3 left-1/4">
        <div className="relative opacity-70 dark:opacity-35">
          {/* Book shape */}
          <div className="w-8 h-6 bg-blue-400/80 dark:bg-blue-300/50 rounded-sm mb-4 shadow-sm"></div>
          <div className="w-6 h-4 bg-teal-400/70 dark:bg-teal-300/40 rounded-sm ml-2 mb-3 shadow-sm"></div>
          <div className="w-10 h-7 bg-slate-400/70 dark:bg-slate-300/40 rounded-sm shadow-sm"></div>
        </div>
      </div>

      {/* Much more visible pencil/ruler lines */}
      <div className="absolute top-1/3 left-1/3 opacity-60 dark:opacity-30">
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500/90 dark:from-blue-400/60 to-transparent mb-3 rotate-12 rounded-full"></div>
        <div className="w-20 h-1 bg-gradient-to-r from-teal-500/80 dark:from-teal-400/50 to-transparent mb-3 rotate-12 ml-2 rounded-full"></div>
        <div className="w-16 h-1 bg-gradient-to-r from-slate-500/70 dark:from-slate-400/40 to-transparent rotate-12 ml-4 rounded-full"></div>
      </div>

      {/* Much more visible academic symbols */}
      <div className="absolute bottom-1/4 right-1/3">
        <div className="relative opacity-60 dark:opacity-35">
          {/* Graduation cap representation */}
          <div className="w-8 h-2 bg-blue-400/80 dark:bg-blue-300/50 rounded-full mb-1 shadow-sm"></div>
          <div className="w-6 h-6 bg-blue-400/70 dark:bg-blue-300/40 transform rotate-45 mx-1 shadow-sm"></div>
        </div>
      </div>

      <div className="absolute top-2/3 right-16">
        <div className="relative opacity-60 dark:opacity-35">
          {/* Certificate/award representation */}
          <div className="w-6 h-8 border-2 border-teal-400/80 dark:border-teal-300/50 rounded-sm shadow-sm"></div>
          <div className="absolute inset-1 w-4 h-6 bg-teal-300/60 dark:bg-teal-200/30 rounded-sm"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent border-t-teal-400/80 dark:border-t-teal-300/50"></div>
        </div>
      </div>

      {/* Much more visible connecting lines */}
      <div className="absolute top-1/2 left-1/4 w-32 h-0.5 bg-gradient-to-r from-blue-400/70 dark:from-blue-300/40 via-blue-400/40 dark:via-blue-300/20 to-transparent rotate-6 opacity-80 dark:opacity-50 shadow-sm"></div>
      <div className="absolute top-3/5 right-1/4 w-28 h-0.5 bg-gradient-to-l from-teal-400/70 dark:from-teal-300/40 via-teal-400/40 dark:via-teal-300/20 to-transparent -rotate-6 opacity-80 dark:opacity-50 shadow-sm"></div>

      {/* More visible abstract learning symbols */}
      <div className="absolute top-1/6 right-1/5 text-blue-500/40 dark:text-blue-400/25 text-xl font-light select-none">
        ∞
      </div>
      <div className="absolute bottom-1/5 left-1/6 text-teal-500/40 dark:text-teal-400/25 text-xl font-light select-none">
        ∴
      </div>

      {/* Additional scattered elements for more visibility */}
      <div className="absolute top-1/2 right-1/3">
        <div className="w-4 h-4 border-2 border-blue-400/60 dark:border-blue-300/40 rotate-45"></div>
      </div>

      <div className="absolute bottom-1/2 left-1/3">
        <div className="w-3 h-3 bg-teal-400/60 dark:bg-teal-300/40 rounded-full"></div>
      </div>

      <div className="absolute top-3/4 left-1/2">
        <div className="w-5 h-5 border border-slate-400/50 dark:border-slate-300/30 rounded-sm rotate-12"></div>
      </div>

      {/* Enhanced subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-100/15 dark:via-blue-50/8 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/10 dark:from-slate-50/6 via-transparent to-teal-100/12 dark:to-teal-50/8"></div>
    </div>
  );
}
