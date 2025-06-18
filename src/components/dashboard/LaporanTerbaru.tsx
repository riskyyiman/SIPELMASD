import { useQuery } from '@apollo/client';
import { GET_PENGADUAN_LIST } from '../../graphql/queris';
import LoadingSpinner from '../ui/LoadingSpinner';

type Status = 'diterima' | 'diproses' | 'selesai';

type Pengaduan = {
  id: string;
  judul: string;
  userId: string;
  status: Status;
  tanggal: string;
};

const statusColor: Record<Status, string> = {
  diterima: 'bg-yellow-100 text-yellow-700',
  diproses: 'bg-blue-100 text-blue-700',
  selesai: 'bg-green-100 text-green-700',
};

const LaporanTerbaru = () => {
  const { loading, error, data } = useQuery(GET_PENGADUAN_LIST);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 py-4">Gagal memuat data: {error.message}</div>;

  const today = new Date().toISOString().split('T')[0];

  const laporanHariIni = data?.daftarPengaduan?.filter((laporan: Pengaduan) => laporan.tanggal.split('T')[0] === today) || [];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Laporan Terbaru Hari Ini</h2>
      {laporanHariIni.length === 0 ? (
        <p className="text-sm text-gray-500">Tidak ada laporan hari ini.</p>
      ) : (
        <table className="w-full text-sm table-auto">
          <thead>
            <tr className="text-left border-b border-gray-200 dark:border-gray-700">
              <th className="py-2">ID User</th>
              <th className="py-2">Judul</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {laporanHariIni.map((laporan: Pengaduan) => (
              <tr key={laporan.id} className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2">{laporan.userId}</td>
                <td className="py-2">{laporan.judul}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[laporan.status]}`}>{laporan.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LaporanTerbaru;
