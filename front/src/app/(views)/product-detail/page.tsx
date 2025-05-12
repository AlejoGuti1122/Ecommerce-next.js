"use client"
import Detail from "@/features/product-detail/components/Detail"
import { sampleProduct } from "@/features/product-detail/components/Detail"
import React from "react"

export default function ProductDetail() {
  return (
    <div className="container mx-auto p-4">
      <Detail product={sampleProduct} />
    </div>
  )
}