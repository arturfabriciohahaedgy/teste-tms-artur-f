export interface Driver {
  id: number;
  name: string;
  cpf: string;
  cnh_number: string;
  cnh_category: string;
  phone: string | null;
  created_at: Date;
  edited_at: Date;
  is_active: boolean;
}

export interface DriverPost {
  name: string;
  cpf: string;
  cnh_number: string;
  cnh_category: string;
  phone: string | null;
}
