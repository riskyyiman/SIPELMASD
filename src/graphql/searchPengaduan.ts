// src/graphql/searchPengaduan.ts
import { gql } from '@apollo/client';

export const SEARCH_PENGADUAN = gql`
  query SearchPengaduan($filter: LaporanFilterInput) {
    pengaduan(filter: $filter) {
      id
      judul
      deskripsi
      status
      kategori
      lokasi
      tanggal
    }
  }
`;
