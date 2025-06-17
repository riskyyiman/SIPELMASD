import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/button/Button';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const userName = localStorage.getItem('name');
  const isLoggedIn = !!userName;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const handleReportClick = (e: { preventDefault: () => void }) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header with scroll effect */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-blue-700 py-6'} text-white p-6 flex justify-between items-center`}>
        <h1 className={`text-2xl font-bold ${scrolled ? 'text-blue-700' : 'text-white'}`}>SiPelMasD</h1>
        <nav className="space-x-6 flex items-center">
          {isLoggedIn ? (
            <>
              <span className={`font-medium ${scrolled ? 'text-blue-700' : 'text-white'}`}>Welcome, {userName}</span>
              <button onClick={handleLogout} className={`p-1.5 rounded-full transition-all ${scrolled ? 'bg-gray-800 hover:bg-gray-900' : 'bg-gray-100 hover:bg-gray-200'} group`} aria-label="Logout">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-all duration-200 ${scrolled ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className={`hover:underline font-medium ${scrolled ? 'text-blue-700 hover:text-blue-800' : 'text-white'}`}>
                Masuk
              </Link>
              <Link to="/signup" className={`px-4 py-2 rounded-lg font-medium transition-colors ${scrolled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-700 hover:bg-gray-100'}`}>
                Daftar
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-32 pb-16 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl space-y-6">
            <motion.h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              Layanan Pengaduan Digital <span className="text-blue-600">Masyarakat</span>
            </motion.h2>
            <motion.p className="text-lg text-gray-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              Sampaikan keluhan, aspirasi, atau pengaduan Anda langsung ke instansi pemerintah dengan cepat, mudah, dan transparan.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 pt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <Link to="/pengaduan/form" className="flex-1" onClick={handleReportClick}>
                <Button className="w-full py-3 text-lg">Lapor Sekarang</Button>
              </Link>
              <Link to="/pengaduan/daftar" className="flex-1">
                <Button variant="outline" className="w-full py-3 text-lg">
                  Lihat Laporan
                </Button>
              </Link>
            </motion.div>
            {/* Animated Stats */}
            <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
              {[
                { value: '10.000+', label: 'Laporan Terproses' },
                { value: '95%', label: 'Tingkat Respon' },
                { value: '24', label: 'Instansi Terhubung' },
              ].map((stat, index) => (
                <motion.div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100" whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} transition={{ type: 'spring', stiffness: 300 }}>
                  <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Animated SVG Illustration */}
          <div className="relative lg:w-1/2">
            <motion.svg width="100%" viewBox="0 0 600 500" className="max-w-lg mx-auto" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              {/* Dark Theme Background */}
              <rect width="600" height="500" fill="#1a1b1e" rx="20" />

              {/* Decorative Elements */}
              <circle cx="50" cy="50" r="8" fill="#3b82f6" opacity="0.3" />
              <circle cx="550" cy="450" r="12" fill="#10b981" opacity="0.3" />
              <rect x="500" y="80" width="30" height="30" rx="15" fill="#818cf8" opacity="0.3" />

              {/* Grid Dots */}
              {Array.from({ length: 12 }).map((_, i) => (
                <circle key={i} cx={100 + i * 40} cy="400" r="1.5" fill="#374151" />
              ))}

              {/* Main Illustration Container */}
              <g transform="translate(50, 50)">
                {/* People - More Detailed */}
                <motion.g animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                  {/* Head */}
                  <circle cx="100" cy="100" r="25" fill="#FFD5C2" stroke="#374151" strokeWidth="2" />

                  {/* Body */}
                  <path d="M100 125 L100 200" stroke="#374151" strokeWidth="3" fill="none" />

                  {/* Arms */}
                  <path d="M100 140 L70 160 M100 140 L130 160" stroke="#374151" strokeWidth="3" fill="none" />

                  {/* Legs */}
                  <path d="M100 200 L80 240 M100 200 L120 240" stroke="#374151" strokeWidth="3" fill="none" />

                  {/* Face */}
                  <circle cx="90" cy="95" r="3" fill="#374151" />
                  <circle cx="110" cy="95" r="3" fill="#374151" />
                  <path d="M90 115 Q100 120 110 115" stroke="#374151" strokeWidth="2" fill="none" />

                  {/* Document in Hand */}
                  <motion.g initial={{ rotate: -5 }} animate={{ rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                    <rect x="125" y="140" width="50" height="70" rx="5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
                    <path d="M135 155 L165 155 M135 170 L160 170 M135 185 L150 185" stroke="#3b82f6" strokeWidth="1.5" />
                    <circle cx="140" cy="200" r="3" fill="#3b82f6" />
                  </motion.g>
                </motion.g>

                {/* Document Flow - Enhanced */}
                <motion.g
                  initial={{ x: 180, y: 100 }}
                  animate={{ x: [180, 400], y: [100, 80] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 5,
                    ease: 'easeInOut',
                  }}
                >
                  <rect x="0" y="0" width="100" height="120" rx="8" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
                  <path d="M20 25 L80 25 M20 50 L70 50 M20 75 L60 75" stroke="#3b82f6" strokeWidth="2" />
                  <circle cx="30" cy="100" r="5" fill="#10b981" />
                </motion.g>

                {/* Government Building - More Detailed */}
                <g transform="translate(380, 60)">
                  <motion.g whileHover={{ y: -5 }}>
                    {/* Building Base */}
                    <rect x="0" y="50" width="150" height="200" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" rx="5" />

                    {/* Roof */}
                    <path d="M-10 50 L160 50 L140 20 L10 20 Z" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />

                    {/* Windows */}
                    {Array.from({ length: 4 }).map((_, i) => (
                      <rect key={i} x="30" y={80 + i * 40} width="30" height="25" rx="3" fill="#3b82f6" opacity="0.7" />
                    ))}

                    {/* Door */}
                    <rect x="90" y="180" width="40" height="70" rx="3" fill="#3b82f6" />
                    <circle cx="115" cy="215" r="3" fill="#ffffff" />

                    {/* Flag */}
                    <path d="M150 20 L150 0" stroke="#374151" strokeWidth="2" />
                    <rect x="150" y="0" width="40" height="25" fill="#ef4444" rx="2" />
                  </motion.g>
                </g>
              </g>

              {/* Decorative Connection Line */}
              <motion.path d="M100 300 Q300 250 500 280" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8 4" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }} />
            </motion.svg>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 bg-white px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Mengapa Menggunakan SiPelMasD?</h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Aman dan Terpercaya</h4>
              <p className="text-gray-600">Data Anda dilindungi dengan sistem keamanan tingkat tinggi dan enkripsi modern.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Cepat dan Responsif</h4>
              <p className="text-gray-600">Proses pengaduan yang cepat dengan notifikasi real-time untuk setiap perkembangan.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Transparansi</h4>
              <p className="text-gray-600">Pantau perkembangan laporan Anda secara real-time dan dapatkan bukti tindak lanjut.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-blue-50 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">Bagaimana Cara Kerjanya?</h3>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">Hanya perlu 3 langkah mudah untuk menyampaikan pengaduan Anda</p>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center relative z-10">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">1</div>
              <h4 className="text-xl font-semibold mb-2">Buat Akun</h4>
              <p className="text-gray-600">Daftar dengan mudah menggunakan email atau nomor telepon Anda.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center relative z-10">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">2</div>
              <h4 className="text-xl font-semibold mb-2">Isi Formulir</h4>
              <p className="text-gray-600">Sampaikan laporan Anda dengan melengkapi formulir pengaduan.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center relative z-10">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">3</div>
              <h4 className="text-xl font-semibold mb-2">Pantau Perkembangan</h4>
              <p className="text-gray-600">Lacak status laporan Anda melalui dashboard pribadi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-blue-700 text-white px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Siap Melayani Masyarakat dengan Lebih Baik</h3>
          <p className="text-lg mb-8 opacity-90">Bergabunglah dengan ribuan masyarakat lainnya yang telah menggunakan SiPelMasD untuk menyampaikan aspirasi mereka.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pengaduan/form" onClick={handleReportClick}>
              <Button className="px-8 py-3 text-lg bg-white text-blue-700 hover:bg-gray-100 hover:text-blue-800 font-bold">Mulai Laporkan</Button>
            </Link>
            <Link to="/tentang">
              <Button className="px-8 py-3 text-lg bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 font-bold">Pelajari Lebih Lanjut</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">SiPelMasD</h4>
            <p className="text-gray-400">Sistem Informasi Pelayanan Masyarakat Digital untuk menyampaikan aspirasi dan pengaduan masyarakat.</p>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Tautan Cepat</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/pengaduan/form" className="text-gray-400 hover:text-white" onClick={handleReportClick}>
                  Buat Laporan
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="text-gray-400 hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Kontak</h5>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                (021) 1234-5678
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@sipelmasd.go.id
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4">Sosial Media</h5>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748 1.857.344.353.3.882.344 1.857.048 1.067.058 1.407.058 4.123v.08c0 2.643-.01 2.987-.058 4.043-.045.975-.207 1.504-.344 1.857-.182.466-.399.8-.748 1.15-.35.35-.683.566-1.15.748-.353.137-.882.3-1.857.344-1.054.048-1.37.058-3.808.058h-.08c-2.597 0-2.917-.01-3.96-.058-.976-.045-1.505-.207-1.858-.344-.467-.182-.8-.398-1.15-.748-.35-.35-.566-.683-.748-1.15-.137-.353-.3-.882-.344-1.857-.048-1.055-.058-1.37-.058-3.808 0-2.597.01-2.917.058-3.96.045-.976.207-1.505.344-1.858.182-.467.399-.8.748-1.15.35-.35.683-.566 1.15-.748.353-.137.882-.3 1.857-.344 1.023-.047 1.351-.058 3.807-.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-3.808 0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SiPelMasD. Dibangun oleh Tim Pengembang Pemerintah Daerah.</p>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Login Diperlukan</h3>
            <p className="text-gray-600 mb-6">Anda perlu login terlebih dahulu untuk dapat mengirimkan pengaduan. Silahkan login atau daftar jika belum memiliki akun.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1"
                onClick={() => {
                  setShowLoginModal(false);
                  navigate('/signin');
                }}
              >
                Login Sekarang
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowLoginModal(false);
                  navigate('/signup');
                }}
              >
                Daftar Akun
              </Button>
            </div>
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
