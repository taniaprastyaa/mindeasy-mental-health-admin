import { z } from "zod";
import { useProductStore } from "@/stores/productStore";

const idSchema = z.number().int({ message: "ID product tidak valid" });

export async function deleteProductRequest(productId: number) {
  const result = idSchema.safeParse(productId);

  if (!result.success) {
    return { success: false, message: result.error.errors[0].message };
  }

  try {
    await useProductStore.getState().deleteProduct(result.data);
    return { success: true, message: "Produk berhasil dihapus" };
  } catch (error) {
    if (error instanceof Error && error.message === "PRODUCT_USED_IN_EXPENSES") {
      return {
        success: false,
        message: "Produk tidak dapat dihapus karena sudah digunakan dalam produksi",
      };
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus produk",
    };
  }
}
