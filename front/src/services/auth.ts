import axios from "axios"
import Cookies from "js-cookie"
import { IFormInput } from "../features/register/components/Register/index"
import { ILoginInput } from "@/features/login/components/Login"

const axiosApiBack = axios.create({
  baseURL: process.env.EXPRESS_API,
})

export const postRegister = async (data: IFormInput) => {
  try {
    const res = await axiosApiBack.post("/register", data)
    // if(!res.data) {
    //     return
    // }

    return res.data
  } catch (e) {
    console.error("Ocurrio un error al registrar el susuario", e)
  }
}

// Interceptor para agregar el token a las solicitudes
axiosApiBack.interceptors.request.use((config) => {
  const token = Cookies.get("authToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const postLogin = async (data: ILoginInput) => {
  try {
    const res = await axiosApiBack.post("/login", data)

    // Verifica si el backend devuelve un token
    const token = res.data.token
    if (token) {
      // Guarda el token en una cookie
      Cookies.set("authToken", token, { expires: 7 }) // Expira en 7 días
    }

    return res.data
  } catch (e) {
    console.error("Ocurrió un error en el login", e)
    throw e // Lanza el error para que el componente lo maneje
  }
}

// Verificar si el usuario está autenticado
export const isAuthenticated = (): boolean => {
  const token = Cookies.get("authToken")
  return !!token // Devuelve true si el token existe
}

// Cerrar sesión
export const logout = () => {
  Cookies.remove("authToken")
  console.log("Sesión cerrada.")
}
