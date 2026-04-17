import apiServices from "@/services/api"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { signinResponse } from "@/types/signinResponse";



const handler = NextAuth({

 providers:[

 
  CredentialsProvider({
  
    name: 'Credentials',
  
    credentials: {
       email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
       password: { label: "Password", type: "password" }
    },

   async authorize(credentials) {
  if (!credentials?.email || !credentials?.password) {
    return null;
  }

  try {
   
    const res: signinResponse = await apiServices.signin(
      credentials.email, 
      credentials.password
    );

  
    console.log("Response from Route API:", res);

    if (res.message === "success" && res.user) {

      return {
        id: res.user.email, 
        name: res.user.name,
        email: res.user.email,
        role: res.user.role,
        token: res.token
      };
    }

  
    console.error("Login Error Message:", res.message);
    return null;

  } catch (error) {
   
    console.error("Runtime Auth Error:", error);
    return null;
  }
}
  })





], 
pages: {
    signIn: "/signin",
},
callbacks: {

    async session({ session, token }) {
    
        session.user.role = token.role as string;
        session.user.token = token.token as string;

        return session;
    
},

       async jwt({ token, user }) {

        if (user) {
          token.role = user.role;
          token.token = user.token;
        }
       
        
        return token;
  
}
}

})

export { handler as GET, handler as POST }