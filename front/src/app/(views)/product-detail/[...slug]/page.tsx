// app/product-detail/[...slug]/page.tsx

import { notFound } from "next/navigation"
import Detail from "@/features/product-detail/components/Detail"
import { sampleProduct } from "@/features/product-detail/components/Detail"
import type { Metadata } from "next"

type Props = {
  params: {
    slug: string[]
  }
}

// ✅ Asegúrate de marcarla como async si usas datos dinámicos
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params?.slug?.[0]

  if (!id || isNaN(Number(id)) || Number(id) !== 1) {
    return {
      title: "Producto no encontrado",
    }
  }

  // Aquí podrías hacer un fetch si lo necesitaras:
  // const product = await fetchProductById(id)

  return {
    title: `Detalle del producto ${id}`,
    description: "Información detallada del producto",
  }
}

// Página principal
export default function PageProductDetail({ params }: Props) {
  const id = params?.slug?.[0]

  if (!id) {
    return notFound()
  }

  const productId = Number(id)

  if (isNaN(productId) || productId !== 1) {
    return notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <Detail product={sampleProduct} />
    </div>
  )
}
