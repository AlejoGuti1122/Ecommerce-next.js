"use client"

import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

//esto es para que usuarios logueados no entren a otras paginas
const usePublic = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])
  return null
}

export default usePublic
