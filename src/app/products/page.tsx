import React from 'react'
import  apiServices  from '../../services/api'
import { ProductCard } from '@/app/products/productcard';

export default async function products() {

  async function getProductS(){
  const products = await apiServices.getProductS()
  return products;
 }

  const products = await getProductS()


      console.log(products)

  return (
    <div>
      <div className="container mx-auto py-10">
        <h1>products</h1>

        <div className='grid grid-cols-6 gap-4'>
         
          {
            products.map((product)=>
              <div>
                <ProductCard name={product.title} images={product.images} price={product.price}
                rating={product.ratingsAverage} id={product._id}
                />

              </div>

          
          
          
          
          )
          }
          
        </div>


















      </div>
       

    </div>
  )
}
