import LandingPage from "@/features/landing/components/Landing"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tech Store | Inicio",
  description:
    "Descubre los mejores productos tecnológicos y las últimas tendencias en nuestra tienda online",
}

export default function Landing() {
  return <LandingPage />
}
