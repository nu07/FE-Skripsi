export interface Dosen {
  id: string;
  nama: string;
  nidn: string;
  email: string;
  password?: string;
  deletedAt: string | null;
  restore?: boolean;
}
