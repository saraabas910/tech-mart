import apiServices from '@/services/api'
import Link from 'next/dist/client/link';
import React from 'react'

export default async function brands() {


  async function getAllBrands() {

    const res = await apiServices.getBrands()

   
       return res;
  }
     const brands = await getAllBrands()
     //console.log("brands in page", brands); 


     
 return (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
   
    {brands.map((brand) => (
      <div 
        key={brand._id} 
        className="group flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md hover:border-main cursor-pointer"
      >
        <div className="relative h-24 w-full overflow-hidden">
          <img
            src={brand.image}
            alt={brand.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
       <Link href={`/brands/${brand._id}`} 
       className="mt-3 text-sm font-medium text-gray-700 group-hover:text-main transition-colors">
          {brand.name}
        </Link>
      </div>
    ))}
  </div>
);
}
