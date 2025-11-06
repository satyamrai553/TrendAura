import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-xl overflow-hidden shadow-md transition-all duration-200 hover:shadow-lg bg-white dark:bg-neutral-900",
  {
    variants: {
      variant: {
        default: "",
        bordered: "border border-gray-200 dark:border-neutral-700",
      },
      size: {
        sm: "w-[180px]",
        md: "w-[250px]",
        lg: "w-[300px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

interface ProductCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  image: string
  title: string
  price: string
}

export function ProductCard({
  image,
  title,
  price,
  variant,
  size,
  className,
  ...props
}: ProductCardProps) {
  return (
    <div className={cn(cardVariants({ variant, size, className }))} {...props}>
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover rounded-t-xl"
      />
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
          {title}
        </h3>
        <p className="text-lg font-bold text-primary">{price}</p>
        <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition">
          Add to Cart
        </button>
      </div>
    </div>
  )
}
