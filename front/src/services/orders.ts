"use server"

import axios from "axios"

const axiosApiBack = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXPRESS_API, // si aca tenias NEXT_PUBLIC_
})

export interface DtoOrder {
  userId: number
  products: number[]
}

export const postOrder = async (data: DtoOrder, token: string) => {
  try {
    const res = await axiosApiBack.post("/orders", data, {
      headers: {
        authorization: token,
      },
    })

    return res.data
  } catch (e: any) {
    console.error("Ocurrio un error al crear una orden", e?.message)
    throw Error("ERROR_POST_ORDER")
  }
}

export const getUsersOrders = async (token: string) => {
  try {
    const res = await axiosApiBack.get("/users/orders", {
      headers: {
        Authorization: token,
      },
    })

    if (res) {
      return res.data
    }
  } catch (e) {
    console.log("Error en la orden🥶", (e as any)?.message)
    throw new Error("ERROR_ORDERS")
  }
}
