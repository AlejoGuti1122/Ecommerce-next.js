"use client"
import Button from "@/features/home/components/ButtonLanding"
import { Card } from "@/features/home/components/Card"
import Section2 from "@/features/home/components/Section2"

export default function Home() {
  return (
    <main>
      <Section2 />
      <section className="container mx-auto p-4">
        <h1
          className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 
          to-purple-600 bg-clip-text text-transparent"
        >
          Productos Apple
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card />
        </div>
      </section>
      <Button />
    </main>
  )
}
                          