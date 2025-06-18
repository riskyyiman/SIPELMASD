import { useQuery } from '@apollo/client';
import { GET_PENGADUAN_LIST } from '../../graphql/queris';
import LoadingSpinner from '../ui/LoadingSpinner';

const DashboardSummaryCards = () => {
  const { loading, error, data } = useQuery(GET_PENGADUAN_LIST);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center py-4">Gagal memuat data: {error.message}</div>;

  const pengaduanList = data?.daftarPengaduan || [];

  // Hitung jumlah per status
  const totalLaporan = pengaduanList.length;
  const dalamProses = pengaduanList.filter((item: any) => item.status === 'diproses').length;
  const selesai = pengaduanList.filter((item: any) => item.status === 'selesai').length;

  // Dummy untuk pengguna aktif (nanti bisa diganti dengan query user aktif)
  const penggunaAktif = 12;

  const summaryData = [
    { label: 'Total Laporan', value: totalLaporan, color: 'bg-blue-500' },
    { label: 'Dalam Proses', value: dalamProses, color: 'bg-yellow-500' },
    { label: 'Selesai', value: selesai, color: 'bg-green-500' },
    { label: 'Pengguna Aktif', value: penggunaAktif, color: 'bg-indigo-500' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryData.map((item) => (
        <div key={item.label} className={`p-4 rounded-lg shadow-md ${item.color} text-white`}>
          <h3 className="text-sm font-medium">{item.label}</h3>
          <p className="text-2xl font-bold">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummaryCards;
