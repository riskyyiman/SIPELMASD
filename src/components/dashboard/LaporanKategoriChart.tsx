import Chart from 'react-apexcharts';

const LaporanKategoriChart = () => {
  const data = {
    options: {
      chart: {
        id: 'laporan-kategori-chart',
      },
      xaxis: {
        categories: ['Infrastruktur', 'Keamanan', 'Kesehatan', 'Lingkungan'],
      },
    },
    series: [
      {
        name: 'Jumlah',
        data: [25, 14, 20, 18],
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Laporan per Kategori</h2>
      <Chart options={data.options} series={data.series} type="bar" width="100%" height={300} />
    </div>
  );
};

export default LaporanKategoriChart;
