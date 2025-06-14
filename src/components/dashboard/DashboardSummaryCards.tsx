const summaryData = [
  { label: 'Total Laporan', value: 128, color: 'bg-blue-500' },
  { label: 'Dalam Proses', value: 42, color: 'bg-yellow-500' },
  { label: 'Selesai', value: 76, color: 'bg-green-500' },
  { label: 'Pengguna Aktif', value: 312, color: 'bg-indigo-500' },
];

const DashboardSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryData.map((item) => (
        <div key={item.label} className={`p-4 rounded-lg shadow-md ${item.color} text-white`}>
          <h3 className="text-sm font-medium">{item.label}</h3>
          <p className="text-2xl font-bold">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummaryCards;
