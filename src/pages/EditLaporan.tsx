// src/pages/Pengaduan/FormEditLaporan.tsx
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GET_PENGADUAN_BY_ID, GET_PENGADUAN_DETAIL, UPDATE_PENGADUAN } from '../graphql/queris';
import { sanitizeInput } from '../utils/sanitize';
import Button from '../components/ui/button/Button';

const FormEditLaporan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_PENGADUAN_DETAIL, {
    variables: { id },
    skip: !id,
  });
  const [updatePengaduan] = useMutation(UPDATE_PENGADUAN);

  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [status, setStatus] = useState('diterima');

  useEffect(() => {
    if (data && data.pengaduan) {
      setJudul(data.pengaduan.judul);
      setKategori(data.pengaduan.kategori || '');
      setLokasi(data.pengaduan.lokasi || '');
      setDeskripsi(data.pengaduan.deskripsi || '');
      setStatus(data.pengaduan.status);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updatePengaduan({ variables: { id, judul, kategori, lokasi, deskripsi, status } });
      navigate('/pengaduan');
    } catch (err) {
      alert('Gagal mengubah laporan');
    }
  };

  if (loading) return <div className="text-center py-8">Memuat data...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Edit Laporan Pengaduan</h1>
        <button onClick={() => navigate('/pengaduan')} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
          Kembali
        </button>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul Laporan</label>
              <input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required>
                <option value="">Pilih Kategori</option>
                <option value="infrastruktur">Infrastruktur</option>
                <option value="pelayanan">Pelayanan Publik</option>
                <option value="lingkungan">Lingkungan</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Kejadian</label>
              <input type="text" value={lokasi} onChange={(e) => setLokasi(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <textarea rows={5} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required>
                <option value="diterima">Diterima</option>
                <option value="diproses">Diproses</option>
                <option value="selesai">Selesai</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/pengaduan')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Batal
            </button>
            <Button type="submit">Simpan Perubahan</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEditLaporan;
