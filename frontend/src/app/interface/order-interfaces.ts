export interface Order {
  id: number;
  order_number: string;
  driver_id: number;
  origin_address: string;
  destination_address: string;
  cargo_description: string;
  weight_kg: number | null;
  // TODO: ver se troca isso par'um enumm ou um 'pending' | [..] depois
  status: string;
  scheduled_date: Date;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface OrderPost {
  order_number: string;
  driver_id: number;
  origin_address: string;
  destination_address: string;
  cargo_description: string;
  weight_kg: number | null;
  status: string;
  scheduled_date: string;
  notes: string | null;
}
