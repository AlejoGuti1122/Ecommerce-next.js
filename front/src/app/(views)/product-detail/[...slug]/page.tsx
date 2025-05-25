import { notFound } from "next/navigation"
// Importa la función `notFound()` de Next.js para mostrar automáticamente la página 404 si algo falla.

import Detail from "@/features/product-detail/components/Detail"
// Importa el componente `Detail` que muestra los detalles del producto (posiblemente una ficha con imagen, descripción, etc.)

type Props = {
  params: Promise<{
    slug: string
  }>
}
// Define el tipo de `props` que este componente recibe desde el sistema de rutas dinámicas de Next.js.
// En este caso, se espera que `params` sea una promesa que al resolverse tenga un `slug`.
// El `slug` viene de la URL (por ejemplo: /products/12 -> slug = "12").
// Es importante que uses `[slug]` o `[...slug]` en la carpeta para que esto funcione.

export default async function PageProductDetail({ params }: Props) {
  const id = (await params)?.slug?.[0]
  // Se espera que `params` sea una promesa, por eso la esperamos con `await`.
  // Luego accedemos al primer elemento del slug como el ID del producto.
  // Ejemplo: si la URL es `/products/12`, entonces `slug[0]` es `"12"`.

  if (!id) {
    return notFound()
    // Si no hay un id (por ejemplo si la URL no tiene nada), se muestra la página 404.
  }

  const productId = Number(id)
  // Convertimos el id recibido como string a número.

  if (isNaN(productId)) {
    return notFound()
    // Si al convertir el id a número da NaN (o sea, no es un número válido), también se muestra la página 404.
  }

  // Llamada al backend para obtener los detalles del producto
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_EXPRESS_API}/products/${productId}`,
    {
      cache: "no-store",
      // Esta opción evita que el navegador o servidor cachee la respuesta.
      // Útil para que siempre obtenga la versión más actual del producto.
    }
  )

  if (!res.ok) {
    return notFound()
    // Si el backend devuelve un error (por ejemplo 404 o 500), mostramos la página 404.
  }

  const product = await res.json()
  // Parseamos la respuesta del backend a un objeto JSON con los datos del producto.

  return (
    <div className="container mx-auto p-4">
      <Detail product={product} />
      {/* Renderizamos el componente Detail y le pasamos el producto como prop */}
    </div>
  )
}
