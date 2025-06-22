import { useEffect, useState } from 'react';
import { Edit2, Trash2, PlusCircle, Loader2, CheckCircle, XCircle } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
    setIsSubmitting(true);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Isi form untuk edit
  const handleEdit = (user: User) => {
    setForm({ ...user, password: '' });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <span>Manajemen Akun Petugas</span>
      </h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input name="name" placeholder="Nama Petugas" value={form.name || ''} onChange={handleInputChange} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="email@example.com"
              value={form.email || ''}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select name="role" value={form.role || ''} onChange={handleInputChange} required className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Pilih Role</option>
              <option value="petugas">Petugas</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder={isEditing ? '(Kosongkan jika tidak diubah)' : 'Password'}
              value={form.password || ''}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required={!isEditing}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setForm({});
                setIsEditing(false);
              }}
              className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              <XCircle className="w-5 h-5" />
              Batal
            </button>
          )}
          <button type="submit" disabled={isSubmitting} className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400">
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isEditing ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Update Petugas
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5" />
                Tambah Petugas
              </>
            )}
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peran</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      Tidak ada data petugas
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">{user.role}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleEdit(user)} className="text-blue-600 hover:text-blue-900 flex items-center gap-1 p-1 rounded hover:bg-blue-50">
                            <Edit2 className="w-4 h-4" />
                            <span className="sr-only md:not-sr-only">Edit</span>
                          </button>
                          <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900 flex items-center gap-1 p-1 rounded hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                            <span className="sr-only md:not-sr-only">Hapus</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
