"use client"
import { IProduct } from "@/interfaces"
import { products } from "@/helpers/products"
import { Card } from "@/features/home/components/Card"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Productos Apple</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: IProduct) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}