import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import CadastroProduct from "./pages/cadastros/CadastroProduct";
import CadastroSupplier from "./pages/cadastros/CadastroSupplier";
import CadastroSector from "./pages/cadastros/CadastroSector";
import CadastroUser from "./pages/cadastros/CadastroUser";
import EditDelete from "./pages/cadastros/EditDelete";
import List from "./pages/insumos/List";
import RestockWithdraw from "./pages/insumos/RestockWithdraw";
import InventoryCount from "./pages/insumos/InventoryCount";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cadastros/product",
        element: <CadastroProduct />,
      },
      {
        path: "cadastros/supplier",
        element: <CadastroSupplier />,
      },
      {
        path: "cadastros/sector",
        element: <CadastroSector />,
      },
      {
        path: "cadastros/user",
        element: <CadastroUser />,
      },
      {
        path: "cadastros/edit-delete",
        element: <EditDelete />,
      },
      {
        path: "insumos/list",
        element: <List />,
      },
      {
        path: "insumos/restock-withdraw",
        element: <RestockWithdraw />,
      },
      {
        path: "insumos/inventory-count",
        element: <InventoryCount />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
