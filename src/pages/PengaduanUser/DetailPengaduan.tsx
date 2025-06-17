// src/pages/Pengaduan/DetailPengaduan.tsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PENGADUAN_DETAIL } from '../../graphql/queris';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils/format';

export default function DetailPengaduan() {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery(GET_PENGADUAN_DETAIL, {
    variables: { id },
  });

  const pengaduan = data?.pengaduanById;

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
  if (!pengaduan) return <div className="text-center py-8 text-gray-500">Data tidak ditemukan.</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-700 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Detail Laporan Pengaduan</h1>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <a href="/pengaduan/daftar" className="text-sm text-blue-600 hover:underline">
            &larr; Kembali ke Daftar Pengaduan
          </a>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              pengaduan.status === 'diterima' ? 'bg-yellow-100 text-yellow-800' : pengaduan.status === 'diproses' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            }`}
          >
            {pengaduan.status}
          </span>
        </div>

        {/* Main Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{pengaduan.judul}</h2>
            <p className="text-gray-600 mb-4">{pengaduan.deskripsi}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {pengaduan.kategori && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">{pengaduan.kategori}</span>}
              {pengaduan.lokasi && <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">{pengaduan.lokasi}</span>}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500">ID Pelapor</h3>
                <p className="text-gray-900">{pengaduan.userId}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tanggal Lapor</h3>
                <p className="text-gray-900">{formatDate(pengaduan.tanggal)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
