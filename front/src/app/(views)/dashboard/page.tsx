import UserDashboard from "@/features/dashboard/components/Dashboard"
import { cookies } from "next/headers" // Para obtener cookies en el servidor
import { Iuser } from "@/interfaces"

async function fetchUserData(token: string): Promise<Iuser | null> {
  try {
    const res = await fetch(`${process.env.EXPRESS_API}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // Evita el almacenamiento en caché
    })

    if (!res.ok) {
      throw new Error("Error al obtener los datos del usuario")
    }

    return res.json()
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error)
    return null
  }
}

export default async function DashboardPage() {
  try {
    const cookieStore = await cookies() // Obtén las cookies
    console.log("Cookies disponibles en el servidor:", cookieStore) // Inspecciona las cookies

    const token = cookieStore.get("authToken")?.value

    if (!token) {
      console.error("No se encontró la cookie 'authToken'.")
      return (
        <div>
          <p>No autorizado. Redirigiendo al login...</p>
        </div>
      )
    }

    const user = await fetchUserData(token)

    if (!user) {
      return (
        <div>
          <p>Error al cargar los datos del usuario.</p>
        </div>
      )
    }

    return <UserDashboard user={user} />
  } catch (error) {
    console.error("Error en DashboardPage:", error)
    return (
      <div>
        <p>Ocurrió un error inesperado.</p>
      </div>
    )
  }
}
