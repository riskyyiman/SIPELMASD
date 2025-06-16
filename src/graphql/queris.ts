// src/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_PENGADUAN_LIST = gql`
  query GetPengaduanList($page: Int!, $perPage: Int!, $search: String, $filter: String) {
    pengaduanList(page: $page, perPage: $perPage, search: $search, filter: $filter) {
      items {
        id
        judul
        kategori
        status
        createdAt
      }
      total
    }
  }
`;

export const GET_PENGADUAN_DETAIL = gql`
  query GetPengaduanDetail($id: ID!) {
    pengaduan(id: $id) {
      id
      judul
      deskripsi
      kategori
      lokasi
      status
      lampiran
      createdAt
      updatedAt
      pelapor {
        id
        nama
      }
      komentar {
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
  }
`;
