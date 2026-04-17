
import apiServices from '@/services/api';
import React from 'react';
import Productsbrand from './productsbrand'; 


export default async function SpecificBrand({ params }: { params: Promise<{ id: string }> }) {
    
    const { id } = await params;

   
    const brandProducts = await apiServices.getSpecificBrand(id);

    if (!brandProducts || brandProducts.length === 0) {
       return (
         <div className='flex container mx-auto justify-center items-center h-screen'>
           <div className="text-center text-gray-500 font-bold text-4xl">
             No products found for this brand.
           </div>
         </div>
       );
    }

   
    return <Productsbrand brandProducts={brandProducts} />;
}