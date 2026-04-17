

import apiServices from '@/services/api'
import Link from 'next/dist/client/link';
import React from 'react'

export default async function categories() {

 async function getCategories() {
    const res = await apiServices.getCategories();
    
    return res;
 }

 const categories = await getCategories();
 console.log("categories", categories);

    
 return (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
   
    {categories.map((category) => (
      <div 
        key={category._id} 
        className="group flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md hover:border-main cursor-pointer"
      >
        <div className="relative h-24 w-full overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
       <Link href={`/categories/${category._id}`} 
       className="mt-3 text-sm font-medium text-gray-700 group-hover:text-main transition-colors">
          {category.name}
        </Link>
      </div>
    ))}
  </div>
);
}
