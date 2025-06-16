export interface Product {
  id: number;
  name: string;
  price: number;
  img_link: string;
  shop_link: string;
  created_at: string;
  ingredients: string[]; 
  features: string[];  
  category_id: number; 
  category_name?: string;  
}

export type NewProduct = Omit<Product, 'id' | 'created_at'>;

export type UpdateProduct = Partial<Omit<Product, 'id' | 'created_at'>> & {
  id: number;
};

export interface LatestProductView {
  id: number;
  product_name: string;
  price: number;
  created_at_formatted: string; // contoh: '01 May 2025'
  category_name: string | null;
  feature_list: string; // contoh: 'Alcohol-free, Fragrance-free'
}