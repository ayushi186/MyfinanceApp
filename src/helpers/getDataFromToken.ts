import { NextRequest} from "next/server";

import jwt from "jsonwebtoken"

export const getDataFormToken = (request: NextRequest) => {
 
    try {
       
        const encodetoken =  request.cookies.get("token" )?.value ||''
       
        const decodedtoken: any =  jwt.verify(encodetoken, process.env.TOKEN_SECRET!)

        return decodedtoken?.id
        
    } catch (error: any) {
        console.log(error)
    }
}


