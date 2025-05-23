import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

//Esto es para que puedan ver ciertas paginas los logueados
const usePrivate = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])
  return null
}

export default usePrivate
