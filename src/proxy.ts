import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

 
export async function proxy(request: NextRequest) {
    const token = await getToken({req:request}) 
     if(token?.token){

        NextResponse.next()


     }else{
   
  return NextResponse.redirect(new URL('/auth/signin', request.url))
     }
}
 

 
export const config = {
  matcher: '/cart',
}