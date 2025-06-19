// src/pages/SemuaLaporan.tsx
import { useQuery, useMutation } from '@apollo/client';
import { GET_PENGADUAN_LIST, DELETE_PENGADUAN, UPDATE_PENGADUAN_STATUS } from '../graphql/queris';
import { formatDate } from '../utils/format';
import { useNavigate } from 'react-router-dom';

type Pengaduan = {
  id: string;
  judul: string;
  kategori: string;
  status: 'diterima' | 'diproses' | 'selesai';
  tanggal: string;
};

const SemuaLaporan = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_PENGADUAN_LIST);
  const [deletePengaduan] = useMutation(DELETE_PENGADUAN);
  const [updateStatus] = useMutation(UPDATE_PENGADUAN_STATUS);

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus laporan ini?')) {
      try {
        await deletePengaduan({ variables: { id } });
        refetch();
      } catch (err) {
        alert('Gagal menghapus laporan');
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const pengaduan = data.daftarPengaduan.find((p: Pengaduan) => p.id === id);
    if (!pengaduan) return;

    try {
      await updateStatus({
        variables: {
          id: pengaduan.id,
          judul: pengaduan.judul,
          kategori: pengaduan.kategori,
          lokasi: pengaduan.lokasi || '', // jika null
          deskripsi: pengaduan.deskripsi,
          status: newStatus,
        },
        refetchQueries: [{ query: GET_PENGADUAN_LIST }],
      });
    } catch (err) {
      alert('Gagal mengubah status');
    }
  };

  if (loading) return <div className="text-center py-8">Memuat data...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Kelola Laporan Pengaduan</h1>
        <button onClick={() => navigate('/tambah-laporan')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Tambah Laporan
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.daftarPengaduan?.map((item: Pengaduan) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.judul}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <select value={item.status} onChange={(e) => handleStatusChange(item.id, e.target.value)} className="px-2 py-1 border rounded text-xs bg-white">
                    <option value="diterima">Diterima</option>
                    <option value="diproses">Diproses</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.tanggal)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button onClick={() => navigate(`/pengaduan/${item.id}`)} className="text-blue-600 hover:text-blue-900">
                    Detail
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-500">Total Laporan: {data?.daftarPengaduan?.length}</div>
    </div>
  );
};

export default SemuaLaporan;
