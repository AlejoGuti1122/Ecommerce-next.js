"use server"

import axios from "axios"

import { IFormInput } from "../features/register/components/Register/index"
import { ILoginInput } from "@/features/login/components/Login"
import { Iuser } from "@/interfaces"

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

// // Interceptor para agregar el token a las solicitudes
// axiosApiBack.interceptors.request.use((config) => {
//   const token = Cookies.get("authToken")
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

export const postLogin = async (
  data: ILoginInput
): Promise<{ token: string; user: Iuser }> => {
  try {
    console.log("data , process.env.EXPRESS_API", data, process.env.EXPRESS_API) // Depuración
    const res = await axiosApiBack.post("/users/login", data)

    console.log("Respuesta completa del servidor:", res.data) // Depuración

    const token = res.data?.token
    const user: Iuser = res.data?.user

    if (token && user) {
      const filteredUser: Iuser = {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        role: user.role,
        orders: user.orders,
      }

      localStorage.setItem("authToken", token)
      localStorage.setItem("user", JSON.stringify(filteredUser))
      return { token, user: filteredUser }
    } else {
      throw new Error(
        "La respuesta del servidor no contiene el token o los datos del usuario."
      )
    }
  } catch (e) {
    console.error("Error en postLogin:", e)
    throw e
  }
}
