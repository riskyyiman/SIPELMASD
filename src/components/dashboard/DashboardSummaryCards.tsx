import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_PENGADUAN_LIST } from '../../graphql/queris';
import LoadingSpinner from '../ui/LoadingSpinner';

const DashboardSummaryCards = () => {
  const { loading, error, data } = useQuery(GET_PENGADUAN_LIST);
  const [totalPengguna, setTotalPengguna] = useState<number>(0); // State untuk total pengguna

  // Ambil data total pengguna dari backend
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/user-count');
        const json = await res.json();
        setTotalPengguna(json.totalUsers);
      } catch (err) {
        console.error('Gagal mengambil total pengguna:', err);
      }
    };

    fetchUserCount();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center py-4">Gagal memuat data: {error.message}</div>;

  const pengaduanList = data?.daftarPengaduan || [];

  // Hitung jumlah per status
  const totalLaporan = pengaduanList.length;
  const dalamProses = pengaduanList.filter((item: any) => item.status === 'diproses').length;
  const selesai = pengaduanList.filter((item: any) => item.status === 'selesai').length;

  const summaryData = [
    { label: 'Total Laporan', value: totalLaporan, color: 'bg-blue-500' },
    { label: 'Dalam Proses', value: dalamProses, color: 'bg-yellow-500' },
    { label: 'Selesai', value: selesai, color: 'bg-green-500' },
    { label: 'Total Pengguna', value: totalPengguna, color: 'bg-indigo-500' },
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
