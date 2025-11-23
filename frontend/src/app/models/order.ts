import { CartItem } from './cart-item';

// Backend API Order shape
export interface Order {
  id?: number;
  user_id: string;
  status: 'active' | 'complete';
}

// Frontend checkout form shape
export interface CheckoutForm {
  firstName: string;
  lastName: string;
  address: string;
  creditCard: string;
  items: CartItem[];
  total: number;
}
