'use client';
import CartContextProvider from "@/contexts/cartcontext";
import { Session } from "inspector/promises";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function providerswrapper({ children }: { children: React.ReactNode }) {
  return (

    <SessionProvider>
    <CartContextProvider>
      {children}
    </CartContextProvider>
    </SessionProvider>
  );
}