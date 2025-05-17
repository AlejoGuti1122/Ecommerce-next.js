import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext"; // Importa el contexto de autenticación

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth(); // Usa la función logout del contexto

  const handleLogout = () => {
    logout(); // Llama a la función logout del contexto
    router.push("/login"); // Redirige al login
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
    >
      Cerrar Sesión
    </button>
  );
}