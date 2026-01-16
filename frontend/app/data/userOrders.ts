// DATA ORDER DUMMY (SEMENTARA)
export type OrderStatus =
  | "Pesanan"
  | "Diterima"
  | "Dicuci"
  | "Diproses"
  | "Siap Antar"
  | "Selesai";

export interface UserOrder {
  id: number;
  nama: string;
  paket: string;
  berat: number;
  catatan?: string;
  status: OrderStatus;
}

export const userOrders: UserOrder[] = [];