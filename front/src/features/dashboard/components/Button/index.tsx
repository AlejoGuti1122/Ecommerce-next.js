import { logout } from "@/services/auth"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    logout() // Elimina la cookie
    router.push("/login") // Redirige al login
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
    >
      Cerrar Sesión
    </button>
  )
}
