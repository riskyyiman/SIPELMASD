import React from 'react';

const dummyData = [
  {
    id: 1,
    judul: 'Jalan rusak di Jalan Merdeka',
    status: 'Diproses',
    tanggal: '2025-06-01',
  },
  {
    id: 2,
    judul: 'Sampah menumpuk di TPS',
    status: 'Selesai',
    tanggal: '2025-05-28',
  },
  {
    id: 3,
    judul: 'Lampu jalan mati',
    status: 'Menunggu',
    tanggal: '2025-05-20',
  },
];

const RiwayatLaporanTable: React.FC = () => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Judul Laporan</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Tanggal</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {dummyData.map((laporan) => (
            <tr key={laporan.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 text-gray-800">{laporan.judul}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full
                    ${laporan.status === 'Selesai' ? 'bg-green-100 text-green-800' : laporan.status === 'Diproses' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}
                >
                  {laporan.status}
                </span>
              </td>
              <td className="px-4 py-2 text-gray-600">{laporan.tanggal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiwayatLaporanTable;
