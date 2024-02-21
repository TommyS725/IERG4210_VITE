import { basicAuth } from "hono/basic-auth"
import dotenv from "dotenv";
dotenv.config();

const admin = {
    username:process.env.ADMIN_USERNAME,
    password:process.env.ADMIN_PASSWORD
} as const 

if(!admin.username || !admin.password){
    throw new Error("Admin credentials not set")
}


export const adminAuth = basicAuth({
    username:admin.username,
    password:admin.password
})
