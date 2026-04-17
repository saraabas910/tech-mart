import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

import { Loader2 } from 'lucide-react'
import { ICartProduct } from '@/interfaces/cart/cartproduct'
import { formatPrice } from '@/lib/utils'

export default function Cartproduct({item, removeItem, updateItem}:{item:ICartProduct, removeItem: any, updateItem: any} ) {
      const [isldeleting,setIsDeleting] = useState(false);

      async function updateItemCount( count:number){
        await updateItem(item.product._id, count)
      }

      async function removeItemFromCart(){
        setIsDeleting(true)
       await removeItem(item.product._id)
         setIsDeleting(false)
      }

     

  return (
    <div key={item._id}
                  className="flex gap-4 rounded-lg border bg-card p-4"
                >
                  <div className="w-24 shrink-0">
                    <AspectRatio
                      ratio={1}
                      className="overflow-hidden rounded-md bg-muted"
                    >
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="size-full object-cover"
                      />
                    </AspectRatio>
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-medium">{item.product.title}</h3>
                      {/*product.variant && (
                        <p className="text-sm text-muted-foreground">
                          {item.product.variant}
                        </p>
                      )*/}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                      disabled={item.count ==1 }
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => updateItemCount(item.count - 1)}
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="w-8 text-center">{item.count}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => updateItemCount( item.count + 1)}
                      >
                        <Plus className="size-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                      <p className="font-semibold">
                        {formatPrice(item.price * item.product.quantity)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={isldeleting}  
                      className="text-muted-foreground"
                      onClick={removeItemFromCart}
                    >
                      {isldeleting?<Loader2 className="mr-1 size-4 animate-spin" />:<Trash2 className="mr-1 size-4" />}  
                      Remove
                    </Button>
                  </div>
                </div>
  )
}
