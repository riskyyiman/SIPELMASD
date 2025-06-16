// src/pages/Pengaduan/PengaduanLayout.tsx
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/button/Button';

export default function PengaduanLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple header for pengaduan pages */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            SiPelMasD
          </Link>
          <div className="flex gap-4">
            <Link to="/signin">
              <Button variant="outline">Masuk</Button>
            </Link>
            <Link to="/signup">
              <Button>Daftar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Simple footer */}
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} SiPelMasD - Layanan Pengaduan Masyarakat Digital</p>
        </div>
      </footer>
    </div>
  );
}
