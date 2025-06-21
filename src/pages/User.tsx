import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; //

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<User & { password?: string }>>({});
  const [isEditing, setIsEditing] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/users');
      const data = await res.json();
      const filtered = data.map((u: any) => ({
        id: u.uid,
        name: '-', // Firebase Auth tidak menyimpan nama, hanya email
        email: u.email,
        role: 'user', // Default atau ganti jika kamu punya mapping
      }));
      setUsers(filtered);
    } catch (err) {
      console.error('Gagal memuat user:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.name || !form.role) return;

    try {
      if (isEditing && form.id) {
        // Update ke backend MongoDB
        await fetch(`http://localhost:5000/api/users/${form.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } else {
        // 1. Buat akun di Firebase
        const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);

        // 2. Simpan ke backend
        await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firebaseUid: cred.user.uid,
            name: form.name,
            email: form.email,
            role: form.role,
          }),
        });
      }

      setForm({});
      setIsEditing(false);
      fetchUsers();
    } catch (err) {
      console.error('Gagal menyimpan user:', err);
    }
  };

  const handleEdit = (user: User) => {
    setForm({ ...user, password: '' });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus user ini?')) {
      try {
        await fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' });
        fetchUsers();
      } catch (err) {
        console.error('Gagal menghapus user:', err);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manajemen Akun User</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-gray-100 p-4 rounded-md">
        <input name="name" placeholder="Nama" value={form.name || ''} onChange={handleInputChange} required className="w-full p-2 border rounded" />
        <input name="email" placeholder="Email" value={form.email || ''} onChange={handleInputChange} required className="w-full p-2 border rounded" />
        <select name="role" value={form.role || ''} onChange={handleInputChange} required className="w-full p-2 border rounded">
          <option value="">Pilih Role</option>
          <option value="user">User</option>
        </select>
        {!isEditing && <input name="password" type="password" placeholder="Password" value={form.password || ''} onChange={handleInputChange} required className="w-full p-2 border rounded" />}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {isEditing ? 'Update User' : 'Tambah User'}
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
