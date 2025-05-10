"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { useRouter } from "next/navigation"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const Hero = () => {
  const router = useRouter()

  const slides = [
    {
      title: "Nueva Colección de Smartphones",
      description: "Descubre la última tecnología en tus manos",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000",
      cta: "Explorar ahora",
    },
    {
      title: "Laptops de Última Generación",
      description: "Potencia y rendimiento excepcional",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000",
      cta: "Ver más",
    },
    {
      title: "Accesorios Premium",
      description: "Complementa tu experiencia tecnológica",
      image:
        "https://i.pinimg.com/736x/e8/35/4b/e8354b90bf7864db8ddedf3debf0413a.jpg",
      cta: "Descubrir",
    },
  ]

  const handleNavigation = () => {
    router.push("/products") // Todos los botones llevan a la misma ruta
  }

  return (
    <div className="relative h-[600px]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[600px]">
              {/* Capa de imagen */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/60" />
              </div>

              {/* Contenido */}
              <div className="relative h-full flex items-center justify-center">
                <div className="text-center px-4 max-w-4xl">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-8">
                    {slide.description}
                  </p>
                  <button
                    onClick={handleNavigation}
                    className="bg-blue-600 text-white px-8 py-3 rounded-full 
                    hover:bg-blue-700 transition-colors"
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Hero
