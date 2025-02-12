"use server";

import User from "../../models/User.model.js";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import {cookies} from "next/headers.js";
import {createSession} from "@/app/lib/session.js";
import {redirect} from "next/navigation.js";

// const SECRET_KEY = process.env.SECRET_KEY;
// const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION;

export async function getUser(email, password) {
    try {
    const user =  await User.findOne({
        where: {
            email: email,
        },
    });

    if(!user) return false;

    const verifyPassword = await argon2.verify(user.password, password);

    if(!verifyPassword) return false;

    await createSession(user.id);

    redirect("/")
    // const token = jwt.sign(
    //     {id: user.id, email: user.email},
    //     SECRET_KEY,
    //     {expiresIn: TOKEN_EXPIRATION}
    // )
    //
    //     cookies().set("sesssion", token, {
    //         httpOnly: true,
    //         secure: false,
    //         sameSite: "strict",
    //         max: 24*60*60,
    //         path: "/"
    //     })

        // JSON.stringify(user, null, 2)
    return  true;
    }catch (error) {
        console.error(error);
    }

    }

