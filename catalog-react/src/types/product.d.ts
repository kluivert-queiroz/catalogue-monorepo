export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
}

export interface CartItem {
  quantity: number;
  product: Product;
}
