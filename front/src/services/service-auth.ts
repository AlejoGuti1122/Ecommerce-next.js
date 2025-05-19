import axios from "axios"

const axiosApiBack = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXPRESS_API, // si aca tenias NEXT_PUBLIC_
})
export const postLogin = async (data: any) => {
  try {
    // EXPRESS_API === undefined => "" => /raiz de tu url
    // locahost:3000/....
    const res = await axiosApiBack.post("/users/login", data)

    //  GUARDAR LA COOKIE EN EL NAVEGADOR
    // return "SUCCESS_LOGIN";
    return res.data
  } catch (e) {
    console.error("Ocurrio un error al logear al usuario", e)
    throw Error("ERROR_LOGIN")
  }
}
