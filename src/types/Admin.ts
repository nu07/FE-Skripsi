export interface Admin {
  id: string;
  nama: string;
  email: string;
  password?: string;
  deletedAt: string | null;
  restore?: boolean;
}
