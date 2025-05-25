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
    // Petición POST para crear la orden, enviando token en headers para autorización
    const res = await axiosApiBack.post("/orders", data, {
      headers: {
        authorization: token, // El backend maneja el token tal cual, sin "Bearer"
      },
    })

    // Retornar la respuesta con los datos de la orden creada
    return res.data
  } catch (e: unknown) {
    // Para evitar usar 'any', usamos 'unknown' y luego validamos el tipo del error
    if (e instanceof Error) {
      // Si el error es instancia de Error, mostrar mensaje específico
      console.error("Ocurrio un error al crear una orden", e.message)
    } else {
      // Si no es instancia de Error, mostrar el error tal cual para debugging
      console.error("Ocurrio un error al crear una orden", e)
    }
    // Lanzamos un error con mensaje específico para manejo externo
    throw Error("ERROR_POST_ORDER")
  }
}

/**
 * Función para obtener todas las órdenes del usuario autenticado.
 * Recibe el token de autorización.
 *
 * @param token - Token JWT para autorización en la petición
 * @returns Lista de órdenes del usuario (res.data)
 * @throws Error con mensaje "ERROR_ORDERS" si la petición falla
 */
export const getUsersOrders = async (token: string) => {
  try {
    // Petición GET para obtener las órdenes, enviando token en headers
    const res = await axiosApiBack.get("/users/orders", {
      headers: {
        Authorization: token, // Token para autorización
      },
    })

    // Si la respuesta existe, retornar los datos con las órdenes
    if (res) {
      return res.data
    }
  } catch (e: unknown) {
    // Validamos el tipo del error para evitar usar 'any'
    if (e instanceof Error) {
      console.log("Error en la orden🥶", e.message)
    } else {
      console.log("Error en la orden🥶", e)
    }
    // Lanzamos un error para manejo en quien llame esta función
    throw new Error("ERROR_ORDERS")
  }
}
