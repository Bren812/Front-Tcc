import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Package,
  ClipboardList,
  BarChart3,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [cadastrosOpen, setCadastrosOpen] = useState(false);
  const [insumosOpen, setInsumosOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;
  const isSectionActive = (paths) => paths.some((p) =>
    location.pathname.startsWith(p)
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">
            Sistema Estoque
          </h1>
          <p className="text-sm text-gray-500">Lanchonete</p>
        </div>

        <nav className="px-3 space-y-1 flex-1 overflow-y-auto">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive("/") ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>

          {/* Cadastros */}
          <div>
            <button
              onClick={() => setCadastrosOpen(!cadastrosOpen)}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${
                isSectionActive(["/cadastros"])
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <ClipboardList size={20} />
                <span>Cadastros</span>
              </div>
              {cadastrosOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
            {cadastrosOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <Link
                  to="/cadastros/product"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive("/cadastros/product")
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Produtos
                </Link>
                <Link
                  to="/cadastros/supplier"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive("/cadastros/supplier")
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Fornecedores
                </Link>
                <Link
                  to="/cadastros/sector"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive("/cadastros/sector")
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Setores
                </Link>
                <Link
                  to="/cadastros/user"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive("/cadastros/user")
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Usuários
                </Link>
                <Link
                  to="/cadastros/edit-delete"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive("/cadastros/edit-delete")
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Editar/Excluir
                </Link>
              </div>
            )}
          </div>

          {/* Insumos */}
          <div>
            <button
              onClick={() => setInsumosOpen(!insumosOpen)}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${
                isSectionActive(["/insumos"])
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Package size={20} />
                <span>Insumos</span>
              </div>
              {insumosOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
            {insumosOpen && (
              <div className="ml-4 mt-1 space-y-1">
                <Link
                  to="/insumos/list"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive("/insumos/list")
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Lista
                </Link>
                <Link
                  to="/insumos/restock-withdraw"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive("/insumos/restock-withdraw")
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Repor/Retirar
                </Link>
                <Link
                  to="/insumos/inventory-count"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive("/insumos/inventory-count")
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Contagem
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/reports"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive("/reports")
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <BarChart3 size={20} />
            <span>Relatórios</span>
          </Link>
        </nav>

        <div className="p-3 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
