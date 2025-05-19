import { notFound } from "next/navigation"
import Detail from "@/features/product-detail/components/Detail"

type Props = {
  params: {
    slug: string[]
  }
}

export default async function PageProductDetail({ params }: Props) {
  const id = params?.slug?.[0]

  if (!id) {
    return notFound()
  }

  const productId = Number(id)

  if (isNaN(productId)) {
    return notFound()
  }

  // Llamada al backend para obtener el producto
  const res = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_API}/products/${productId}`, {
    cache: "no-store", // Evita el almacenamiento en caché
  })

  if (!res.ok) {
    return notFound()
  }

  const product = await res.json()

  return (
    <div className="container mx-auto p-4">
      <Detail product={product} />
    </div>
  )
}
