# Sistema de Gestão de Estoque para Lanchonetes

Sistema completo de controle de estoque desenvolvido para lanchonetes, com controle de acesso baseado em permissões.

## 🚀 Funcionalidades

### Autenticação e Controle de Acesso
- **Usuário Master**: Acesso total ao sistema, pode cadastrar novos usuários
- **Usuários por Setor**: Permissões customizadas baseadas no setor
- Login seguro com validação de credenciais

### Tela Home
- Perfil do usuário
- Alertas de estoque mínimo
- Botões de acesso rápido para repor/retirar produtos

### Cadastros
1. **Produtos**
   - Código interno
   - Nome do produto
   - Categoria (com opção de criar novas)
   - Unidade de medida (com opção de criar novas)
   - Quantidade inicial
   - Estoque mínimo
   - Fornecedor
   - Imagem do produto
   - Ativação de aviso de estoque baixo

2. **Fornecedores**
   - Nome, contato, telefone, email e endereço

3. **Setores**
   - Nome do setor
   - Permissões configuráveis

4. **Usuários**
   - Nome completo
   - Nome de usuário
   - Status (ativo/inativo)
   - Vinculação com setor
   - Senha (máx 8 caracteres)

5. **Editar/Excluir**
   - Gerenciamento de todos os cadastros

### Insumos/Estoque
1. **Lista**
   - Visualização completa de produtos, usuários e fornecedores
   
2. **Repor/Retirar**
   - Pesquisa por nome ou código
   - Movimentação de estoque com registro
   
3. **Contagem**
   - Comparação sistema vs físico
   - Cálculo automático de diferenças
   - Opção de impressão

### Relatórios
- Filtro por período e setor
- Gráficos de movimentação
- Análise por setor
- Top produtos movimentados
- Opção de impressão

## 🔐 Credenciais de Teste

**Master:**
- Usuário: `master`
- Senha: `master123`

**Cozinha:**
- Usuário: `maria`
- Senha: `12345678`

## 💾 Armazenamento

O sistema utiliza localStorage para persistência de dados. Para produção, considere integrar com um backend real.

## 🛠️ Tecnologias

- React 18
- TypeScript
- React Router DOM 7
- Recharts (gráficos)
- Lucide React (ícones)
- Tailwind CSS

## 📋 Observações

- Apenas o usuário Master possui email para recuperação de senha
- Usuários comuns têm limite de 8 caracteres na senha
- As permissões são herdadas do setor ao qual o usuário pertence
- O sistema registra todas as movimentações de estoque com data, usuário e setor
