"use client";

import { cartContext } from '@/contexts/cartcontext';
import apiServices from '@/services/api';
import { Heart } from 'lucide-react';
import Link from 'next/link'; 
import React, { useContext, useEffect, useState, use } from 'react'; 
import { toast } from 'sonner';
import { useSession } from "next-auth/react";

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { data: session } = useSession(); 
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { id } = use(params);
  const context = useContext(cartContext);
  const { setWishlistCount, setCartCount } = context!;

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
 
      const res = await apiServices.getProductsByCategory(id);
      setProducts(res);
      setLoading(false);
    }
    getProducts();
  }, [id]); 


  async function handleWishlist(productId: string) {
    const token = session?.user?.token;
    if (!token) {
      toast.error("Please login first!");
      return;
    }

    const response = await apiServices.addtowishlist(productId, token);
    if (response.status === "success") {
      setWishlistCount((prevCount: number) => prevCount + 1);
      toast.success(response.message);
    } else {
      toast.error("Failed to add to wishlist");
    }
  }

 
  async function addToCart(productId: string) {
    const token = session?.user?.token; 
    if (!token) {
      toast.error("Please login first!");
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
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen pt-44">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen pt-44">
        <p className="text-lg font-medium text-gray-500">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="p-4 pt-44">
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <div key={product._id} className="group flex flex-col">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-gray-100 bg-[#F9F9F9] p-2 transition-all duration-300 hover:shadow-lg hover:border-main/50">
              <div className="absolute right-2 top-2 z-10 flex flex-col gap-2">
                <button 
                  onClick={() => handleWishlist(product._id)} 
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              <img
                src={product.imageCover}
                alt={product.title}
                className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="mt-2 space-y-1 px-1">
              <Link href={"/products/" + product._id} className="text-[9px] font-bold text-main uppercase tracking-widest block truncate">
                {product.brand?.name || 'Brand'}
              </Link>
              
              <h3 className="line-clamp-2 h-8 text-[11px] font-medium text-gray-700 leading-tight group-hover:text-main transition-colors">
                {product.title}
              </h3>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-bold text-gray-900">
                  {product.price} <small className="text-[9px] font-normal">EGP</small>
                </span>
                
                <button 
                  onClick={() => addToCart(product._id)} 
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white shadow-sm transition-transform active:scale-90 hover:bg-green-600"
                >
                  <span className="text-sm font-bold">+</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}