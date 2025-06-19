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
export const DELETE_PENGADUAN = gql`
  mutation DeletePengaduan($id: ID!) {
    hapusPengaduan(id: $id)
  }
`;

export const UPDATE_PENGADUAN_STATUS = gql`
  mutation UpdateStatus($id: ID!, $judul: String!, $kategori: String!, $lokasi: String, $deskripsi: String!, $status: String!) {
    updatePengaduan(id: $id, judul: $judul, kategori: $kategori, lokasi: $lokasi, deskripsi: $deskripsi, status: $status) {
      id
      status
    }
  }
`;

// graphql/queris.ts
export const TAMBAH_PENGADUAN = gql`
  mutation TambahPengaduan($judul: String!, $kategori: String!, $status: String!, $tanggal: String!) {
    tambahPengaduan(judul: $judul, kategori: $kategori, status: $status, tanggal: $tanggal) {
      id
    }
  }
`;

export const GET_PENGADUAN_BY_ID = gql`
  query GetPengaduanById($id: ID!) {
    pengaduanById(id: $id) {
      id
      judul
      kategori
      lokasi
      deskripsi
      status
      tanggal
    }
  }
`;

export const UPDATE_PENGADUAN = gql`
  mutation UpdatePengaduan($id: ID!, $judul: String!, $kategori: String!, $lokasi: String, $deskripsi: String!, $status: String!) {
    updatePengaduan(id: $id, judul: $judul, kategori: $kategori, lokasi: $lokasi, deskripsi: $deskripsi, status: $status) {
      id
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
