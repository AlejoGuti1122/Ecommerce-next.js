import { FaLaptop, FaMobileAlt, FaHeadphones, FaRocket } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Section2 = () => {
  const features = [
    {
      icon: <FaRocket className="text-4xl text-purple-500" />,
      title: "Última Tecnología",
      description: "Productos de última generación",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaLaptop className="text-4xl text-blue-500" />,
      title: "Laptops Premium",
      description: "Alto rendimiento garantizado",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaMobileAlt className="text-4xl text-green-500" />,
      title: "Smartphones",
      description: "Lo último en movilidad",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaHeadphones className="text-4xl text-orange-500" />,
      title: "Accesorios",
      description: "Complementa tu experiencia",
      gradient: "from-orange-500 to-yellow-500"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Título de la sección con animación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Descubre el Futuro
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explora nuestra selección de productos tecnológicos de última generación
          </p>
        </motion.div>

        {/* Grid de características */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-lg inline-block`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sección de estadísticas */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              1000+
            </span>
            <p className="text-gray-600 mt-2">Productos</p>
          </motion.div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              50k+
            </span>
            <p className="text-gray-600 mt-2">Clientes Felices</p>
          </motion.div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <span className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
              24/7
            </span>
            <p className="text-gray-600 mt-2">Soporte</p>
          </motion.div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <span className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              99%
            </span>
            <p className="text-gray-600 mt-2">Satisfacción</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Section2