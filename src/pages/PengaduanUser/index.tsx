import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PengaduanLayout from './PengaduanLayout';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

// Lazy loaded components
const FormPengaduan = lazy(() => import('./FormPengaduan'));
const DaftarPengaduan = lazy(() => import('./DaftarPengaduan'));
const DetailPengaduan = lazy(() => import('./DetailPengaduan'));

export default function PengaduanRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<PengaduanLayout />}>
          <Route path="form" element={<FormPengaduan />} />
          <Route path="daftar" element={<DaftarPengaduan />} />
          <Route path=":id" element={<DetailPengaduan />} />
          <Route index element={<FormPengaduan />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
