import DashboardSummaryCards from '../../components/dashboard/DashboardSummaryCards';
import LaporanStatusChart from '../../components/dashboard/LaporanStatusChart';
import LaporanKategoriChart from '../../components/dashboard/LaporanKategoriChart';
import LaporanTerbaru from '../../components/dashboard/LaporanTerbaru';
import PageMeta from '../../components/common/PageMeta';

export default function Home() {
  return (
    <>
      <PageMeta title="Dashboard | SiPelMasD" description="Halaman dashboard utama untuk sistem pelaporan masyarakat desa" />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Ringkasan laporan */}
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <DashboardSummaryCards />
          <LaporanStatusChart />
        </div>

        {/* Grafik kategori atau peta */}
        <div className="col-span-12 xl:col-span-5">
          <LaporanKategoriChart />
        </div>

        {/* Aktivitas terbaru */}
        <div className="col-span-12">
          <LaporanTerbaru />
        </div>
      </div>
    </>
  );
}
