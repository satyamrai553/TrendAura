"use client"

import AuthGuard from "@/guard/auth"



export default function Shop(){
    return(
        <AuthGuard>
        <div>
            <h1>
            This is shopping page
            </h1>
        </div>
        </AuthGuard>
    )
}