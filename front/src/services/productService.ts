import { IProduct } from "@/interfaces"
import axios from "axios"

const axiosApiBack = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXPRESS_API,
})

// Función para obtener todos los productos (ya la tienes)
export const getProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await axiosApiBack.get("/products")
    console.log("Productos obtenidos:", response.data)
    return response.data
  } catch (e) {
    console.error("Error al obtener los productos:", e)
    return []
  }
}

/**
 * Función para buscar productos por término de búsqueda
 * @param searchTerm - Término a buscar en nombre, descripción, etc.
 * @returns Array de productos que coinciden con la búsqueda
 */
export const searchProducts = async (
  searchTerm: string
): Promise<IProduct[]> => {
  try {
    // Opción 1: Si tu backend ya tiene endpoint de búsqueda
    // const response = await axiosApiBack.get(`/products/search?q=${encodeURIComponent(searchTerm)}`)
    // return response.data

    // Opción 2: Búsqueda del lado del cliente (más rápida para tu entrega)
    const allProducts = await getProducts()

    if (!searchTerm.trim()) {
      return allProducts // Si no hay término, devolver todos
    }

    // Filtrar productos que coincidan con el término de búsqueda
    const filteredProducts = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return filteredProducts
  } catch (e) {
    console.error("Error al buscar productos:", e)
    return []
  }
}

/**
 * Función para buscar productos por categoría específica
 * @param categoryId - ID de categoría a filtrar
 * @returns Array de productos de esa categoría
 */
export const getProductsByCategory = async (
  categoryId: number
): Promise<IProduct[]> => {
  try {
    const allProducts = await getProducts()

    const filteredProducts = allProducts.filter(
      (product) => product.categoryId === categoryId
    )

    return filteredProducts
  } catch (e) {
    console.error("Error al obtener productos por categoría:", e)
    return []
  }
}
