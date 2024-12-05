import { getDataFormToken} from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
    debugger
    try {
        const userId = await getDataFormToken(request)
        console.log("userId", userId)
        const user = await User.findOne({_id: userId}).select("-password")
        console.log(user, "useer")
        return NextResponse.json({
            message: "User found",
            data: user
        })
        
    } catch (error: any) {
        
    }
}