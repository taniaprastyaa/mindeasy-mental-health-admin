import { z } from "zod";
import { useProductStore } from "@/stores/productStore";
import type { UpdateProduct } from "@/types";

const updateProductSchema = z.object({
  id: z.number().int({ message: "ID Produk harus integer" }),
  name: z.string().min(2, { message: "Nama produk minimal 2 karakter" }).trim(),
  price: z.number().min(1, { message: "Harga minimal adalah 1" }),
  img_link: z.string().url({ message: "Link gambar harus berupa URL yang valid" }),
  shop_link: z.string().url({ message: "Link toko harus berupa URL yang valid" }),
  ingredients: z.array(z.string()).min(1, { message: "Minimal satu bahan harus diisi" }),
  features: z.array(z.string()).min(1, { message: "Minimal satu fitur harus diisi" }),
  category_id: z.number().int({ message: "Kategori harus berupa angka bulat" }),
});

export async function updateProductRequest(productData: UpdateProduct) {
  const result = updateProductSchema.safeParse(productData);

  if (!result.success) {
    const errorMessage = result.error.errors
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join(", ");
    return { success: false, message: errorMessage };
  }

  try {
    await useProductStore.getState().updateProduct(result.data);
    return { success: true, message: "Produk berhasil diubah" };
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return {
        success: false,
        message: "Nama produk sudah digunakan, silakan pilih nama lain",
      };
    }

    return {
      success: false,
      message: error instanceof Error
        ? `Terjadi kesalahan: ${error.message}`
        : "Terjadi kesalahan saat mengubah produk",
    };
  }
}
