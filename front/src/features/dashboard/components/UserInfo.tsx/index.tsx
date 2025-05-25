import { Iuser } from "@/interfaces"
import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa"


interface Props {
  user: Iuser
}

export default function UserInfo({ user }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <FaUser className="text-blue-500 text-3xl" />
        <div>
          <p className="text-gray-700 font-semibold">Nombre</p>
          <p>{user.name}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <FaEnvelope className="text-green-500 text-3xl" />
        <div>
          <p className="text-gray-700 font-semibold">Correo</p>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <FaSignOutAlt className="text-red-500 text-3xl" />
        <div>
          <p className="text-gray-700 font-semibold">Rol</p>
          <p>{user.role}</p>
        </div>
      </div>
    </div>
  )
}
