import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOption: NextAuthOptions = {
    session:{
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers:[
        CredentialsProvider({
            type:'credentials',
            credentials:{},
            authorize(credentials, req){
                    const {email, password} = credentials as {email: string, password: string};



            if(email !== "aravind@gmail.com" || password !== "password") {
                throw new Error("Something went wrong");
            }

            // if everything is fine,

            return {id:"1", name: "aravind", email: "aravind@gmail.com"}
            }

        })
    ],
    pages:{
        signIn: '/',
        error:'/'
    }
}


export default NextAuth(authOption);