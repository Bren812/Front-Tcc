import { useAuth } from "../context/AuthContext";
import { User, Mail, Shield, Key } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const { currentUser, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || "",
    email: currentUser?.email || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) return;
    updateUser({
      ...currentUser,
      fullName: formData.fullName,
      email: formData.email,
    });
    setIsEditing(false);
    alert("Perfil atualizado com sucesso");
  };

  if (!currentUser) return null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Meu Perfil</h1>
        <p className="text-gray-600">Informações da sua conta</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="text-blue-600" size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {currentUser.fullName}
              </h2>
              <p className="text-gray-600">@{currentUser.username}</p>
              {currentUser.isMaster && (
                <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Usuário Master
                </span>
              )}
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              {currentUser.isMaster && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <User className="text-gray-600" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Nome Completo</p>
                  <p className="font-medium text-gray-800">
                    {currentUser.fullName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="text-gray-600" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Setor</p>
                  <p className="font-medium text-gray-800">
                    {currentUser.sector.name}
                  </p>
                </div>
              </div>
              {currentUser.email && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="text-gray-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-800">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Key className="text-gray-600" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Nome de Usuário</p>
                  <p className="font-medium text-gray-800">
                    {currentUser.username}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Editar Perfil
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Permissões</h3>
          <div className="space-y-2">
            {currentUser.sector.permissions.map((perm) => (
              <div key={perm} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">{perm}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
