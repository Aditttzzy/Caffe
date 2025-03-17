
export interface CoffeeProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface CartItem {
  product: CoffeeProduct;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total_price: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  payment_id?: string;
  created_at: string;
  shipping_address?: {
    name: string;
    address: string;
    city: string;
    postal_code: string;
    phone: string;
    email: string;
  };
}

export interface CheckoutFormData {
  name: string;
  email: string;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
}
