import {connect} from "@/dbConfig/dbConfig";

import Pots from "@/models/potModel";
import { NextRequest , NextResponse } from "next/server";

connect();

export async function  POST (request: NextRequest) {
   
try {
   
    const reqBody = await request.json();
    const { name, target, total , theme, username }= reqBody;
    console.log("reqbody", reqBody);
   const newPot = new Pots ( {
    name, target, total , theme, username
    })

    const savedPot = await  newPot.save();

    return NextResponse.json({
        message: "Pot created successfully",
        success: true,
        savedPot
    })
    
    
} catch (error : any) {
    return NextResponse.json({error: error.message}, {status: 500})
    
}

}