import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/AuthPages/SignIn';
import SignUp from './pages/AuthPages/SignUp';
import NotFound from './pages/OtherPage/NotFound';
import Videos from './pages/UiElements/Videos';
import Images from './pages/UiElements/Images';
import Alerts from './pages/UiElements/Alerts';
import Badges from './pages/UiElements/Badges';
import Avatars from './pages/UiElements/Avatars';
import Buttons from './pages/UiElements/Buttons';
import LineChart from './pages/Charts/LineChart';
import BarChart from './pages/Charts/BarChart';
import Calendar from './pages/Calendar';
import BasicTables from './pages/Tables/BasicTables';
import FormElements from './pages/Forms/FormElements';
import Blank from './pages/Blank';
import AppLayout from './layout/AppLayout';
import { ScrollToTop } from './components/common/ScrollToTop';
import Home from './pages/Dashboard/Home';
import PengaduanRoutes from './pages/PengaduanUser';
import LandingPage from './pages/LandingPage';
import SemuaLaporan from './pages/SemuaLaporan';
import FormTambahLaporan from './pages/TambahLaporan';
import RiwayatLaporan from './pages/RiwayatLaporan';
import Logout from './pages/Logout';
import Petugas from './pages/Petugas';
import User from './pages/User';
import AboutPage from './pages/AboutPage';
import SearchPage from './pages/SearchPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* ✅ Public - Landing & Auth */}
        <Route index element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />

        {/* ✅ Pengaduan user terbuka untuk masyarakat */}
        <Route path="/pengaduan/*" element={<PengaduanRoutes />} />

        {/* ✅ Protected Route: Hanya bisa diakses admin */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/laporan" element={<SemuaLaporan />} />
            <Route path="/tambah-laporan" element={<FormTambahLaporan />} />
            <Route path="/riwayat" element={<RiwayatLaporan />} />
            <Route path="/akun/petugas" element={<Petugas />} />
            <Route path="/akun/pengguna" element={<User />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/basic-tables" element={<BasicTables />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>
        </Route>

        {/* Fallback Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
