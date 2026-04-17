

import  {IProduct, Responsetype} from "@/types";
import { count } from "console";
import { IAddToCartResponse } from "interfaces/cart/addtocartresponse";
import { IBrand } from "interfaces/Ibrand";
import { ICategory } from "interfaces/Icategory";
import { ISubcategory } from "interfaces/Isubcategory";
import { headers } from "next/dist/server/request/headers";
import { signinResponse } from "types/signinResponse";
      
      
      
 class ApiSerices {

  #BASE_URL=process.env.NEXT_PUBLIC_BASE_URL;
  
  async getProductS():Promise<IProduct[]> {

    const res = await fetch(this.#BASE_URL+"/api/v1/products")
     const data: Responsetype<IProduct>= await res.json()
     //console.log("a",data)
     return data.data
  
 }



 async getProductdetails(id:string):Promise<IProduct> {

  const res = await fetch(this.#BASE_URL+"/api/v1/products/"+id)
   const data: Responsetype<IProduct>= await res.json()
   return data.data
  }


 async addProductToCart(productId:string, token:string):Promise<IAddToCartResponse> {
   const response = await fetch(this.#BASE_URL+"/api/v2/cart",{
    method:"POST",
    headers: {
     "Content-Type": "application/json",
    "token": token
    },
    body: JSON.stringify({ productId })
   })
    const data = await response.json()
    // console.log("data",data)
    return data
   
  }

      
  async getCart(token: string):Promise<IAddToCartResponse>{

   const response= await fetch (this.#BASE_URL+"/api/v2/cart",{
  
    headers:{
       "Content-Type": "application/json",
    "token": token
    }

  })
  const data = await response.json()
  //console.log("cart data",data)
  return data 
}
 
  async removeitem(ProductId:string, token:string):Promise<IAddToCartResponse> {

   const response= await fetch (this.#BASE_URL+"/api/v2/cart/"+ProductId,{
    method:"DELETE",
  
    headers:{
       "Content-Type": "application/json",
         "token": token    }

  })
  const data = await response.json()
  return data
  //console.log("cart data",data)

}

  async clearcart(token: string): Promise<any> {
    const response = await fetch(this.#BASE_URL + "/api/v2/cart/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "token": token 
      }
    });
    const data = await response.json();
    return data;
  }


  async updateProductCart(productId: string, count: number, token: string): Promise<IAddToCartResponse> {
    const response = await fetch(this.#BASE_URL + "/api/v2/cart/" + productId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token": token
      },
      body: JSON.stringify({ count })
    });
    const data = await response.json();
    return data;
  }


  async checkout(cardId: string, token: string) {
    return await fetch(this.#BASE_URL + "/api/v1/orders/checkout-session/" + cardId + "?url=http://localhost:3000", {
      method: "POST",
      body: JSON.stringify({
        "shippingAddress": {
          "details": "details",
          "phone": "01010700999",
          "city": "Cairo"
        }
      }),
      headers: {
        "Content-Type": "application/json",
        "token": token 
      }
    });
  }

async getBrands(): Promise<IBrand[]> {
  const res = await fetch(this.#BASE_URL + "/api/v1/brands");
  
  const data: Responsetype<IBrand> = await res.json();
  
  //console.log("brandssssssss", data.data);
  

  return data.data; 
}




async getSpecificBrand(brandId: string): Promise<IProduct[]> {
  const res = await fetch(this.#BASE_URL +`/api/v1/products?brand=${brandId}` );
  
  const data: Responsetype<IProduct[]> = await res.json();
  
 
  

  return data.data; 
}

async getCategories(): Promise<ICategory[]> {
  
  const res = await fetch(this.#BASE_URL + "/api/v1/categories");
  

  const data: { data: ICategory[] } = await res.json();

  return data.data;
}


  async getallsubcategories():Promise<Responsetype<ISubcategory>> {

  const res = await fetch(this.#BASE_URL + "/api/v1/subcategories");
  

  const data: { data:ISubcategory[] } = await res.json();
  return data.data;
  }






  async addtowishlist(productId: string, token: string): Promise<any> {
  const response = await fetch(this.#BASE_URL + "/api/v1/wishlist", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
 "token": token     },
    body: JSON.stringify({
      productId: productId 
    })
  });

  return await response.json(); 
}


  async getUserWishlist(token: string): Promise<IProduct[]> {
    const response = await fetch(this.#BASE_URL + "/api/v1/wishlist", {
      headers: {
        "Content-Type": "application/json",
        "token": token 
      }
    });

    const data = await response.json();
    return data.data;
  }

  
  async removeFromWishlist(productId: string, token: string): Promise<any> {
    const response = await fetch(this.#BASE_URL + "/api/v1/wishlist/" + productId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "token": token 
      }
    });

    const data = await response.json();
    return data.data;
  }



  async getProductsByCategory(categoryId: string): Promise<IProduct[]> {


      const res = await fetch(this.#BASE_URL + `/api/v1/products?category=${categoryId}`);
      const data: Responsetype<IProduct[]> = await res.json();
      return data.data;


  }



 async signin(email:string,password:string):Promise<signinResponse>  {
  const res = await fetch (this.#BASE_URL + "/api/v1/auth/signin",{
    method:"POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });
    
    const data = await res.json();
    return data;
}




  

 }





































  
 const apiServices = new ApiSerices()
export default apiServices