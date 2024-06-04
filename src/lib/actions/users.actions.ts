"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model"
import { connecToDB } from "../mongoose"

export async function updateUser(
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string
): Promise<void> {
    try {
        connecToDB()
        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                path,
                onboarding: true
            },
            { upsert: true }
        );
        if (path === '/profile/edit') {
            revalidatePath(path)
        }
    } catch (err: any) {
        throw new Error(`Failed to create/update user :${err.message}`)
    }
}

export async function fetchUser(userId: string) {
    try {
        connecToDB()
        const user =  await User.findOne({ id: userId })
        // .populate({
        //     path: 'communities',
        //     model: "Community"
        // })
        return user
    } catch (error:any) {
        console.log(error)
        // throw new Error(`can't find user ${error.message}`)
    }
}