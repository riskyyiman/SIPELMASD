// src/graphql/mutations.ts
import { gql } from '@apollo/client';

export const ADD_COMMENT = gql`
  mutation AddComment($pengaduanId: ID!, $isi: String!) {
    addComment(pengaduanId: $pengaduanId, isi: $isi) {
      id
      isi
      createdAt
      penulis {
        id
        nama
        role
      }
    }
  }
`;

export const UPDATE_PENGADUAN_STATUS = gql`
  mutation UpdatePengaduanStatus($id: ID!, $status: String!) {
    updatePengaduanStatus(id: $id, status: $status) {
      id
      status
      updatedAt
    }
  }
`;

export const CREATE_PENGADUAN = gql`
  mutation CreatePengaduan($judul: String!, $kategori: String!, $lokasi: String!, $deskripsi: String!, $lampiran: [Upload]) {
    createPengaduan(judul: $judul, kategori: $kategori, lokasi: $lokasi, deskripsi: $deskripsi, lampiran: $lampiran) {
      id
      judul
      status
      createdAt
    }
  }
`;
