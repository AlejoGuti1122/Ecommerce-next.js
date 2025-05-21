"use client"

import React, { createContext, useState, useEffect, useContext } from "react"
import { IProduct } from "@/interfaces"

interface CartContextType {
  cart: IProduct[]
  total: number

  addProductToCart: (product: IProduct) => void
  removeProductFromCart: (productId: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<IProduct[]>([])
  const [total, setTotal] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    const storedTotal = localStorage.getItem("total")

    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
    if (storedTotal) {
      setTotal(Number(storedTotal))
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
    localStorage.setItem("total", total.toString())
  }, [cart, total])

  const addProductToCart = (product: IProduct) => {
    setCart((prevCart) => [...prevCart, product])
    setTotal((prevTotal) => prevTotal + 1)
  }

  const removeProductFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== productId))
    setTotal((prevTotal) => Math.max(prevTotal - 1, 0))
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        total,

        addProductToCart,
        removeProductFromCart,
      }}
    >
      {isLoading ? <div>Cargando carrito...</div> : children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider")
  }
  return context
}
