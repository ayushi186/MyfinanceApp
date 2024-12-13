import { getUsernameFormToken} from "@/helpers/getUsernameFromToken";
import { NextRequest, NextResponse } from "next/server";
import {connect} from '@/dbConfig/dbConfig'

import Budget from "@/models/newbudgets";

connect();

export async function GET(request: NextRequest) {
    
    try {
       const username = getUsernameFormToken(request)
        const budgets = await Budget.find({username : username})
        
        return NextResponse.json({
            message: "Budet List",
            data: budgets,
        })
        
    } catch (error: any) {
        return NextResponse.json({
            message: error,
            status: 500
            
        })
    }
}