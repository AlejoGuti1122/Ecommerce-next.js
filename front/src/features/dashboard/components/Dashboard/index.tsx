"use client"

import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa"
import LogoutButton from "../Button" // Asegúrate de que este componente esté marcado con "use client"
import { useAuth } from "@/context/authContext"

export default function UserDashboard() {
  // const [user, setUser] = useState<Iuser | null>(null)
  // const [loading, setLoading] = useState(true)
  // const router = useRouter()
  const { user } = useAuth()

  // useEffect(() => {
  //   // Obtén el token desde localStorage
  //   const token = localStorage.getItem("authToken")

  //   if (!token) {
  //     console.error("No se encontró el token en localStorage")
  //     router.push("/login")
  //     return
  //   }

  //   const fetchUserData = async () => {
  //     try {
  //       const res = await fetch(`${process.env.EXPRESS_API}/user`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })

  //       if (!res.ok) {
  //         throw new Error("Error al obtener los datos del usuario")
  //       }

  //       const data = await res.json()
  //       setUser(data)
  //     } catch (error) {
  //       console.error("Error al obtener los datos del usuario:", error)
  //       router.push("/login")
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchUserData()
  // }, [router])

  // if (loading) return <p className="text-center mt-10">Cargando dashboard...</p>

  if (!user)
    return (
      <p className="text-center mt-10 text-red-500">
        No se pudo cargar el usuario.
      </p>
    )

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Bienvenido, {user.name}</h1>
        <LogoutButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaUser className="text-blue-500 text-3xl" />
          <div>
            <p className="text-gray-700 font-semibold">Nombre</p>
            <p>{user.name}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaEnvelope className="text-green-500 text-3xl" />
          <div>
            <p className="text-gray-700 font-semibold">Correo</p>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaSignOutAlt className="text-red-500 text-3xl" />
          <div>
            <p className="text-gray-700 font-semibold">Rol</p>
            <p>{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
