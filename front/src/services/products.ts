import { IProduct } from "@/interfaces"
import axios from "axios"

const axiosApiBack = axios.create({
  baseURL: process.env.EXPRESS_API,
})

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
