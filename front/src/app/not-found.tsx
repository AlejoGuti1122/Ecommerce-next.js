import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404 - Página no encontrada</h1>
        <p>El producto que buscas no existe.</p>
        <Link
          href="/"
          className="text-blue-600 hover:underline"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
