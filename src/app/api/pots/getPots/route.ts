import { getUsernameFormToken} from "@/helpers/getUsernameFromToken";
import { NextRequest, NextResponse } from "next/server";
import {connect} from '@/dbConfig/dbConfig'


import Pots from "@/models/potModel";

connect();

export async function GET(request: NextRequest) {
    
    try {
       const username = getUsernameFormToken(request)
        const pots = await Pots.find({username : username})
        
        return NextResponse.json({
            message: "Pots list",
            data: pots,
            status: 200,
        })
        
    } catch (error: any) {
        return NextResponse.json({
            message: error,
            status: 500
            
        })
    }
}