
export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  retailPrice?: number;
  isNew?: boolean;
  rentalPeriod: string;
}

export interface DeliveryAddress {
  id: string;
  user_id: string;
  street_address: string;
  apartment?: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}
