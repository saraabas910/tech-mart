import { IBrand } from "./Ibrand";
import { ICategory } from "./Icategory";
import {ISubcategory} from "./Isubcategory"
export interface IProduct{
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  imageCover: string;
  images: string[];
  ratingsAverage: number;
  ratingsQuantity: number;
  brand: IBrand;
  category: ICategory;
  subcategory: ISubcategory[];
  createdAt: string; 
  updatedAt: string; 
}