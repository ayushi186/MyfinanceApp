import {connect} from "@/dbConfig/dbConfig";

import Pots from "@/models/potModel";
import { NextRequest , NextResponse } from "next/server";

connect();

export async function  POST (request: NextRequest) {
   
try {
     
    const reqBody = await request.json();
    const { name, target, total , theme, username } = reqBody;
    const targetNumber = Number(target.toString());
    const newPot = new Pots ({
            name, total, target , theme, username
            });
           

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