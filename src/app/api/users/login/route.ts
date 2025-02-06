
import {connect} from "@/dbConfig/dbConfig";

import User from "@/models/userModel"
import { NextRequest , NextResponse } from "next/server";

import bcryptjs from "bcryptjs"

import jwt from "jsonwebtoken"

connect();

export async function  POST (request: NextRequest) {
   
try {
     
   
    const reqBody = await request.json();
    const { email, password} = reqBody;
   
    const existingUser= await User.findOne({email})
    if(!existingUser) {
        return NextResponse.json({error: "User doesn't exist"}, {status: 400})
    }
    // check if password correct
    const validPassword = await bcryptjs.compare(password, existingUser.password)
    if(!validPassword) {
        return NextResponse.json({error: "Password incorrect"}, {status: 400})
    }

    // create token data
    const tokenData= {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
    }

    //create token 
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET! , {expiresIn:"1d"})
    const response = NextResponse.json({
        message: "login Successful",
        success: true,
    })

    response.cookies.set("token" , token, {
        httpOnly: true,
    })

    return response;

} catch (error : any) {
    return NextResponse.json({error: error.message}, {status: 500})
    
}

}
