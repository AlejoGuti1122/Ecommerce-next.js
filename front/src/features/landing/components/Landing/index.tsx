/* eslint-disable @next/next/no-img-element */
"use client"
import Hero from "@/features/home/components/Hero"
import { FaShippingFast, FaLock, FaHeadset, FaCreditCard } from "react-icons/fa"

const LandingPage = () => {
  const features = [
    {
      icon: <FaShippingFast className="text-4xl text-blue-500" />,
      title: "Envío Rápido",
      description: "Entrega en 24/48 horas en toda la península",
    },
    {
      icon: <FaLock className="text-4xl text-blue-500" />,
      title: "Compra Segura",
      description: "Tus datos siempre protegidos",
    },
    {
      icon: <FaHeadset className="text-4xl text-blue-500" />,
      title: "Soporte 24/7",
      description: "Atención al cliente disponible siempre",
    },
    {
      icon: <FaCreditCard className="text-4xl text-blue-500" />,
      title: "Pago Flexible",
      description: "Múltiples métodos de pago disponibles",
    },
  ]

  return (
    <div>
      {/* Hero Section con Slider */}
      <Hero />

      {/* Características */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg
                  hover:transform hover:scale-105 transition-all duration-300"
              >
                {feature.icon}
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías Destacadas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Categorías Destacadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Smartphones */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                alt="Smartphones"
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Smartphones</h3>
                  <p className="text-sm opacity-90">
                    Los últimos modelos al mejor precio
                  </p>
                </div>
              </div>
            </div>

            {/* Laptops */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
                alt="Laptops"
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Laptops</h3>
                  <p className="text-sm opacity-90">
                    Potencia y rendimiento excepcional
                  </p>
                </div>
              </div>
            </div>

            {/* Accesorios */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1625895197185-efcec01cffe0"
                alt="Accesorios"
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Accesorios</h3>
                  <p className="text-sm opacity-90">
                    Complementa tu experiencia tech
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para renovar tu tecnología?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Descubre nuestras ofertas especiales y las últimas novedades
          </p>
          <button
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold 
            hover:bg-opacity-90 transition-colors"
          >
            Ver Productos
          </button>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
