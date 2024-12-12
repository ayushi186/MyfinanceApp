
import { NextRequest, NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import Pots from "@/models/potModel";


export const GET = async(request: NextRequest , context: {params: any})  =>{


 
    try {
        await connect();
        const potsId = await context.params.pot;
        const pot = await Pots.find({_id: potsId})
        return NextResponse.json({
            message: "Pot detail",
            data:pot,
            status: 200
        })
        
    } catch (error) {
        return NextResponse.json({
            message: "some error",
            
        })
        
    }
}


export const PATCH  = async(request: NextRequest, context: {params: any}) =>{
const potsId = await context.params.pot;


try {
    const reqBody = await request.json();
   
    const { name, target, total , theme, username }= reqBody;
    await connect();

    const newPot = await Pots.findOne({_id: potsId })

    if(!newPot){
        return new NextResponse(JSON.stringify({ message: "pot not found"}))
    }

    const upDatePot = await Pots.findByIdAndUpdate (
        potsId, 
        { name, target, total , theme, username },

       {new: true}
        
    );

    return new NextResponse(
        JSON.stringify({message: "pots updated" , pot: upDatePot}),
        { status: 200},
    )
    

    
} catch (error: any) {
    
}


}

export const DELETE = async(request: NextRequest, context: {params: any}) =>{
    
    
    try {
        await connect();
        const potsId = await context.params;
        const potTobeDelets = await Pots.findOne({_id: potsId.pot })
        console.log("potTobeDelets", potTobeDelets)
        if(!potTobeDelets){
            return new NextResponse(JSON.stringify({ message: "pot not found"}))
        }
        const deletedPot = await Pots.findByIdAndDelete (
            potsId.pot, 
        );
        if(deletedPot){
            console.log("deletedPOt", deletedPot)
            debugger;
            return new NextResponse(
                JSON.stringify({message: "pot deleted" , pot: deletedPot}),
                { status: 200},
            )
        }
        
        
        
    } catch (error) {
        return NextResponse.json({
            message: "some error message"
            
        })
        
    }
}