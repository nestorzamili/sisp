import Link from 'next/link';

export function TermsFooter() {
  return (
    <div className="pt-3 text-center text-xs text-muted-foreground border-t border-border">
      <p className="leading-relaxed">
        Dengan masuk, Anda menyetujui{' '}
        <a
          href="/terms"
          className="text-primary hover:opacity-80 underline underline-offset-2 font-medium transition-colors"
        >
          Syarat dan Ketentuan
        </a>{' '}
        dan{' '}
        <a
          href="/privacy"
          className="text-primary hover:opacity-80 underline underline-offset-2 font-medium transition-colors"
        >
          Kebijakan Privasi
        </a>
      </p>
    </div>
  );
}

interface AuthLinkProps {
  question: string;
  linkText: string;
  href: string;
}

export function AuthLink({ question, linkText, href }: AuthLinkProps) {
  return (
    <div className="text-center text-sm w-full pt-1">
      <span className="text-muted-foreground">{question}</span>{' '}
      <Link
        href={href}
        className="font-semibold text-primary hover:opacity-80 transition-colors"
      >
        {linkText}
      </Link>
    </div>
  );
}

export function BackToLoginLink() {
  return (
    <div className="text-center">
      <Link
        href="/sign-in"
        className="inline-flex items-center text-primary text-sm font-semibold hover:opacity-80 transition-colors group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 group-hover:-translate-x-1 transition-transform"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Kembali ke Login
      </Link>
    </div>
  );
}
