// src/pages/Pengaduan/DaftarPengaduan.tsx
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PENGADUAN_LIST } from '../../graphql/queris';
import Pagination from '../../components/ui/pagination/Pagination';
import SearchInput from '../../components/ui/searchinput/SearchInput';
import FilterDropdown from '../../components/ui/filterdropdown/FilterDropdown';
import { formatDate } from '../../utils/format';

type Pengaduan = {
  id: string;
  judul: string;
  kategori: string;
  status: 'diterima' | 'diproses' | 'selesai';
  createdAt: string;
};

export default function DaftarPengaduan() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [perPage, setPerPage] = useState(10);

  const { loading, error, data } = useQuery(GET_PENGADUAN_LIST, {
    variables: { page, perPage, search, filter },
    fetchPolicy: 'cache-and-network',
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1); // Reset ke halaman pertama saat melakukan pencarian
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
    setPage(1); // Reset ke halaman pertama saat mengubah filter
  };

  if (loading) return <div className="text-center py-8">Memuat data...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Laporan Pengaduan</h1>

        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <SearchInput placeholder="Cari laporan..." onSearch={handleSearch} className="w-full md:w-64" />

          <div className="flex flex-col sm:flex-row gap-3">
            <FilterDropdown
              options={[
                { value: '', label: 'Semua Status' },
                { value: 'diterima', label: 'Diterima' },
                { value: 'diproses', label: 'Diproses' },
                { value: 'selesai', label: 'Selesai' },
              ]}
              value={filter}
              onChange={handleFilterChange}
            />

            <FilterDropdown
              options={[
                { value: '10', label: '10 per halaman' },
                { value: '25', label: '25 per halaman' },
                { value: '50', label: '50 per halaman' },
              ]}
              value={perPage.toString()}
              onChange={(value) => setPerPage(Number(value))}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.pengaduanList?.items?.map((item: Pengaduan) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{item.judul}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">{item.kategori}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'diterima' ? 'bg-yellow-100 text-yellow-800' : item.status === 'diproses' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(item.createdAt)}</td>
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

      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <Pagination currentPage={page} totalPages={Math.ceil(data?.pengaduanList?.total / perPage) || 1} onPageChange={setPage} />
        <div className="text-sm text-gray-500">
          Menampilkan {(page - 1) * perPage + 1} - {Math.min(page * perPage, data?.pengaduanList?.total)} dari {data?.pengaduanList?.total} laporan
        </div>
      </div>
    </div>
  );
}
