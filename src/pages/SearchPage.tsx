import { useQuery } from '@apollo/client';
import { SEARCH_PENGADUAN } from '../graphql/searchPengaduan';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useQueryParam(param: string) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  return params.get(param);
}

const STATUS_OPTIONS = ['', 'diterima', 'diproses', 'selesai'];
const KATEGORI_OPTIONS = ['', 'infrastruktur', 'pelayanan publik', 'lingkungan', 'lainnya'];

export default function SearchPage() {
  const keywordFromURL = useQueryParam('keyword') || '';
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    keyword: keywordFromURL,
    status: '',
    kategori: '',
    lokasi: '',
  });

  const { data, loading, error, refetch } = useQuery(SEARCH_PENGADUAN, {
    variables: { filter },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const newFilter = { ...filter, keyword: keywordFromURL };
    setFilter(newFilter);
    refetch({ filter: newFilter });
  }, [keywordFromURL]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilter = { ...filter, [name]: value };

    if (name === 'keyword') {
      navigate(`?keyword=${encodeURIComponent(value)}`);
    }

    setFilter(newFilter);
    refetch({ filter: newFilter });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Hasil Pencarian Pengaduan</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input name="keyword" placeholder="Cari judul/deskripsi" value={filter.keyword} onChange={handleInputChange} className="p-2 border rounded" />

        <select name="status" value={filter.status} onChange={handleInputChange} className="p-2 border rounded">
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt === '' ? 'Semua Status' : opt}
            </option>
          ))}
        </select>

        <select name="kategori" value={filter.kategori} onChange={handleInputChange} className="p-2 border rounded">
          {KATEGORI_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt === '' ? 'Semua Kategori' : opt}
            </option>
          ))}
        </select>

        <input name="lokasi" placeholder="Lokasi" value={filter.lokasi} onChange={handleInputChange} className="p-2 border rounded" />
      </div>

      {loading && <p>Memuat...</p>}
      {error && <p className="text-red-500">Gagal memuat data: {error.message}</p>}

      {data?.pengaduan?.length > 0 ? (
        <ul className="space-y-3">
          {data.pengaduan.map((item: any) => (
            <li key={item.id} className="p-4 border rounded shadow">
              <h2 className="text-lg font-bold">{item.judul}</h2>
              <p className="text-sm text-gray-500">{new Date(item.tanggal).toLocaleString()}</p>
              <p className="text-sm">
                <strong>Status:</strong> {item.status} | <strong>Kategori:</strong> {item.kategori} | <strong>Lokasi:</strong> {item.lokasi}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p className="text-gray-600">Tidak ada data ditemukan.</p>
      )}
    </div>
  );
}
