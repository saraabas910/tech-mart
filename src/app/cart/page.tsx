'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import apiServices from '@/services/api';
import { ShoppingCart } from '@/app/cart/innercart';
import { Loader2 } from 'lucide-react';

export default function CartPage() {
    const { data: session, status } = useSession();
    
   
    const [cartData, setCartData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCart() {
            if (status === "authenticated" && session?.user?.token) {
                try {
                    const data = await apiServices.getCart(session.user.token);
                    setCartData(data);
                } catch (error) {
                    console.error("Error fetching cart:", error);
                } finally {
                    setIsLoading(false);
                }
            } else if (status === "unauthenticated") {
                setIsLoading(false);
            }
        }
        fetchCart();
    }, [session, status]);

    if (isLoading || status === "loading") {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-green-600" />
            </div>
        );
    }

    if (status === "unauthenticated") {
        return (
            <div className="flex h-screen flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Please login to view your cart</h1>
            </div>
        );
    }


    return (
        <ShoppingCart cart={cartData || { data: { products: [] }, numOfCartItems: 0 }} />
    );
}