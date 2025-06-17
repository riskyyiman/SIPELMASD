import { Routes, Route } from 'react-router-dom';
import PengaduanLayout from './PengaduanLayout';
import FormPengaduan from './FormPengaduan';
import DaftarPengaduan from './DaftarPengaduan';
import DetailPengaduan from './DetailPengaduan';

export default function PengaduanRoutes() {
  return (
    <Routes>
      <Route element={<PengaduanLayout />}>
        <Route path="form" element={<FormPengaduan />} />
        <Route path="daftar" element={<DaftarPengaduan />} />
        <Route path="detail/:id" element={<DetailPengaduan />} />
        <Route index element={<FormPengaduan />} /> {/* Default ke form */}
      </Route>
    </Routes>
  );
}
