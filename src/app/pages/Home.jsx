import { useAuth } from "../context/AuthContext";
import { User, AlertTriangle, Package, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  const lowStockProducts = products.filter(
    (p) => p.lowStockAlert && p.currentQuantity <= p.minStock
  );

  return (
    <div className="p-8">
      {/* Header with Profile */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="text-blue-600" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Olá, {currentUser?.fullName}
              </h1>
              <p className="text-gray-600">Setor: {currentUser?.sector.name}</p>
              <p className="text-sm text-gray-500">
                {currentUser?.isMaster
                  ? "Usuário Master - Acesso Total"
                  : "Acesso Limitado"}
              </p>
            </div>
          </div>
          <Link
            to="/profile"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver Perfil
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Alerts - Low Stock */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="text-yellow-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Alertas de Estoque
              </h2>
              <p className="text-sm text-gray-600">
                Produtos com estoque mínimo
              </p>
            </div>
          </div>
          {lowStockProducts.length > 0 ? (
            <div className="space-y-3 mb-4">
              {lowStockProducts.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <TrendingDown
                      className="text-yellow-600"
                      size={20}
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Código: {product.code}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-700">
                      {product.currentQuantity}
                    </p>
                    <p className="text-xs text-gray-500">
                      Mín: {product.minStock}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Package size={48} className="mx-auto mb-3 text-gray-300" />
              <p>Nenhum alerta de estoque no momento</p>
            </div>
          )}
          {lowStockProducts.length > 5 && (
            <p className="text-sm text-gray-500 text-center">
              E mais {lowStockProducts.length - 5} produtos...
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Acesso Rápido
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/insumos/restock-withdraw"
              className="p-6 bg-green-50 border-2 border-green-200 rounded-xl hover:bg-green-100 transition-colors group"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <Package className="text-white" size={24} />
                </div>
                <p className="font-semibold text-gray-800">Repor Produtos</p>
                <p className="text-sm text-gray-600 mt-1">
                  Adicionar ao estoque
                </p>
              </div>
            </Link>
            <Link
              to="/insumos/restock-withdraw"
              className="p-6 bg-red-50 border-2 border-red-200 rounded-xl hover:bg-red-100 transition-colors group"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <TrendingDown className="text-white" size={24} />
                </div>
                <p className="font-semibold text-gray-800">
                  Retirar Produtos
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Baixar do estoque
                </p>
              </div>
            </Link>
            <Link
              to="/insumos/list"
              className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 transition-colors group col-span-2"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <Package className="text-white" size={24} />
                </div>
                <p className="font-semibold text-gray-800">
                  Ver Todos os Produtos
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Lista completa do estoque
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
