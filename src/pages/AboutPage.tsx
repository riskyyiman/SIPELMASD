import PageBreadcrumb from '../components/common/PageBreadCrumb';
import PageMeta from '../components/common/PageMeta';

export default function AboutPage() {
  return (
    <>
      <PageMeta title="Tentang Aplikasi | SiPelMasD - Sistem Pengaduan Masyarakat Desa" description="Halaman tentang aplikasi SiPelMasD (Sistem Pelaporan Masyarakat Desa)." />
      <PageBreadcrumb pageTitle="Tentang Aplikasi" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Tentang SiPelMasD</h3>

        <p className="mb-4 leading-relaxed text-gray-600 dark:text-white/80">
          <strong className="text-blue-600 dark:text-blue-400">SiPelMasD</strong> (Sistem Pelaporan Masyarakat Desa) adalah aplikasi berbasis web yang memungkinkan masyarakat desa menyampaikan laporan, keluhan, dan aspirasi mereka secara
          cepat dan transparan. Aplikasi ini bertujuan untuk mendekatkan layanan publik kepada masyarakat melalui pemanfaatan teknologi digital.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 shadow-sm transition-all hover:shadow-md dark:border-blue-900 dark:bg-blue-900/20">
            <div className="mb-4 flex items-center">
              <div className="mr-3 rounded-lg bg-blue-100 p-2 dark:bg-blue-800/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-400">Tujuan Utama</h4>
            </div>
            <ul className="list-inside space-y-2 text-gray-600 dark:text-white/80">
              <li className="flex items-start">
                <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Meningkatkan pelayanan publik di tingkat desa
              </li>
              <li className="flex items-start">
                <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mempermudah proses pelaporan masyarakat
              </li>
              <li className="flex items-start">
                <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mendukung transparansi dan kecepatan respon petugas
              </li>
              <li className="flex items-start">
                <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Menyediakan sistem monitoring dan histori laporan
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-5 shadow-sm transition-all hover:shadow-md dark:border-blue-900 dark:bg-blue-900/20">
            <div className="mb-4 flex items-center">
              <div className="mr-3 rounded-lg bg-blue-100 p-2 dark:bg-blue-800/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-400">Fitur Aplikasi</h4>
            </div>
            <ul className="list-inside space-y-2 text-gray-600 dark:text-white/80">
              <li className="flex items-start">
                <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Formulir pelaporan online
              </li>
              <li className="flex items-start">
                <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Manajemen laporan oleh admin & petugas
              </li>
              <li className="flex items-start">
                <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Notifikasi perkembangan status
              </li>
              <li className="flex items-start">
                <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Riwayat dan arsip laporan
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
          <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">Kontak & Dukungan</h4>
          <p className="text-gray-600 dark:text-white/80">Untuk pertanyaan atau dukungan teknis, silakan hubungi tim administrasi desa atau kunjungi kantor desa selama jam kerja.</p>
          <div className="mt-6">
            <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email resmi dukungan</p>
                <a href="mailto:sipelmasd@desa.id" className="text-lg font-medium text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300">
                  sipelmasd@desa.id
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
