"use client"
import React from 'react'

export default function ProductDetail() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalle del Producto</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">iPhone 11</h2>
          <p className="text-gray-600 mb-4">$699</p>
          <p className="text-gray-500">
            Experience power and elegance with the iPhone 11
          </p>
        </div>
      </div>
    </div>
  )
}