import apiServices from '@/services/api';
import React from 'react'
import { Folder } from "lucide-react";
import Link from 'next/link';
import { ArrowLeft } from "lucide-react";

export default async function Subcategories({ params }: { params: Promise<{ subcategories: string }> }) {
  const resolvedParams = await params;
  await console.log("Subcategories", resolvedParams);


  async function fetchSubcategories() {
 
      const response = await apiServices.getallsubcategories(); 
      return response;
    
  }

  const subcategories = await fetchSubcategories();
  console.log("Subcategories Data:", subcategories);
  return (

<div className="container mx-auto px-4 py-8">

 <Link 
  href="/categories" 
  className="group mb-6 inline-flex items-center gap-2 text-main hover:text-green-700 transition-colors duration-300"
>
  <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
  <h1 className="text-lg font-bold">
    Back to Categories
  </h1>
</Link>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
    
    {subcategories?.map((sub: any) => (
      <div 
        key={sub._id} 
        className="group cursor-pointer rounded-xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-main/50 hover:shadow-md"
      >
        <div className="flex flex-col gap-4">
          
         
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F0F9F4] text-main transition-colors group-hover:bg-main group-hover:text-white">
            <Folder size={40} fill="currentColor" fillOpacity={0.2} color='green'/>
          </div>

         
          <h3 className="text-sm font-bold text-gray-800 transition-colors group-hover:text-main">
            {sub.name}
          </h3>
          
        </div>
      </div>
    ))}

  </div>
</div>
  )
}
