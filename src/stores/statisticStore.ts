import { create } from "zustand";
import { supabaseClient } from "@/utils/supabase";

const supabase = supabaseClient;

interface LatestProduct {
  id: number;
  product_name: string;
  price: number;
  created_at_formatted: string;
  category_name: string;
  feature_list: string;
}

interface StatisticState {
  totalCategory: number;
  totalProduct: number;
  totalProductThisMonth: number;
  totalIngredients: number;
  latestProducts: LatestProduct[];
  loading: boolean;
  fetchStatistics: () => Promise<void>;
  fetchLatestProducts: () => Promise<void>;
}

export const useStatisticStore = create<StatisticState>((set) => ({
  totalCategory: 0,
  totalProduct: 0,
  totalProductThisMonth: 0,
  totalIngredients: 0,
  latestProducts: [],
  loading: false,

  fetchStatistics: async () => {
    set({ loading: true });

    const [
      { data: categoryData, error: categoryError },
      { data: productData, error: productError },
      { data: newProductData, error: newProductError },
      { data: ingredientsData, error: ingredientsError },
    ] = await Promise.all([
      supabase.rpc("get_total_category"),
      supabase.rpc("get_total_product"),
      supabase.rpc("get_new_product_this_month"),
      supabase.rpc("get_total_unique_ingredients"),
    ]);

    set({ loading: false });

    if (categoryError || productError || newProductError || ingredientsError) {
      console.error("Statistik Error:", {
        categoryError,
        productError,
        newProductError,
        ingredientsError,
      });
      throw new Error("Gagal mengambil statistik data!");
    }

    set({
      totalCategory: categoryData || 0,
      totalProduct: productData || 0,
      totalProductThisMonth: newProductData || 0,
      totalIngredients: ingredientsData || 0,
    });
  },

  fetchLatestProducts: async () => {
    set({ loading: true });

    const { data, error } = await supabase
      .from("view_latest_products")
      .select("*");

    set({ loading: false });

    if (error) {
      console.error("Error loading latest products:", error);
      throw new Error("Gagal mengambil data produk terbaru!");
    }

    set({ latestProducts: data || [] });
  },
}));
