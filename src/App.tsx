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

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* ✅ Landing page di luar layout */}
        <Route index element={<LandingPage />} />

        {/* ✅ Layout dashboard setelah login */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />

          {/* Others Page */}
          <Route path="/about" element={<AboutPage />} />

          {/* Pengaduan Routes */}
          <Route path="/laporan" element={<SemuaLaporan />} />
          <Route path="/tambah-laporan" element={<FormTambahLaporan />} />
          <Route path="/riwayat" element={<RiwayatLaporan />} />
          <Route path="/akun/petugas" element={<Petugas />} />
          <Route path="/akun/pengguna" element={<User />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />

          {/* Forms */}
          <Route path="/form-elements" element={<FormElements />} />

          {/* Tables */}
          <Route path="/basic-tables" element={<BasicTables />} />

          {/* UI Elements */}
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />

          {/* Charts */}
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Route>

        {/* ✅ Standalone Pengaduan Routes (outside dashboard layout) */}
        <Route path="/pengaduan/*" element={<PengaduanRoutes />} />

        {/* Auth Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Logout Page */}
        <Route path="/logout" element={<Logout />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
