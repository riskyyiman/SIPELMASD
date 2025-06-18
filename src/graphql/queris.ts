// src/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_PENGADUAN_LIST = gql`
  query GetPengaduanList {
    daftarPengaduan {
      id
      judul
      deskripsi
      tanggal
      status
      kategori # ✅ Tambahkan ini
      userId
    }
  }
`;

export const GET_PENGADUAN_DETAIL = gql`
  query GetPengaduanDetail($id: ID!) {
    pengaduanById(id: $id) {
      id
      judul
      deskripsi
      kategori
      lokasi
      status
      tanggal
      userId
    }
  }
`;
