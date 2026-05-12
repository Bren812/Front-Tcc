import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

const defaultSectors = [
  { id: 1, name: "Administração", permissions: ['all'] },
  { id: 2, name: "Cozinha", permissions: ['restock', 'withdraw'] },
  { id: 3, name: "Gerência", permissions: ['restock', 'withdraw', 'inventory_count', 'view_reports'] },
];

const defaultUsers = [
  {
    id: 1,
    fullName: "Usuário Master",
    username: "master",
    password: "master12345678",
    email: "admin@lanchonete.com",
    status: true,
    sectorId: 1,
    isMaster: true,
  },
  {
    id: 2,
    fullName: "Maria",
    username: "maria",
    password: "12345678",
    email: "maria@lanchonete.com",
    status: true,
    sectorId: 2,
    isMaster: false,
  },
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [sectors, setSectors] = useState(() => {
    const saved = localStorage.getItem("sectors");
    return saved ? JSON.parse(saved) : defaultSectors;
  });
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : defaultUsers;
  });

  useEffect(() => {
    localStorage.setItem("sectors", JSON.stringify(sectors));
  }, [sectors]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      const sector = sectors.find((s) => s.id === user.sectorId);
      if (sector && user.status) {
        setCurrentUser({ ...user, sector });
      } else {
        localStorage.removeItem("currentUser");
      }
    }
  }, [sectors]);

  const login = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user && user.status) {
      const sector = sectors.find((s) => s.id === user.sectorId);
      if (sector) {
        const currentUserData = { ...user, sector };
        setCurrentUser(currentUserData);
        localStorage.setItem("currentUser", JSON.stringify(user));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const hasPermission = (permission) => {
    if (!currentUser) return false;
    if (currentUser.isMaster) return true;
    if (currentUser.sector.permissions.includes("all")) return true;
    return currentUser.sector.permissions.includes(permission);
  };

  const updateUser = (user) => {
    const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
    setUsers(updatedUsers);
    if (currentUser && currentUser.id === user.id) {
      const sector = sectors.find((s) => s.id === user.sectorId);
      if (sector) {
        setCurrentUser({ ...user, sector });
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, hasPermission, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
