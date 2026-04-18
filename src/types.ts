export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'shipping' | 'delivered' | 'cancelled';
  total: number;
  items: { productId: string; quantity: number }[];
  customerInfo?: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  trackingNumber?: string;
  trackingStatus?: string;
}

export type UserRole = 'admin' | 'viewer';

export type View = 'welcome' | 'home' | 'categories' | 'cart' | 'favorites' | 'orders' | 'profile' | 'edit-profile' | 'product-detail' | 'payment' | 'contact' | 'admin-dashboard' | 'admin-orders' | 'request-engineer';

export interface CartItem {
  product: Product;
  quantity: number;
}
