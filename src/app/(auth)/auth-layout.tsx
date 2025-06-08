'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AuthBackgroundShapes } from './_components/auth-background-shapes';

interface Props {
  children?: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: Props) {
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add('auth-page-loaded');
    return () => {
      document.body.classList.remove('auth-page-loaded');
    };
  }, []);

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-auth-pattern overflow-hidden">
      <AuthBackgroundShapes />

      <main className="flex flex-col flex-grow w-full h-full relative z-10">
        <div className="flex flex-col justify-center items-center min-h-screen px-4 py-8">
          <div className="w-full max-w-[440px] mx-auto">
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center text-center space-y-3 mb-5">
                <div className="flex flex-col items-center space-y-3">
                  <Image
                    src="/logo.png"
                    alt="SISP Nias Selatan"
                    width={56}
                    height={56}
                    className="h-12 w-12 sm:h-14 sm:w-14 object-contain cursor-pointer hover:scale-105 transition-transform duration-200"
                    priority
                    onClick={handleLogoClick}
                  />

                  <div className="space-y-1">
                    <h1 className="text-base sm:text-lg font-bold text-foreground">
                      {title}
                    </h1>
                    {subtitle && (
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                        {subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full mb-4">{children}</div>

              <div className="text-center text-[10px] sm:text-xs text-muted-foreground pt-3 border-t border-border w-full">
                <p className="mb-1">Butuh bantuan teknis?</p>
                <a
                  href="https://nestorzamili.works/#contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-brand font-medium hover:opacity-80 transition-colors text-[10px] sm:text-xs"
                >
                  Hubungi Support
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M7 17L17 7M7 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
