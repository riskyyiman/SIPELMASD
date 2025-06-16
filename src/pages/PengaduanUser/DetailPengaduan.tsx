// src/pages/Pengaduan/DetailPengaduan.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PENGADUAN_DETAIL } from '../../graphql/queris';
import { formatDate } from '../../utils/format';

import CommentForm from '../../components/pengaduan/CommentForm';
import CommentList from '../../components/pengaduan/CommentList';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function DetailPengaduan() {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_PENGADUAN_DETAIL, {
    variables: { id },
  });

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (data?.pengaduan?.lampiran) {
      // Simulasi pemrosesan gambar
      const dummyImages = ['https://via.placeholder.com/600x400?text=Lampiran+1', 'https://via.placeholder.com/600x400?text=Lampiran+2'];
      setImages(dummyImages);
    }
  }, [data]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  const pengaduan = data?.pengaduan;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-700 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Detail Laporan Pengaduan</h1>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Status Badge */}
        <div className="mb-6">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${pengaduan.status === 'diterima' ? 'bg-yellow-100 text-yellow-800' : pengaduan.status === 'diproses' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
            {pengaduan.status.toUpperCase()}
          </span>
        </div>

        {/* Main Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{pengaduan.judul}</h2>
            <p className="text-gray-600 mb-4">{pengaduan.deskripsi}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">{pengaduan.kategori}</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">{pengaduan.lokasi}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Pelapor</h3>
                <p className="text-gray-900">{pengaduan.pelapor?.nama || 'Anonim'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tanggal Lapor</h3>
                <p className="text-gray-900">{formatDate(pengaduan.createdAt)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Terakhir Diupdate</h3>
                <p className="text-gray-900">{formatDate(pengaduan.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lampiran */}
        {images.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Lampiran</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((img, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <img src={img} alt={`Lampiran ${index + 1}`} className="w-full h-48 object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Komentar/Respon */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Komentar & Respon</h3>

          <CommentForm pengaduanId={id} />

          <div className="mt-6">
            <CommentList comments={pengaduan.komentar || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
