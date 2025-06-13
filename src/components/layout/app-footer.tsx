import React from 'react';

export function AppFooter() {
  return (
    <footer className="bg-background border-t border-border py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="text-slate-400 text-sm text-center">
            © 2025 Dinas Pendidikan Kabupaten Nias Selatan. Hak cipta
            dilindungi undang-undang.
            <div className="mt-1">
              Dibuat oleh{' '}
              <a
                href="https://nestorzamili.works/"
                className="text-primary hover:underline"
              >
                Nestor Zamili
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
