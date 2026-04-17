"use client";

import { ShoppingCart } from "lucide-react";
import apiServices from "@/services/api";
import Wishitem from "./wishitem";
import { useEffect, useState, useContext } from "react"; 
import { cartContext } from "@/contexts/cartcontext"; 
import { toast } from "sonner";
import { useSession } from 'next-auth/react';

export default function WishlistPage() {
  const [wishedProducts, setWishedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setCartCount, setWishlistCount } = useContext(cartContext);
  const { data: session } = useSession();


async function getWishlist() {
    const token = session?.user?.token; // 1. سحب التوكن
    if (!token) return; // لو مفيش توكن ميعملش ريكويست

    try {
      const res = await apiServices.getUserWishlist(token); // 2. بعت التوكن
      setWishedProducts(res || []);
      setWishlistCount(res?.length || 0);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddToCart = async (productId: string) => {
    const token = session?.user?.token; // سحب التوكن
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const response = await apiServices.addProductToCart(productId, token);
      setCartCount(response.numOfCartItems);
      toast.success(response.message || "Added to cart successfully");
      return response;
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  async function handleRemoveFromWishlist(productId: string) {
    const token = session?.user?.token; 
    if (!token) return;

    try {
      const res = await apiServices.removeFromWishlist(productId, token); 
    
      const updatedWishlist = res.data || res; 
      
     
      setWishedProducts(updatedWishlist);
      setWishlistCount(updatedWishlist.length);
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }

  useEffect(() => {
    if (session?.user?.token) {
      getWishlist();
    }
  }, [session]); 
  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  if (wishedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-50">
        <ShoppingCart size={80} className="mb-4" />
        <h2 className="text-2xl font-bold">Your wishlist is empty</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">My Wishlist</h1>
   
      <div className="hidden md:flex items-center justify-between px-6 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
        <div className="w-[40%]">Product</div>
        <div className="w-[15%] text-center">Price</div>
        <div className="w-[15%] text-center">Status</div>
        <div className="w-[25%] text-right">Actions</div>
      </div>

      <div className="flex flex-col gap-4">
        {wishedProducts.map((product: any) => (
          <Wishitem 
            key={product.id || product._id} 
            wishedproduct={product} 
            onRemove={handleRemoveFromWishlist} 
            addToCart={() => handleAddToCart(product._id || product.id)} 
          />
        ))}
      </div>
    </div>
  );
}