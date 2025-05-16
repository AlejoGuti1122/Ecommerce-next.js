import Detail from "@/features/product-detail/components/Detail"

const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`${process.env.EXPRESS_API}/products/${params.id}`, {
    cache: "no-store", // Evita el almacenamiento en caché para obtener siempre datos actualizados
  })

  if (!res.ok) {
    return <p>Producto no encontrado</p>
  }

  const product = await res.json()

  return (
    <div className="container mx-auto p-4">
      <Detail product={product} />
    </div>
  )
}

export default ProductDetail
