import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sanitizeInput } from '../../utils/sanitize';
import Button from '../../components/ui/button/Button';
import { useMutation, gql } from '@apollo/client';
import { GET_PENGADUAN_LIST } from '../../graphql/queris';

type FormData = {
  judul: string;
  kategori: string;
  lokasi: string;
  deskripsi: string;
  lampiran?: FileList;
};

const TAMBAH_PENGADUAN = gql`
  mutation TambahPengaduan($judul: String!, $kategori: String!, $lokasi: String!, $deskripsi: String!) {
    tambahPengaduan(judul: $judul, kategori: $kategori, lokasi: $lokasi, deskripsi: $deskripsi) {
      id
      judul
      deskripsi
      tanggal
      status
      userId
    }
  }
`;

export default function FormPengaduan() {
  const [tambahPengaduan] = useMutation(TAMBAH_PENGADUAN, {
    refetchQueries: [{ query: GET_PENGADUAN_LIST }],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Validasi file (maks 5MB)
    if (data.lampiran && data.lampiran.length > 0) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      for (let i = 0; i < data.lampiran.length; i++) {
        if (data.lampiran[i].size > maxSize) {
          setError('lampiran', { message: 'Ukuran lampiran tidak boleh lebih dari 5MB' });
          setIsSubmitting(false);
          return;
        }
      }
    }

    const sanitizedData = {
      judul: sanitizeInput(data.judul),
      kategori: sanitizeInput(data.kategori),
      lokasi: sanitizeInput(data.lokasi),
      deskripsi: sanitizeInput(data.deskripsi),
    };

    try {
      await tambahPengaduan({ variables: sanitizedData });
      setSubmitSuccess(true);
      reset(); // reset form jika berhasil
    } catch (error) {
      console.error('Gagal mengirim pengaduan:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="mt-4 text-xl font-bold text-gray-800">Pengaduan Berhasil Dikirim!</h2>
          <p className="mt-2 text-gray-600">Terima kasih telah menyampaikan pengaduan. Kami akan segera menindaklanjuti.</p>
          <Button className="mt-6" onClick={() => setSubmitSuccess(false)}>
            Buat Pengaduan Baru
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Formulir Pengaduan</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Judul */}
        <div>
          <label htmlFor="judul" className="block text-sm font-medium text-gray-700 mb-1">
            Judul Pengaduan <span className="text-red-500">*</span>
          </label>
          <input
            id="judul"
            type="text"
            {...register('judul', { required: 'Judul pengaduan wajib diisi' })}
            className={`w-full px-4 py-2 border rounded-lg ${errors.judul ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-blue-300`}
          />
          {errors.judul && <p className="mt-1 text-sm text-red-600">{errors.judul.message}</p>}
        </div>

        {/* Kategori */}
        <div>
          <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 mb-1">
            Kategori <span className="text-red-500">*</span>
          </label>
          <select id="kategori" {...register('kategori', { required: 'Kategori wajib dipilih' })} className={`w-full px-4 py-2 border rounded-lg ${errors.kategori ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-blue-300`}>
            <option value="">Pilih Kategori</option>
            <option value="infrastruktur">Infrastruktur</option>
            <option value="pelayanan">Pelayanan Publik</option>
            <option value="lingkungan">Lingkungan</option>
            <option value="lainnya">Lainnya</option>
          </select>
          {errors.kategori && <p className="mt-1 text-sm text-red-600">{errors.kategori.message}</p>}
        </div>

        {/* Lokasi */}
        <div>
          <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700 mb-1">
            Lokasi Kejadian <span className="text-red-500">*</span>
          </label>
          <input
            id="lokasi"
            type="text"
            {...register('lokasi', { required: 'Lokasi kejadian wajib diisi' })}
            className={`w-full px-4 py-2 border rounded-lg ${errors.lokasi ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-blue-300`}
          />
          {errors.lokasi && <p className="mt-1 text-sm text-red-600">{errors.lokasi.message}</p>}
        </div>

        {/* Deskripsi */}
        <div>
          <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi Lengkap <span className="text-red-500">*</span>
          </label>
          <textarea
            id="deskripsi"
            rows={5}
            {...register('deskripsi', {
              required: 'Deskripsi wajib diisi',
              minLength: { value: 20, message: 'Deskripsi minimal 20 karakter' },
            })}
            className={`w-full px-4 py-2 border rounded-lg ${errors.deskripsi ? 'border-red-500' : 'border-gray-300'} focus:ring focus:ring-blue-300`}
          />
          {errors.deskripsi && <p className="mt-1 text-sm text-red-600">{errors.deskripsi.message}</p>}
        </div>

        {/* Lampiran */}
        <div>
          <label htmlFor="lampiran" className="block text-sm font-medium text-gray-700 mb-1">
            Lampiran (Opsional)
          </label>
          <input id="lampiran" type="file" {...register('lampiran')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300" multiple />
          <p className="mt-1 text-sm text-gray-500">Unggah foto atau dokumen pendukung (maks. 5MB)</p>
          {errors.lampiran && <p className="text-sm text-red-600">{errors.lampiran.message}</p>}
        </div>

        <div className="pt-4">
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Mengirim...' : 'Kirim Pengaduan'}
          </Button>
        </div>
      </form>
    </div>
  );
}
