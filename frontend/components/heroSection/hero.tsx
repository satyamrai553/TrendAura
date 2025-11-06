import react from "react"
import { Button } from "../ui/button"
import Link from "next/link"
export default function Hero(){
    return(
       <>
         <div className="h-screen w-full bg-(--brand-bg) px-24 pt-24 flex ">
            <div className="w-1/2">
                <div className="my-8">
                    <h1 className="text-7xl font-black">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
                </div>
                <div className="flex flex-col pr-16">
                <span className="">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</span>
                 <Link href="/shop"><Button className="my-8 w-1/4" size="sm">Shop Now</Button></Link>
                
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-4xl">200+</span>
                        <span>Intenation brands</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-4xl">200+</span>
                        <span>Intenation brands</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-4xl">200+</span>
                        <span>Intenation brands</span>
                    </div>
                </div>
                </div>
            </div>





            <div className="w-1/2">
                <img src="https://placehold.co/600x600" alt="" />
            </div>
        </div>
        <div className="bg-black w-full h-24">
            
        </div>
       </>
    )
}