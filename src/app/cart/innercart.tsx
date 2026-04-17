"use client";

import { Link, Loader2, Minus, Plus, ShoppingCart as ShoppingCartIcon, Trash2 } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IAddToCartResponse } from "interfaces/cart/addtocartresponse";
import apiServices from "@/services/api";
import Cartproduct from "../products/cartproduct";
import { cartContext } from "@/contexts/cartcontext";
import { useSession } from "next-auth/react";

const ShoppingCart = ({ cart }: { cart: IAddToCartResponse }) => {
  const { data: session } = useSession(); 
  const [innercart, setInnerCart] = useState<IAddToCartResponse>(cart);
  const [isclearinng, setIsClearing] = useState(false);
  const { setCartCount } = useContext(cartContext);
  const [checkouting, setCheckouting] = useState(false);


  useEffect(() => {
    setCartCount(innercart.numOfCartItems);
  }, [innercart, setCartCount]);

  if (innercart.numOfCartItems === 0) {
    return (
      <section className="py-32 ">
        <div className="container max-w-lg text-center mx-auto">
          <h1 className="mb-4 text-2xl font-semibold">Your cart is empty</h1>
          <p className="mb-8 text-muted-foreground">
            Looks like you haven't added anything yet.
          </p>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </section>
    );
  }


  async function updateitem(productId: string, count: number) {
    const token = session?.user?.token;
    if (token) {
      const response = await apiServices.updateProductCart(productId, count, token);
      setInnerCart(response);
    }
  }


  async function removeItem(ProductId: string) {
    const token = session?.user?.token;
    if (token) {
      const response = await apiServices.removeitem(ProductId, token);
      setInnerCart(response);
      console.log("remove item response", response);
    }
  }


  async function clearcart() {
    const token = session?.user?.token;
    if (token) {
      setIsClearing(true);
      const response = await apiServices.clearcart(token);
      setInnerCart(response);
      setIsClearing(false);
      console.log("clear cart response", response);
    }
  }


  async function handleCheckout() {
    const token = session?.user?.token;
    if (token) {
      setCheckouting(true);
      const response = await apiServices.checkout(innercart.data._id, token);
      const data = await response.json();
      setCheckouting(false);

      if (data.session?.url) {
        location.href = data.session.url;
      }
      console.log("checkout response", data.session?.url);
    }
  }

  return (
    <section className="py-32">
      <div className="container">
        <h1 className="mb-8 text-3xl font-semibold">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
      
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {innercart.data.products.map((item) => (
                <Cartproduct 
                  key={item._id} 
                  item={item} 
                  removeItem={removeItem} 
                  updateItem={updateitem} 
                />
              ))}
            </div>
          </div>

  
          <div className="lg:col-span-1">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <ShoppingCartIcon className="size-4" />
                    {innercart.numOfCartItems} {innercart.numOfCartItems === 1 ? "item" : "items"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(innercart.data.totalCartPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatPrice(0)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(innercart.data.totalCartPrice)}</span>
                </div>
              </div>

              <Button 
                disabled={checkouting}
                onClick={handleCheckout} 
                size="lg" 
                className="mt-6 w-full"
              >
                {checkouting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Proceed to Checkout
              </Button>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Taxes calculated at checkout
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Button 
            variant={"destructive"}
            className="w-fit px-8"
            disabled={isclearinng}
            onClick={clearcart}
          >
            {isclearinng && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            CLEAR CART
          </Button>
        </div>
      </div>
    </section>
  );
};

export { ShoppingCart };