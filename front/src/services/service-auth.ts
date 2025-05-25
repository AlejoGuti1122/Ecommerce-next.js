"use server"

import { ILoginInput } from "@/features/login/components/Login"
import { IRegistrationForm } from "@/features/register/components/RegisterForm"

import axios from "axios"

// Instancia de axios configurada con la base URL del backend desde .env
const axiosApiBack = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXPRESS_API,
})

// Función para hacer login con email y password (datos de tipo ILoginInput)
export const postLogin = async (data: ILoginInput) => {
  try {
    // Se hace petición POST a /users/login con los datos del formulario
    const res = await axiosApiBack.post("/users/login", data)

    // Aquí podrías guardar cookies o token si lo deseas (aún no implementado)
    return res.data // Devuelve la respuesta del backend (ej. usuario y token)
  } catch (e) {
    console.error("Ocurrio un error al logear al usuario", e)
    // Lanzamos un error personalizado para manejar en UI o lógica superior
    throw Error("ERROR_LOGIN")
  }
}

// Función para registrar un usuario nuevo con datos tipo IRegistrationForm
export const postRegister = async (data: IRegistrationForm) => {
  try {
    // Petición POST a /users/register con los datos del registro
    const res = await axiosApiBack.post("/users/register", data)

    return res.data // Devuelve la respuesta del backend (ej. usuario creado)
  } catch (e) {
    console.error("Ocurrio un error al registrar el susuario", e)
    // No lanzas error explícito acá, podría ser conveniente para manejar errores en UI
  }
}
