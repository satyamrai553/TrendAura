import { ProductCard } from "../productCard/productCard"


interface ProductSectionProps{
    heading: string,
    products:object
}

export function ProductSection({heading, products}: ProductSectionProps){
    return(
        <>
        <h1>{heading}</h1>
        </>
    )
}