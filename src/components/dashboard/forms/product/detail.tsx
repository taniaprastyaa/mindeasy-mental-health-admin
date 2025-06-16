"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProductStore } from "@/stores/productStore";

export default function ProductDetailForm() {
  const { id } = useParams();
  const {
    selectedProduct,
    getProductById,
    loading,
  } = useProductStore();

  useEffect(() => {
    if (id) {
      getProductById(Number(id));
    }
  }, [id, getProductById]);

  if (loading || !selectedProduct) {
    return <p>Memproses...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Produk</label>
          <Input value={selectedProduct.name} readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Harga</label>
          <Input value={String(selectedProduct.price)} readOnly type="number" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">URL Gambar</label>
          <Input value={selectedProduct.img_link} readOnly />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">URL Belanja</label>
          <Input value={selectedProduct.shop_link} readOnly />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ingredients</label>
        <Textarea
          value={
            Array.isArray(selectedProduct.ingredients)
              ? selectedProduct.ingredients.join(", ")
              : "-"
          }
          readOnly
          rows={5}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Yang Ada dalam Produk</label>
        <Textarea
          value={
            Array.isArray(selectedProduct.features)
              ? selectedProduct.features.join(", ")
              : "-"
          }
          readOnly
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Kategori</label>
        <Input value={selectedProduct.category_name || "-"} readOnly />
      </div>
    </div>
  );
}
