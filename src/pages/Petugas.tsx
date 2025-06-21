import { useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  password?: string;
};

export default function PetugasPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [form, setForm] = useState<Partial<User>>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // ✅ GET all petugas dari MongoDB
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users');
      const data = await res.json();

      const formatted = data
        .filter((u: any) => u.role === 'petugas')
        .map((u: any) => ({
          id: u._id,
          name: u.name,
          email: u.email,
          role: u.role,
        }));

      setUsers(formatted);
    } catch (err) {
      console.error('Gagal memuat user:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Update field form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ Tambah / Update petugas
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!form.name || !form.email || !form.role || (!isEditing && !form.password)) {
        alert('Semua field wajib diisi');
        return;
      }

      if (isEditing && form.id) {
        const updateData = {
          name: form.name,
          email: form.email,
          role: form.role,
          ...(form.password ? { password: form.password } : {}),
        };

        await fetch(`http://localhost:5000/api/users/${form.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        });
      } else {
        await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }

      setForm({});
      setIsEditing(false);
      fetchUsers();
    } catch (err) {
      console.error('Gagal menyimpan user:', err);
    }
  };

  // ✅ Isi form untuk edit
  const handleEdit = (user: User) => {
    setForm({ ...user, password: '' });
    setIsEditing(true);
  };

  // ✅ Hapus petugas
  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus user ini?')) {
      try {
        await fetch(`http://localhost:5000/api/users/${id}`, {
          method: 'DELETE',
        });
        fetchUsers();
      } catch (err) {
        console.error('Gagal menghapus user:', err);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manajemen Akun Petugas</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-gray-100 p-4 rounded-md">
        <input name="name" placeholder="Nama" value={form.name || ''} onChange={handleInputChange} required className="w-full p-2 border rounded" />
        <input name="email" placeholder="Email" value={form.email || ''} onChange={handleInputChange} required className="w-full p-2 border rounded" />
        <select name="role" value={form.role || ''} onChange={handleInputChange} required className="w-full p-2 border rounded">
          <option value="">Pilih Role</option>
          <option value="petugas">Petugas</option>
        </select>
        <input name="password" type="password" placeholder={isEditing ? '(Kosongkan jika tidak diubah)' : 'Password'} value={form.password || ''} onChange={handleInputChange} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {isEditing ? 'Update Petugas' : 'Tambah Petugas'}
        </button>
      </form>

      {loading ? (
        <p>Memuat data pengguna...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-md overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4">Nama</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Peran</th>
              <th className="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 capitalize">{user.role}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
