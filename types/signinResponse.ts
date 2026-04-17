export type signinResponse={

     message:"success"|"incorrect email or password",
    user: {
        name: string,
        email: string,
        role: string
    },
    token: string
}