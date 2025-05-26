"use client"
import { useState, useEffect } from "react"
import { IProduct } from "@/interfaces"
import { searchProducts } from "@/services/productService" // ajusta la ruta según tu estructura

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<IProduct[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Función para realizar la búsqueda
  const performSearch = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    setIsSearching(true)
    try {
      const results = await searchProducts(term)
      setSearchResults(results)
      setShowResults(true)
    } catch (error) {
      console.error("Error en búsqueda:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Efecto para búsqueda en tiempo real (con debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchTerm)
    }, 300) // Espera 300ms después de que el usuario deje de escribir

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  // Función para limpiar la búsqueda
  const clearSearch = () => {
    setSearchTerm("")
    setSearchResults([])
    setShowResults(false)
  }

  // Función para ocultar resultados
  const hideResults = () => {
    setShowResults(false)
  }

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    showResults,
    clearSearch,
    hideResults,
    performSearch,
  }
}
