import { IBrand } from "interfaces/Ibrand"
import { ICategory } from "interfaces/Icategory"
import { ISubcategory } from "interfaces/Isubcategory"

export interface ICartProduct {
  _id: string
  product: Product
  price: number
  count: number
}



 export interface Product {
  _id: string
  id: string
  title: string
  slug: string
  imageCover: string
  quantity: number
  ratingsAverage: number
  brand: IBrand
  category: ICategory
  subcategory: ISubcategory[]
}