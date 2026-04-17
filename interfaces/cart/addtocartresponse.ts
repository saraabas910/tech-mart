import { ICart } from "./cart"

export interface IAddToCartResponse {
  status: string
  message: string
  numOfCartItems: number
  cartId: string
  data: ICart
}