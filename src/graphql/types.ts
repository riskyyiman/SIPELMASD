// src/graphql/types.ts
export type Comment = {
  id: string;
  isi: string;
  createdAt: string;
  penulis: {
    id: string;
    nama: string;
    role: string;
  };
};

export type AddCommentVariables = {
  pengaduanId: string;
  isi: string;
};

export type AddCommentResponse = {
  addComment: Comment;
};
