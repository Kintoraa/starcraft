// import {cookies} from "next/headers.js";
// import jwt from "jsonwebtoken";
//
// const SECRET_KEY = process.env.SECRET_KEY;
//
// export async function getSessionUser() {
//     try {
//
//         const cookieStore = cookies();
//         const token = await cookieStore.get("session")
//         console.log(token)
//
//         if(!token)return null
//         const decoded = jwt.verify(token, SECRET_KEY);
//
//         return {id: decoded.id, email: decoded.email};
//
//     } catch (error){
//         console.log(error)
//     }
//
// }