import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

const LaporanStatusChart = () => {
  const chartOptions: ApexOptions = {
    labels: ['Baru', 'Diproses', 'Ditolak', 'Selesai'],
    chart: {
      type: 'donut', // ✅ Ini sekarang sesuai literal type
    },
    colors: ['#3b82f6', '#facc15', '#ef4444', '#22c55e'],
  };

  const series = [28, 40, 15, 45]; // Baru, Diproses, Ditolak, Selesai

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Status Laporan</h2>
      <Chart options={chartOptions} series={series} type="donut" width="100%" />
    </div>
  );
};

export default LaporanStatusChart;
