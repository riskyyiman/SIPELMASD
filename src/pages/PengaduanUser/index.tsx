// src/pages/Pengaduan/index.tsx
import { Routes, Route } from 'react-router-dom';
import FormPengaduan from './FormPengaduan';
import DaftarPengaduan from './DaftarPengaduan';
import DetailPengaduan from './DetailPengaduan';
import PengaduanLayout from './PengaduanLayout';

export default function PengaduanRoutes() {
  return (
    <Routes>
      <Route element={<PengaduanLayout />}>
        <Route path="form" element={<FormPengaduan />} />
        <Route path="daftar" element={<DaftarPengaduan />} />
        <Route path=":id" element={<DetailPengaduan />} />
      </Route>
    </Routes>
  );
}
