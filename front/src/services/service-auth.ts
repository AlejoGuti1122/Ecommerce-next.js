"use server"

import { ILoginInput } from "@/features/login/components/Login"
import { IRegistrationForm } from "@/features/register/components/Register"
import axios from "axios"

const axiosApiBack = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXPRESS_API, // si aca tenias NEXT_PUBLIC_
})
export const postLogin = async (data: ILoginInput) => {
  try {
    // EXPRESS_API === undefined => "" => /raiz de tu url
    // locahost:3000/....

    const res = await axiosApiBack.post("/users/login", data)

    //  GUARDAR LA COOKIE EN EL NAVEGADOR

    return res.data
  } catch (e) {
    console.error("Ocurrio un error al logear al usuario", e)
    throw Error("ERROR_LOGIN")
  }
}

export const postRegister = async (data: IRegistrationForm) => {
  try {
    const res = await axiosApiBack.post("/users/register", data)

    return res.data
  } catch (e) {
    console.error("Ocurrio un error al registrar el susuario", e)
  }
}
