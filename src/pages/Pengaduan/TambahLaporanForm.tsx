import React from 'react';
import { useForm } from 'react-hook-form';
import DOMPurify from 'dompurify';

type FormData = {
  judul: string;
  deskripsi: string;
  kategori: string;
  lokasi: string;
};

const TambahLaporanForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const sanitizedData = {
      ...data,
      judul: DOMPurify.sanitize(data.judul),
      deskripsi: DOMPurify.sanitize(data.deskripsi),
      kategori: DOMPurify.sanitize(data.kategori),
      lokasi: DOMPurify.sanitize(data.lokasi),
    };

    // Simpan laporan ke backend (ganti dengan fetch/axios ke REST API)
    console.log('Laporan Dikirim:', sanitizedData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-gray-800">Tambah Laporan Baru</h2>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Judul</label>
        <input type="text" {...register('judul', { required: true })} className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
        {errors.judul && <p className="text-red-500 text-sm mt-1">Judul wajib diisi.</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Deskripsi</label>
        <textarea {...register('deskripsi', { required: true })} className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300" rows={4} />
        {errors.deskripsi && <p className="text-red-500 text-sm mt-1">Deskripsi wajib diisi.</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Kategori</label>
        <select {...register('kategori', { required: true })} className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300">
          <option value="">-- Pilih Kategori --</option>
          <option value="infrastruktur">Infrastruktur</option>
          <option value="kebersihan">Kebersihan</option>
          <option value="keamanan">Keamanan</option>
        </select>
        {errors.kategori && <p className="text-red-500 text-sm mt-1">Kategori wajib dipilih.</p>}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Lokasi</label>
        <input type="text" {...register('lokasi', { required: true })} className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300" />
        {errors.lokasi && <p className="text-red-500 text-sm mt-1">Lokasi wajib diisi.</p>}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Kirim Laporan
      </button>
    </form>
  );
};

export default TambahLaporanForm;
