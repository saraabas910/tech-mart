'use client';

import apiServices from "@/services/api";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // 1. استيراد useSession

interface ICartContext {
  cartCount: number;
  setCartCount: Dispatch<SetStateAction<number>>;
  wishlistCount: number;
  setWishlistCount: Dispatch<SetStateAction<number>>;
}

export const cartContext = createContext<ICartContext>({
  cartCount: 0,
  setCartCount: () => {},
  wishlistCount: 0,
  setWishlistCount: () => {},
});

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);


  async function getusercart() {
    const token = session?.user?.token; 
    if (!token) return; 

    try {
      const response = await apiServices.getCart(token); 
      setCartCount(response.numOfCartItems || 0);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

 
  async function getuserwishlist() {
    const token = session?.user?.token;
    if (!token) return;

    try {
      const response = await apiServices.getUserWishlist(token); 
      setWishlistCount(response?.length || 0);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }


  useEffect(() => {
    if (session?.user?.token) {
      getusercart();
      getuserwishlist();
    } else {
     
      setCartCount(0);
      setWishlistCount(0);
    }
  }, [session]); 

  return (
    <cartContext.Provider value={{ cartCount, setCartCount, wishlistCount, setWishlistCount }}>
      {children}
    </cartContext.Provider>
  );
}