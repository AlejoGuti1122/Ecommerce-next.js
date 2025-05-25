import { IOrder } from "@/interfaces"

interface Props {
  orders?: IOrder[]
  loading: boolean
  error?: string
}

export default function OrdersList({ orders, loading, error }: Props) {
  if (loading) {
    return <p className="text-white mt-10 text-center">Cargando tus órdenes...</p>
  }

  if (error) {
    return <p className="text-red-400 mt-10 text-center">{error}</p>
  }

  if (!orders?.length) {
    return (
      <p className="mt-10 text-center text-gray-300">
        No tienes compras registradas.
      </p>
    )
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4 text-white">Tus compras</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">Orden #{order.id}</h3>
              <span className="text-sm text-gray-500">
                {new Date(order.date).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Estado: <span className="font-medium">{order.status}</span>
            </p>

            <div className="space-y-2">
              {order.products.map((product) => (
                <div key={product.id} className="flex justify-between text-sm text-gray-700">
                  <span>{product.name}</span>
                  <span>${product.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 font-semibold text-right">
              Total: $
              {order.products
                .reduce((acc, product) => acc + product.price, 0)
                .toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
