# Estrutura do Sistema

## 📁 Organização de Arquivos

```
src/app/
├── types/
│   └── index.ts                    # Tipos TypeScript do sistema
│
├── context/
│   └── AuthContext.tsx             # Contexto de autenticação e permissões
│
├── components/
│   ├── Layout.tsx                  # Layout principal com navegação
│   ├── ProtectedRoute.tsx          # Guarda de rotas autenticadas
│   └── PermissionGuard.tsx         # Componente para controle de permissões
│
├── pages/
│   ├── Login.tsx                   # Tela de login
│   ├── Home.tsx                    # Página inicial
│   ├── Profile.tsx                 # Perfil do usuário
│   ├── Reports.tsx                 # Relatórios com gráficos
│   │
│   ├── cadastros/
│   │   ├── CadastroProduct.tsx     # Cadastro de produtos
│   │   ├── CadastroSupplier.tsx    # Cadastro de fornecedores
│   │   ├── CadastroSector.tsx      # Cadastro de setores
│   │   ├── CadastroUser.tsx        # Cadastro de usuários
│   │   └── EditDelete.tsx          # Edição e exclusão
│   │
│   └── insumos/
│       ├── List.tsx                # Lista de insumos
│       ├── RestockWithdraw.tsx     # Repor e retirar produtos
│       └── InventoryCount.tsx      # Contagem de estoque
│
├── routes.tsx                      # Configuração de rotas
└── App.tsx                         # Componente principal
```

## 🔄 Fluxo de Dados

### Autenticação
1. Usuário faz login em `/login`
2. `AuthContext` valida credenciais contra `localStorage`
3. Se válido, armazena `currentUser` no contexto
4. `ProtectedRoute` verifica autenticação em rotas protegidas
5. Ao fazer logout, limpa contexto e redireciona para login

### Permissões
- Cada usuário pertence a um Setor
- Cada Setor possui uma lista de Permissões
- Usuário Master tem acesso total (permissão 'all')
- Use `hasPermission()` do AuthContext para verificar permissões
- Use componente `PermissionGuard` para esconder elementos baseado em permissão

### Armazenamento (localStorage)
- `currentUser`: Usuário autenticado atualmente
- `users`: Array de todos os usuários
- `sectors`: Array de setores
- `products`: Array de produtos
- `categories`: Array de categorias
- `units`: Array de unidades de medida
- `suppliers`: Array de fornecedores
- `movements`: Array de movimentações de estoque
- `inventoryCounts`: Array de contagens de estoque

## 🎯 Tipos Principais

### User
```typescript
{
  id: number;
  fullName: string;
  username: string;
  password: string;
  email?: string;          // Apenas Master
  status: boolean;
  sectorId: number;
  isMaster: boolean;
}
```

### Product
```typescript
{
  id: number;
  code: string;
  name: string;
  categoryId: number;
  unitId: number;
  initialQuantity: number;
  currentQuantity: number;
  minStock: number;
  lowStockAlert: boolean;
  supplierId?: number;
  image?: string;
  createdAt: string;
}
```

### StockMovement
```typescript
{
  id: number;
  productId: number;
  type: 'restock' | 'withdraw';
  quantity: number;
  userId: number;
  sectorId: number;
  date: string;
  notes?: string;
}
```

## 🔐 Sistema de Permissões

Permissões disponíveis:
- `view_products`: Visualizar produtos
- `add_product`: Adicionar produtos
- `edit_product`: Editar produtos
- `delete_product`: Excluir produtos
- `restock`: Repor estoque
- `withdraw`: Retirar do estoque
- `view_reports`: Ver relatórios
- `manage_users`: Gerenciar usuários
- `manage_suppliers`: Gerenciar fornecedores
- `manage_sectors`: Gerenciar setores
- `manage_categories`: Gerenciar categorias
- `inventory_count`: Fazer contagem de estoque
- `all`: Acesso total (Master)

## 🚀 Funcionalidades Principais

### 1. Cadastro de Produtos
- Categorias dinâmicas (pode criar durante cadastro)
- Unidades de medida dinâmicas (pode criar durante cadastro)
- Upload de imagem (URL)
- Controle de estoque mínimo

### 2. Movimentação de Estoque
- Reposição e retirada com registro
- Rastreamento por usuário e setor
- Atualização automática de estoque

### 3. Contagem Física
- Comparação sistema vs físico
- Cálculo automático de diferenças
- Impressão de relatório

### 4. Relatórios
- Filtros por período e setor
- Gráficos interativos (Recharts)
- Análise de movimentações
- Exportação para impressão

## 📝 Notas de Implementação

### Para adicionar nova permissão:
1. Adicionar em `types/index.ts` no tipo `Permission`
2. Atualizar lista em `CadastroSector.tsx`
3. Usar `hasPermission()` onde necessário

### Para adicionar nova página:
1. Criar componente em `pages/`
2. Adicionar rota em `routes.tsx`
3. Adicionar link de navegação em `Layout.tsx`
4. Envolver com `PermissionGuard` se necessário

### Para migrar para backend real:
1. Substituir chamadas de `localStorage` por API calls
2. Implementar autenticação JWT
3. Criar endpoints REST ou GraphQL
4. Implementar sistema de cache
