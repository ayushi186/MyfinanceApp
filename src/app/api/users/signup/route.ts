import {connect} from "@/dbConfig/dbConfig";

import User from "@/models/userModel"
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect();

export async function  POST (request: NextRequest) {
   
try {
   
    const reqBody = await request.json();
    const { username, email, password} = reqBody;
    console.log(reqBody);
    // check if user is already existing
    const existingUser= await User.findOne({email})
    if(existingUser) {
        return NextResponse.json({error: "Useralready existing"}, {status: 400})
    }

    // hash password 
    const salt = await bcryptjs.genSalt(1)
    const hashedPassword = await bcryptjs.hash(password, salt)
    const newUser = new User ( {
        username, email, password: hashedPassword
    })

    const savedUser = await  newUser.save();

    console.log(savedUser)

    return NextResponse.json({
        message: "usercreated successfully",
        success: true,
        savedUser
    })
    
    
} catch (error : any) {
    return NextResponse.json({error: error.message}, {status: 500})
    
}

}