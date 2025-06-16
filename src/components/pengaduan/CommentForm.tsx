// src/components/Pengaduan/CommentForm.tsx
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../graphql/mutations';
import Button from '../ui/button/Button';

type CommentFormProps = {
  pengaduanId: string;
};

export default function CommentForm({ pengaduanId }: CommentFormProps) {
  const [comment, setComment] = useState('');
  const [addComment, { loading }] = useMutation(ADD_COMMENT, {
    refetchQueries: ['GetPengaduanDetail'],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await addComment({
        variables: {
          pengaduanId,
          isi: comment,
        },
      });
      setComment('');
    } catch (error) {
      console.error('Gagal menambahkan komentar:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label htmlFor="comment" className="sr-only">
          Tambahkan Komentar
        </label>
        <textarea
          id="comment"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Tambahkan komentar atau respon..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? 'Mengirim...' : 'Kirim Komentar'}
        </Button>
      </div>
    </form>
  );
}
