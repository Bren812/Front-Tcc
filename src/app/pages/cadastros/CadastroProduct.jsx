import { useState, useEffect } from "react";
import { Plus, Search, X, Image as ImageIcon } from "lucide-react";

const defaultCategories = [
  { id: 1, name: "Bebidas" },
  { id: 2, name: "Laticínios" },
  { id: 3, name: "Carnes" },
  { id: 4, name: "Hortifruti" },
];

const defaultUnits = [
  { id: 1, name: "Unidade", abbreviation: "un" },
  { id: 2, name: "Quilo", abbreviation: "kg" },
  { id: 3, name: "Litro", abbreviation: "L" },
  { id: 4, name: "Pacote", abbreviation: "pct" },
];

export default function CadastroProduct() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const [units, setUnits] = useState(() => {
    const saved = localStorage.getItem("units");
    return saved ? JSON.parse(saved) : defaultUnits;
  });

  const [suppliers, setSuppliers] = useState(() => {
    const saved = localStorage.getItem("suppliers");
    return saved ? JSON.parse(saved) : [];
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newUnitName, setNewUnitName] = useState("");
  const [newUnitAbbr, setNewUnitAbbr] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchUnit, setSearchUnit] = useState("");

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    categoryId: "",
    unitId: "",
    initialQuantity: "",
    minStock: "",
    lowStockAlert: false,
    supplierId: "",
    image: "",
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("units", JSON.stringify(units));
  }, [units]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Math.max(0, ...products.map((p) => p.id)) + 1,
      code: formData.code,
      name: formData.name,
      categoryId: Number(formData.categoryId),
      unitId: Number(formData.unitId),
      initialQuantity: Number(formData.initialQuantity),
      currentQuantity: Number(formData.initialQuantity),
      minStock: Number(formData.minStock),
      lowStockAlert: formData.lowStockAlert,
      supplierId: formData.supplierId ? Number(formData.supplierId) : null,
      image: formData.image || undefined,
      createdAt: new Date().toISOString(),
    };
    setProducts([...products, newProduct]);
    resetForm();
    alert("Produto cadastrado com sucesso");
  };

  const resetForm = () => {
    setFormData({
      code: "",
      name: "",
      categoryId: "",
      unitId: "",
      initialQuantity: "",
      minStock: "",
      lowStockAlert: false,
      supplierId: "",
      image: "",
    });
  };

  const addCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: Math.max(0, ...categories.map((c) => c.id)) + 1,
        name: newCategoryName.trim(),
      };
      setCategories([...categories, newCategory]);
      setFormData({ ...formData, categoryId: String(newCategory.id) });
      setNewCategoryName("");
      setShowCategoryModal(false);
    }
  };

  const addUnit = () => {
    if (newUnitName.trim() && newUnitAbbr.trim()) {
      const newUnit = {
        id: Math.max(0, ...units.map((u) => u.id)) + 1,
        name: newUnitName.trim(),
        abbreviation: newUnitAbbr.trim(),
      };
      setUnits([...units, newUnit]);
      setFormData({ ...formData, unitId: String(newUnit.id) });
      setNewUnitName("");
      setNewUnitAbbr("");
      setShowUnitModal(false);
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchCategory.toLowerCase())
  );

  const filteredUnits = units.filter((u) =>
    u.name.toLowerCase().includes(searchUnit.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Cadastro de Produtos
        </h1>
        <p className="text-gray-600">Adicione novos produtos ao estoque</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código Interno *
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Produto *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria *
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Selecione...</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  title="Adicionar nova categoria"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unidade de Medida *
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.unitId}
                  onChange={(e) =>
                    setFormData({ ...formData, unitId: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Selecione...</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name} ({unit.abbreviation})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setShowUnitModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  title="Adicionar nova unidade"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantidade Inicial *
              </label>
              <input
                type="number"
                value={formData.initialQuantity}
                onChange={(e) =>
                  setFormData({ ...formData, initialQuantity: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estoque Mínimo *
              </label>
              <input
                type="number"
                value={formData.minStock}
                onChange={(e) =>
                  setFormData({ ...formData, minStock: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fornecedor (Opcional)
            </label>
            <select
              value={formData.supplierId}
              onChange={(e) =>
                setFormData({ ...formData, supplierId: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="">Nenhum</option>
              {suppliers.map((sup) => (
                <option key={sup.id} value={sup.id}>
                  {sup.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL da Imagem (Opcional)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <div className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <ImageIcon className="text-gray-400" size={24} />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="lowStockAlert"
              checked={formData.lowStockAlert}
              onChange={(e) =>
                setFormData({ ...formData, lowStockAlert: e.target.checked })
              }
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="lowStockAlert" className="text-gray-700">
              Ativar aviso de estoque baixo
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Limpar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Cadastrar Produto
            </button>
          </div>
        </form>
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Categorias</h3>
              <button onClick={() => setShowCategoryModal(false)}>
                <X
                  size={24}
                  className="text-gray-500 hover:text-gray-700"
                />
              </button>
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                placeholder="Pesquisar categoria..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="max-h-48 overflow-y-auto mb-4 space-y-2">
              {filteredCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFormData({ ...formData, categoryId: String(cat.id) });
                    setShowCategoryModal(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Nova Categoria
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Nome da categoria"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  onClick={addCategory}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unit Modal */}
      {showUnitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Unidades de Medida
              </h3>
              <button onClick={() => setShowUnitModal(false)}>
                <X
                  size={24}
                  className="text-gray-500 hover:text-gray-700"
                />
              </button>
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={searchUnit}
                onChange={(e) => setSearchUnit(e.target.value)}
                placeholder="Pesquisar unidade..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="max-h-48 overflow-y-auto mb-4 space-y-2">
              {filteredUnits.map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => {
                    setFormData({ ...formData, unitId: String(unit.id) });
                    setShowUnitModal(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  {unit.name} ({unit.abbreviation})
                </button>
              ))}
            </div>
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Nova Unidade
              </p>
              <div className="space-y-2">
                <input
                  type="text"
                  value={newUnitName}
                  onChange={(e) => setNewUnitName(e.target.value)}
                  placeholder="Nome da unidade"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newUnitAbbr}
                    onChange={(e) => setNewUnitAbbr(e.target.value)}
                    placeholder="Abreviação (ex: kg)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    onClick={addUnit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
