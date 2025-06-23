import React from 'react';
import ThemeTogglerTwo from '../../components/common/ThemeTogglerTwo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-6  z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex items-center justify-center w-full h-screen dark:bg-gray-900 sm:p-0">
        {/* Form berada di tengah */}
        <div className="w-full max-w-md">{children}</div>

        {/* Theme toggler (jika ingin tetap ada) */}
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
