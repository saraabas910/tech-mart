"use client";

import { cartContext } from '@/contexts/cartcontext';
import apiServices from '@/services/api';
import Link from 'next/link';
import React, { useContext } from 'react';
import { IProduct } from 'interfaces/Iproduct'
import { toast } from 'sonner';
import { useSession } from 'next-auth/react'; 
import { Heart } from "lucide-react";

interface IProps {
  brandProducts: IProduct[];
}

export default function Productsbrand({ brandProducts }: IProps) {
  const { data: session } = useSession(); 
  const context = useContext(cartContext);
  const { setWishlistCount, setCartCount } = context;

  async function addToCart(productId: string) {
    const token = session?.user?.token; 

    if (!token) {
      toast.error("Please login first to add products to cart");
      return;
    }

    try {
 
      const response = await apiServices.addProductToCart(productId, token);
      toast.success(response.message);
      setCartCount(response.numOfCartItems);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  async function handleWishlist(productId: string) {
    const token = session?.user?.token; 

    if (!token) {
      toast.error("Please login first to add products to wishlist");
      return;
    }

    try {
   
      const response = await apiServices.addtowishlist(productId, token);
      
      if (response.status === "success") {
        setWishlistCount((prevCount) => prevCount + 1);
        toast.success(response.message);
      } else {
        toast.error("Failed to add to wishlist");
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10 border-b pb-5">
        <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-tight">
          Brand Products
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
        {brandProducts?.map((product) => (
          <div key={product._id} className="group flex flex-col">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-gray-100 bg-[#F9F9F9] p-4 transition-all duration-300 hover:shadow-xl hover:border-main/50">
              <div className="absolute right-2 top-2 z-10 flex flex-col gap-2">
                <button onClick={() => handleWishlist(product._id)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm hover:bg-red-500 hover:text-white transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              <img
                src={product.imageCover}
                alt={product.title}
                className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="mt-3 space-y-1 px-1">
              <Link href={"/products/" + product._id} className="text-[10px] font-bold text-main uppercase tracking-widest">
                {product.brand?.name || 'Brand'}
              </Link>

              <Link href={"/products/" + product._id}>
              <h3 className="line-clamp-2 h-9 text-xs font-medium text-gray-700 leading-snug group-hover:text-main transition-colors">
                {product.title}
              </h3>
              </Link> 

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-bold text-gray-900">
                  {product.price} <small className="text-[10px] font-normal">EGP</small>
                </span>
                
                <button onClick={() => addToCart(product._id)} className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white shadow-sm transition-transform active:scale-90 hover:bg-green-600">
                  <span className="text-sm font-bold">+</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}