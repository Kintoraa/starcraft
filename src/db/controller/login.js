"use server";

import User from "../../models/User.model.js";
import * as argon2 from "argon2";
import {createSession} from "@/app/lib/session.js";
import {redirect} from "next/navigation";


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

    return  true;
    }catch (error) {
        console.error(error);
    }

    }

