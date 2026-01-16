export type StatusPesanan =
  | "Penjemputan"
  | "Dicuci"
  | "Diproses"
  | "Siap Diantar"
  | "Selesai";

export interface Order {
  id: number;
  nama: string;
  paket: string;
  total: number;
  status: StatusPesanan;
}

export const orders: Order[] = [
  {
    id: 1,
    nama: "Ani",
    paket: "Reguler",
    total: 25000,
    status: "Dicuci",
  },
  {
    id: 2,
    nama: "Budi",
    paket: "Express",
    total: 40000,
    status: "Diproses",
  },
  {
    id: 3,
    nama: "Siti",
    paket: "Reguler",
    total: 30000,
    status: "Siap Diantar",
  },
];
