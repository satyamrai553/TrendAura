import { ProductCard } from "../productCard/productCard"


interface ProductSectionProps{
    heading: string,
    products:object
}

export function ProductSection({heading, products}:){
    return(
        <>
        <h1>Heading</h1>
        products.items.forEach((item)=>{
            <ProductCard title={item.title}/>
        })
        </>
    )
}