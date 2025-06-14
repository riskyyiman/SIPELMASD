type Status = 'Baru' | 'Diproses' | 'Selesai';

const laporanTerbaru: { id: number; nama: string; judul: string; status: Status }[] = [
  { id: 1, nama: 'Andi', judul: 'Jalan rusak', status: 'Baru' },
  { id: 2, nama: 'Siti', judul: 'Sampah menumpuk', status: 'Diproses' },
  { id: 3, nama: 'Budi', judul: 'Lampu mati', status: 'Selesai' },
];

const statusColor: Record<Status, string> = {
  Baru: 'text-blue-500',
  Diproses: 'text-yellow-500',
  Selesai: 'text-green-500',
};

const LaporanTerbaru = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Laporan Terbaru</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>Pelapor</th>
            <th>Judul</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {laporanTerbaru.map((laporan) => (
            <tr key={laporan.id} className="border-b">
              <td>{laporan.nama}</td>
              <td>{laporan.judul}</td>
              <td className={statusColor[laporan.status]}>{laporan.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LaporanTerbaru;
