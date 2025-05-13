"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import React from "react"

const Button = () => {
  return (
    <div className="flex justify-center mt-10 p-6">
      <Link href="/landing">
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{
            scale: 1.1,
            rotate: 2,
            background: [
              "linear-gradient(to right, #6a11cb, #2575fc)",
              "linear-gradient(to right, #2575fc, #6a11cb)",
            ],
            transition: {
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            },
            boxShadow: "0px 8px 20px rgba(101, 31, 255, 0.7)",
          }}
          whileTap={{
            scale: 0.95,
            rotate: -2,
            boxShadow: "0px 4px 10px rgba(101, 31, 255, 0.5)",
          }}
          className="bg-gradient-to-r from-blue-400 to-purple-400 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:opacity-90 transition"
        >
          Conoce más
        </motion.button>
      </Link>
    </div>
  )
}

export default Button
