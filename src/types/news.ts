export interface NewsData {
  id: string;
  id_admin: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  admin: Admin;
}

export interface Admin {
  id: string;
  email: string;
  password: string;
  nama: string;
  deletedAt: any;
}
