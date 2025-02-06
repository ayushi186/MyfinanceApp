import {connect} from "@/dbConfig/dbConfig";
import Budget from "@/models/newbudgets";
import { NextRequest , NextResponse } from "next/server";

connect();

export async function  POST (request: NextRequest) {
   
try {
   
    const reqBody = await request.json();
    const { username, category, maximum, theme} = reqBody;
    const maximumNumber = Number(maximum);
   
   const newBudget = new Budget ( {
        username, category, maximum,  theme
    })

    const savedBudget = await  newBudget.save();

    return NextResponse.json({
        message: "Budget created successfully",
        success: true,
        status: 200,
        savedBudget
    })
    
    
} catch (error : any) {
    return NextResponse.json({error: error.message}, {status: 500})
    
}

}