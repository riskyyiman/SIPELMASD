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
                { value: '7.500+', label: 'Laporan Terproses' },
                { value: '92%', label: 'Tingkat Respon' },
                { value: '10', label: 'Instansi Terhubung' },
              ].map((stat, index) => (
                <motion.div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100" whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} transition={{ type: 'spring', stiffness: 300 }}>
                  <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Interactive Card Component with Revised Steps */}
          <div className="relative lg:w-1/2">
            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-lg mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Card Header */}
              <div className="bg-blue-600 p-4 flex items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-white opacity-80"></div>
                  <div className="w-3 h-3 rounded-full bg-white opacity-60"></div>
                  <div className="w-3 h-3 rounded-full bg-white opacity-40"></div>
                </div>
                <p className="text-white font-medium ml-4">Cara Menggunakan SiPelMasD</p>
              </div>

              {/* Card Content with Revised Steps */}
              <div className="p-6 space-y-6">
                {/* Step 1 - Buat Akun */}
                <motion.div className="flex items-start" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Buat Akun</h3>
                    <p className="text-gray-600 text-sm mt-1">Daftar dengan mudah menggunakan email atau nomor telepon Anda.</p>
                  </div>
                </motion.div>

                {/* Step 2 - Isi Formulir */}
                <motion.div className="flex items-start" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Isi Formulir</h3>
                    <p className="text-gray-600 text-sm mt-1">Sampaikan laporan Anda dengan melengkapi formulir pengaduan.</p>
                  </div>
                </motion.div>

                {/* Step 3 - Pantau Perkembangan */}
                <motion.div className="flex items-start" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                  <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Pantau Perkembangan</h3>
                    <p className="text-gray-600 text-sm mt-1">Lacak status laporan Anda melalui website SiPelMasD.</p>
                  </div>
                </motion.div>
              </div>

              {/* Animated Progress Bar */}
              <div className="px-6 pb-6">
                <motion.div className="h-2 bg-gray-200 rounded-full overflow-hidden" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 2, delay: 0.5 }}>
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '100%' }} />
                </motion.div>
                <p className="text-right text-sm text-gray-500 mt-2">Proses pengaduan yang sederhana dan transparan</p>
              </div>
            </motion.div>

            {/* Floating Elements for Visual Interest */}
            <motion.div
              className="absolute -top-6 -left-6 w-16 h-16 bg-blue-100 rounded-full opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
            <motion.div
              className="absolute -bottom-4 -right-4 w-20 h-20 bg-green-100 rounded-full opacity-30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 1,
              }}
            />
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
              <p className="text-gray-600">Lacak status laporan Anda melalui website SiPelMasD.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 md:px-12 lg:px-24 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-400"></div>
          <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-blue-500"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-blue-300"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h3 className="text-3xl md:text-4xl font-bold mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            Siap Melayani Masyarakat dengan Lebih Baik
          </motion.h3>

          <motion.p className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 0.9 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
            Bergabunglah dengan ribuan masyarakat lainnya yang telah menggunakan SiPelMasD untuk menyampaikan aspirasi mereka.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}>
            <Link to="/pengaduan/form" onClick={handleReportClick}>
              <Button className="px-8 py-3 text-lg font-bold text-white bg-blue-500 hover:bg-blue-400 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">Mulai Laporkan</Button>
            </Link>
            <Link to="/tentang">
              <Button className="px-8 py-3 text-lg font-bold text-white bg-blue-500 hover:bg-blue-400 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                Pelajari Lebih Lanjut
              </Button>
            </Link>
          </motion.div>

          {/* Floating community avatars */}
          <motion.div className="flex justify-center mt-12 -mb-16 md:-mb-24" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} viewport={{ once: true }}>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <motion.div key={item} className="w-12 h-12 rounded-full bg-white border-2 border-blue-500 overflow-hidden shadow-md" whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <div className={`w-full h-full bg-blue-${100 + item * 100} flex items-center justify-center text-blue-600 font-bold`}>{item}</div>
                </motion.div>
              ))}
              <div className="w-12 h-12 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-blue-600 font-bold shadow-md">5K+</div>
            </div>
          </motion.div>
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
                08888888888888888
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
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.736 0 8.332.014 7.052.072 5.773.13 4.602.385 3.635 1.352 2.668 2.319 2.413 3.49 2.355 4.768.297 6.048.284 6.452.284 12s.014 5.952.072 7.232c.058 1.278.313 2.449 1.28 3.416.967.967 2.138 1.222 3.416 1.28 1.28.058 1.684.072 7.232.072s5.952-.014 7.232-.072c1.278-.058 2.449-.313 3.416-1.28.967-.967 1.222-2.138 1.28-3.416.058-1.28.072-1.684.072-7.232s-.014-5.952-.072-7.232c-.058-1.278-.313-2.449-1.28-3.416C21.449.385 20.278.13 19 .072 17.72.014 17.316 0 14.052 0H12zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
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
