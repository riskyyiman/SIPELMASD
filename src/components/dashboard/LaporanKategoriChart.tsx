import { useQuery } from '@apollo/client';
import { GET_PENGADUAN_LIST } from '../../graphql/queris';
import Chart from 'react-apexcharts';
import LoadingSpinner from '../ui/LoadingSpinner';
import type { ApexOptions } from 'apexcharts';

const LaporanKategoriChart = () => {
  const { loading, error, data } = useQuery(GET_PENGADUAN_LIST);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 py-4">Gagal memuat data: {error.message}</div>;

  const pengaduanList = data?.daftarPengaduan || [];

  // Hitung laporan berdasarkan kategori
  const kategoriMap: Record<string, number> = {};

  pengaduanList.forEach((item: any) => {
    const kategori = item.kategori || 'Lainnya';
    kategoriMap[kategori] = (kategoriMap[kategori] || 0) + 1;
  });

  const categories = Object.keys(kategoriMap);
  const values = Object.values(kategoriMap);

  const options: ApexOptions = {
    chart: {
      id: 'laporan-kategori-chart',
      toolbar: { show: false },
    },
    xaxis: {
      categories,
      tickAmount: categories.length,
      labels: {
        style: { fontSize: '12px' },
        formatter: (val) => val, // pastikan tampil nama kategori
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => (Number.isInteger(value) ? value.toString() : ''), // tampilkan hanya angka bulat
      },
    },
    colors: ['#6366f1'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
  };

  const series = [
    {
      name: 'Jumlah',
      data: values,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Laporan per Kategori</h2>
      <Chart options={options} series={series} type="bar" width="100%" height={300} />
    </div>
  );
};

export default LaporanKategoriChart;
