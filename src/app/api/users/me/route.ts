import { getDataFormToken} from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
     
    try {
        const userId = await getDataFormToken(request)
      
        const user = await User.findOne({_id: userId}).select("-password")
       
        return NextResponse.json({
            message: "User found",
            data: user
        })
        
    } catch (error: any) {
        return NextResponse.json({
            message: "some error message"
            
        })
        
    }
}
