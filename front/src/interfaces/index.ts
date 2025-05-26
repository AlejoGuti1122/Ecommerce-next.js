export interface IProduct {
  id: number
  name: string
  price: number
  description: string
  image: string
  categoryId: number
  stock: number
}

export interface ICategory {
  id: number
  name: string
  products: IProduct[]
}

export interface IOrder {
  id: number
  status: eOrderStatus
  date: string
  user: Iuser
  products: IProduct[]
}

export enum eOrderStatus {
  PENDING = "pending",
  APROVED = "approved",
  REJECTED = "rejected",
}

export enum eRole {
  ADMIN = "admin",
  USER = "user",
}

export interface Iuser {
  id: number
  name: string
  email: string
  address: string
  phone: string
  role: eRole // "admin" | "user"
  orders: IOrder[]
}

export interface ILoginInput {
  email: string
  password: string
}

export interface IRegistrationForm {
  name: string
  email: string
  password: string
  confirmPassword?: string
}
