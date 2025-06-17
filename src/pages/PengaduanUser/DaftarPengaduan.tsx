// src/pages/Pengaduan/DaftarPengaduan.tsx
import { useQuery } from '@apollo/client';
import { GET_PENGADUAN_LIST } from '../../graphql/queris';
import { formatDate } from '../../utils/format';

type Pengaduan = {
  id: string;
  judul: string;
  kategori: string;
  status: 'diterima' | 'diproses' | 'selesai';
  tanggal: string;
};

export default function DaftarPengaduan() {
  const { loading, error, data } = useQuery(GET_PENGADUAN_LIST);

  if (loading) return <div className="text-center py-8">Memuat data...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Laporan Pengaduan</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.daftarPengaduan?.map((item: Pengaduan) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.judul}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'diterima' ? 'bg-yellow-100 text-yellow-800' : item.status === 'diproses' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.tanggal)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href={`/pengaduan/${item.id}`} className="text-blue-600 hover:text-blue-900">
                    Detail
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-500">Total Laporan: {data?.daftarPengaduan?.length}</div>
    </div>
  );
}
