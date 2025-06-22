// src/pages/Pengaduan/PengaduanLayout.tsx
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function PengaduanLayout() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 transition-all duration-300">
      {/* Animated background element */}
      <div
        className={`absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-200 opacity-20 filter blur-3xl transition-all duration-700 ${isHovered ? 'transform scale-110' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      ></div>

      {/* Main content with subtle floating effect */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="p-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
          <div className="p-6 md:p-8">
            <Outlet />
          </div>
        </div>

        {/* Floating action hint (optional) */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-full animate-pulse">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Isi formulir dengan lengkap untuk proses yang lebih cepat
          </div>
        </div>
      </main>

      {/* Subtle animated circles in background */}
      <div className="fixed bottom-10 left-10 w-32 h-32 rounded-full bg-blue-100 opacity-10 animate-float"></div>
      <div className="fixed top-1/3 right-20 w-48 h-48 rounded-full bg-blue-200 opacity-5 animate-float animation-delay-2000"></div>

      {/* Add this to your global CSS or Tailwind config */}
      <style>{`
  @keyframes float {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
`}</style>
    </div>
  );
}
