import { NextRequest} from "next/server";
// @ts-expect-error
import jwt from "jsonwebtoken"

export const getDataFormToken = (request: NextRequest) => {
 
    try {
        console.log("NextRequest", request)
        const encodetoken =  request.cookies.get("token" )?.value ||''
        console.log("token", process.env.TOKEN_SECRET!)
        const decodedtoken: any =  jwt.verify(encodetoken, process.env.TOKEN_SECRET!)
        console.log("decodedtoken" , decodedtoken?.id)
        return decodedtoken?.id
        
    } catch (error: any) {
        console.log(error)
    }
}


