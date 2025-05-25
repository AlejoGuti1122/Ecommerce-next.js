"use server"

import axios from "axios"

// Crear una instancia de Axios con la base URL de la API backend
const axiosApiBack = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXPRESS_API, // URL base de la API desde variables de entorno
})

// DTO (Data Transfer Object) para crear una orden
export interface DtoOrder {
  userId: number // ID del usuario que crea la orden
  products: number[] // Array con IDs de productos incluidos en la orden
}

/**
 * Función para crear una nueva orden en la API.
 * @param data - Objeto con userId y productos (IDs)
 * @param token - Token JWT para autorización en la petición
 * @returns Datos de la orden creada (res.data)
 * @throws Error con mensaje "ERROR_POST_ORDER" si falla la petición
 */
export const postOrder = async (data: DtoOrder, token: string) => {
  try {
    const res = await axiosApiBack.post("/orders", data, {
      headers: {
        authorization: token, // token para autorización, sin "Bearer" porque el backend lo puede manejar así
      },
    })

    return res.data // retorno datos recibidos tras creación de la orden
  } catch (e: any) {
    // Logueamos el error para debugging
    console.error("Ocurrio un error al crear una orden", e?.message)
    // Lanzamos error con mensaje específico para manejo externo
    throw Error("ERROR_POST_ORDER")
  }
}

/**
 * Función para obtener todas las órdenes del usuario autenticado.
 * @param token - Token JWT para autorización en la petición
 * @returns Datos con las órdenes del usuario (res.data)
 * @throws Error con mensaje "ERROR_ORDERS" si falla la petición
 */
export const getUsersOrders = async (token: string) => {
  try {
    const res = await axiosApiBack.get("/users/orders", {
      headers: {
        Authorization: token, // token para autorización
      },
    })

    if (res) {
      return res.data // retornamos las órdenes del usuario
    }
  } catch (e) {
    // Logueamos error para debugging
    console.log("Error en la orden🥶", (e as any)?.message)
    // Lanzamos error para manejo en componente/función que llama este servicio
    throw new Error("ERROR_ORDERS")
  }
}
