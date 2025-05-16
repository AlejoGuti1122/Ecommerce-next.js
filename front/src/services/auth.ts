import axios from "axios"
import { IFormInput } from "../features/register/components/Register/index"

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
