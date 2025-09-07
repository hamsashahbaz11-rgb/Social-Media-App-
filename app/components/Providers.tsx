
"use client"
import { ImageKitProvider } from "@imagekit/next"
import { SessionProvider } from "next-auth/react"

const url = process.env.NEXT_PUBLIC_URL_ENDPOINT!;

export default function Providers({children}: {children: React.ReactNode}){
    return ( <SessionProvider refetchInterval={ 24 * 60 * 60 * 1000}>
        <ImageKitProvider urlEndpoint={url}>
        {children}
        </ImageKitProvider>
    </SessionProvider>)
}