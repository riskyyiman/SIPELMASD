// src/components/Pengaduan/CommentList.tsx
import { formatDate } from '../../utils/format';

type Comment = {
  id: string;
  isi: string;
  createdAt: string;
  penulis: {
    id: string;
    nama: string;
    role: string;
  };
};

export default function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Komentar & Respon</h3>

      {comments.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Belum ada komentar</p>
      ) : (
        <div className="divide-y divide-gray-200">
          {comments.map((comment) => (
            <div key={comment.id} className="py-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">{comment.penulis.nama.charAt(0).toUpperCase()}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {comment.penulis.nama}
                      {comment.penulis.role === 'admin' && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Admin</span>}
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(comment.createdAt, { withTime: true })}</p>
                  </div>
                  <div className="mt-1 text-sm text-gray-700">
                    <p>{comment.isi}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
