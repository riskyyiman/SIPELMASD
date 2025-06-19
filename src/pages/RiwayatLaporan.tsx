// src/pages/RiwayatLaporan.tsx
import { useQuery } from '@apollo/client';
import { GET_PENGADUAN_LIST } from '../graphql/queris';
import { formatDate } from '../utils/format';

type Pengaduan = {
  id: string;
  judul: string;
  kategori: string;
  status: 'diterima' | 'diproses' | 'selesai';
  tanggal: string;
};

const RiwayatLaporan = () => {
  const { loading, error, data, refetch } = useQuery(GET_PENGADUAN_LIST, {
    fetchPolicy: 'network-only', // ⬅️ memastikan selalu ambil data terbaru
  });

  const laporanSelesai = data?.daftarPengaduan?.filter((item: Pengaduan) => item.status === 'selesai');

  if (loading) return <div className="text-center py-8">Memuat riwayat laporan...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Riwayat Laporan</h1>
        <p className="text-sm text-gray-500 mt-1">Berikut adalah daftar laporan yang telah diselesaikan.</p>
      </div>

      {laporanSelesai?.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Belum ada laporan yang selesai.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {laporanSelesai.map((item: Pengaduan) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.judul}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.kategori}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.tanggal)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">Selesai</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-500">Total Laporan Selesai: {laporanSelesai?.length}</div>
    </div>
  );
};

export default RiwayatLaporan;
