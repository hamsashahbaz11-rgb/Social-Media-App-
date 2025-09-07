import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() { 

   try {
     const authenticationParameters = getUploadAuthParams({
         privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,  
         publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string, 
     })
 
     console.log(authenticationParameters);
     return Response.json({ ...authenticationParameters, publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY })
   } catch (error) {
    return Response.json({
        error: `ImageKit user authentication failed ${error}`
    }, {status: 500})
   }
}