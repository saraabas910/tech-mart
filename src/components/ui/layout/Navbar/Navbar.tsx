"use client";

import {  Heart, MenuIcon } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useContext, useEffect, useState } from "react"; 
import { cartContext } from "@/contexts/cartcontext";
import apiServices from "@/services/api";
import { ICategory } from "@/interfaces/Icategory";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"


interface NavbarProps {
  className?: string;
}

export default function Navbar ({ className }: NavbarProps) {
  const session = useSession();
  const router = useRouter();
  console.log("Session Data in Navbar:", session);
  const {cartCount} = useContext(cartContext)
  const { wishlistCount } = useContext(cartContext)
 const [categories, setCategories] = useState<ICategory[]>([]);

 console.log(session.data?.user.role)
 console.log(session.data?.user.token)


  

    useEffect(() => {
  const getCategoriesData = async () => {
    try {
      const res = await apiServices.getCategories();
      //console.log( res);
      setCategories(res);
    } catch (error) {
      console.error(error);
    }
  };

  getCategoriesData(); 
}, []);


  return (
    <section className={cn("p-4", className)}>
      <div className="container">
        <nav className="flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2"
          >
            
            <span className="text-lg font-semibold tracking-tighter">
            TECH-MART
            </span>
          </a>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/products"
                  className={navigationMenuTriggerStyle()}>
                  Products
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/brands"
                  className={navigationMenuTriggerStyle()}>
                 brands
                </NavigationMenuLink>
              </NavigationMenuItem>
             <NavigationMenuItem>

            <NavigationMenuTrigger className="capitalize">
                categories
                  </NavigationMenuTrigger>

 
                  <NavigationMenuContent>
             <ul className="grid w-[300px] grid-cols gap-3 p-6 md:w-[300px] lg:w-[300px]">
      
     <div className="flex flex-col gap-3">
  <Link href="/categories">
    <h4 className="text-sm font-bold leading-none text-main border-b pb-2">
      All Categories
    </h4>
  </Link>
  
  <ul className="flex flex-col gap-2">
    {categories.map((item) => (
     
      <li key={item._id || item.name} className="text-sm text-muted-foreground hover:text-main cursor-pointer transition-colors">
   
        <Link href={`/categoryproducts/${ item._id}`}>
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
</div>

    </ul>
           </NavigationMenuContent>
        </NavigationMenuItem>

        { session.status === "authenticated" &&
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/cart"
                  className={navigationMenuTriggerStyle()}
                >
                cart
                </NavigationMenuLink>
              </NavigationMenuItem> }
            </NavigationMenuList>
          </NavigationMenu>
          {/*888888888888888888888888888888888888888888888888*/}

    
          {session.status === "authenticated" && (
        <>
           <div className="hidden items-center gap-4 lg:flex">
            <Link href={"/cart"}>
             <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-primary-foreground">
             {cartCount}
              </span>
              <span className="sr-only">Shopping cart</span>
             </Button>
             </Link>
             <Link href={"/wishlist"}>
             <Button variant="ghost" size="icon" className="relative">
             <Heart className="h-5 w-5" />
             <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-primary-foreground">
             {wishlistCount}
              </span>
             <span className="sr-only">Wishlist</span>
             </Button>
             </Link>
               </div>
          </>
  )}

    {
      session.status !== "authenticated" ? (
  
    <>
      <Button onClick={() => router.push("/auth/signin")} variant="outline">
        Sign in
      </Button>
      <Link href={"/"}> 
       <Button >
        Start for free
      </Button>
      </Link> 
    </>
  ) : (
    
    <Button onClick={() => signOut({ callbackUrl: '/auth/signin' })} variant="outline">
      Sign out
    </Button>
  )
}
          
     
        </nav>
      </div>
    </section>
  );
};

