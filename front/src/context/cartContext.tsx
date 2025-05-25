"use client"

import React, { createContext, useState, useEffect, useContext } from "react"
import { IProduct } from "@/interfaces"

// Definimos la forma del contexto del carrito
interface CartContextType {
  cart: IProduct[] // Array con los productos en el carrito
  total: number // Total de productos (puede ser cantidad o ítems)

  checkoutLoader?: boolean // Estado para mostrar un loader al hacer checkout (opcional)

  addProductToCart: (product: IProduct) => void // Función para agregar un producto
  removeProductFromCart: (productId: number) => void // Función para eliminar producto por id
  toggleLoaderCheckout: () => void // Función para activar/desactivar loader del checkout
  resetCart: () => void // Función para vaciar el carrito
}

// Creamos el contexto con valor inicial undefined para forzar su uso en proveedor
const CartContext = createContext<CartContextType | undefined>(undefined)

// Componente proveedor que envuelve la app y maneja el estado del carrito
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Estado con los productos actuales del carrito
  const [cart, setCart] = useState<IProduct[]>([])

  // Estado con el total de productos en el carrito
  const [total, setTotal] = useState<number>(0)

  // Estado para mostrar loader al hacer checkout
  const [checkoutLoader, setCheckoutLoader] = useState<boolean | undefined>()

  // Estado para controlar si el carrito está cargando (p. ej. restaurando datos)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  /**
   * useEffect para restaurar el carrito y total guardados en localStorage
   * Solo corre al montar el componente
   */
  useEffect(() => {
    const storedCart = localStorage.getItem("cart") // Obtenemos el carrito guardado
    const storedTotal = localStorage.getItem("total") // Obtenemos el total guardado

    if (storedCart) {
      setCart(JSON.parse(storedCart)) // Restauramos el carrito si existe
    }
    if (storedTotal) {
      setTotal(Number(storedTotal)) // Restauramos total si existe
    }

    setIsLoading(false) // Ya cargamos el estado inicial
  }, [])

  /**
   * useEffect para guardar en localStorage cada vez que cambian
   * los estados de carrito o total, para persistir la info
   */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
    localStorage.setItem("total", total.toString())
  }, [cart, total])

  /**
   * Función para agregar un producto al carrito
   * Actualiza el estado del carrito y suma 1 al total
   */
  const addProductToCart = (product: IProduct) => {
    setCart((prevCart) => [...prevCart, product]) // Agregamos producto nuevo
    setTotal((prevTotal) => prevTotal + 1) // Incrementamos total
  }

  /**
   * Función para activar o desactivar el loader durante el proceso de checkout
   */
  const toggleLoaderCheckout = () => {
    setCheckoutLoader((state) => !state) // Cambia el estado actual del loader
  }

  /**
   * Función para vaciar el carrito
   * Se ejecuta con un delay de 3 segundos (ejemplo para esperar alguna acción)
   */
  const resetCart = () => {
    setTimeout(() => {
      setCart([]) // Vacía el carrito
      setTotal(0) // Resetea el total a 0
    }, 3000)
  }

  /**
   * Función para remover un producto del carrito por su id
   * Filtra el carrito para eliminar el producto y decrementa el total, evitando que sea negativo
   */
  const removeProductFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== productId))
    setTotal((prevTotal) => Math.max(prevTotal - 1, 0)) // Evita total negativo
  }

  // Retornamos el proveedor con el estado y funciones que queremos compartir
  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        checkoutLoader,
        toggleLoaderCheckout,
        addProductToCart,
        removeProductFromCart,
        resetCart,
      }}
    >
      {/* Mientras carga, muestra un mensaje; luego renderiza los hijos */}
      {isLoading ? <div>Cargando carrito...</div> : children}
    </CartContext.Provider>
  )
}

/**
 * Hook personalizado para consumir el contexto del carrito
 * Arroja error si se usa fuera del proveedor
 */
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider")
  }
  return context
}
