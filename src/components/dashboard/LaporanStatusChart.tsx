import { useQuery } from '@apollo/client';
import { GET_PENGADUAN_LIST } from '../../graphql/queris';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import LoadingSpinner from '../ui/LoadingSpinner';

const LaporanStatusChart = () => {
  const { loading, error, data } = useQuery(GET_PENGADUAN_LIST);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center py-4">Gagal memuat data: {error.message}</div>;

  const pengaduanList = data?.daftarPengaduan || [];

  // Hitung jumlah status
  const statusCounts = {
    diterima: 0,
    diproses: 0,
    ditolak: 0,
    selesai: 0,
  };

  pengaduanList.forEach((item: any) => {
    const status = item.status;
    if (statusCounts.hasOwnProperty(status)) {
      statusCounts[status as keyof typeof statusCounts]++;
    }
  });

  const series = [statusCounts.diterima, statusCounts.diproses, statusCounts.ditolak, statusCounts.selesai];

  const chartOptions: ApexOptions = {
    labels: ['Diterima', 'Diproses', 'Ditolak', 'Selesai'],
    chart: {
      type: 'donut',
    },
    colors: ['#3b82f6', '#facc15', '#ef4444', '#22c55e'],
    legend: {
      position: 'bottom',
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Status Laporan</h2>
      <Chart options={chartOptions} series={series} type="donut" width="100%" />
    </div>
  );
};

export default LaporanStatusChart;
