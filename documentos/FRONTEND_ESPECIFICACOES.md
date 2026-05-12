# Frontend - Especificações e Recomendações

## 1. Stack Tecnológico Recomendado

```
Frontend:
  - React 18+ (biblioteca principal)
  - Vite (bundler e dev server)
  - React Router (navegação)
  - Tailwind CSS ou Material-UI (estilos)
  
State Management:
  - React Context API (para estado global simples)
  - OU Redux Toolkit (se crescer em complexidade)
  
HTTP Client:
  - Axios (ou Fetch API)
  
Validação:
  - React Hook Form (formulários)
  - Zod ou Yup (validação de schema)
  
Testes:
  - Vitest ou Jest (unit tests)
  - React Testing Library (component tests)
  - Cypress ou Playwright (E2E tests)
  
UI Components:
  - Shadcn/ui (componentes reutilizáveis)
  - Radix UI (acessibilidade)

Utilities:
  - Moment.js ou Date-fns (datas)
  - React Query (cache e sincronização)
```

---

## 2. Estrutura de Pastas Recomendada

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── ConfirmDialog.jsx
│   │   ├── usuarios/
│   │   │   ├── UsuariosList.jsx
│   │   │   ├── UsuarioForm.jsx
│   │   │   └── UsuarioCard.jsx
│   │   └── carros/
│   │       ├── CarrosList.jsx
│   │       ├── CarroForm.jsx
│   │       └── CarroCard.jsx
│   ├── pages/
│   │   ├── UsuariosPage.jsx
│   │   ├── CarrosPage.jsx
│   │   ├── HomePage.jsx
│   │   └── NotFoundPage.jsx
│   ├── services/
│   │   ├── api.js (configuração axios)
│   │   ├── usuariosService.js
│   │   └── carrosService.js
│   ├── hooks/
│   │   ├── useUsuarios.js
│   │   ├── useCarros.js
│   │   └── useFetch.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── NotificationContext.jsx
│   ├── utils/
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── constants.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tests/
│   ├── unit/
│   └── e2e/
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 3. Componentes Principais

### 3.1 Layout Base

**App.jsx**
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import UsuariosPage from './pages/UsuariosPage'
import CarrosPage from './pages/CarrosPage'
import HomePage from './pages/HomePage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/usuarios" element={<UsuariosPage />} />
            <Route path="/carros" element={<CarrosPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
```

### 3.2 Página de Usuários

**pages/UsuariosPage.jsx**
```jsx
import { useState, useEffect } from 'react'
import UsuariosList from '../components/usuarios/UsuariosList'
import UsuarioForm from '../components/usuarios/UsuarioForm'
import Modal from '../components/common/Modal'
import Loading from '../components/common/Loading'
import { useUsuarios } from '../hooks/useUsuarios'

export default function UsuariosPage() {
  const { usuarios, loading, error, create, update, delete: deleteUsuario, fetchAll } = useUsuarios()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  useEffect(() => {
    fetchAll()
  }, [])

  const usuariosFiltrados = usuarios

  const handleAddNew = () => {
    setEditingUser(null)
    setIsModalOpen(true)
  }

  const handleEdit = (usuario) => {
    setEditingUser(usuario)
    setIsModalOpen(true)
  }

  const handleSave = async (data) => {
    if (editingUser) {
      await update(editingUser.id, data)
    } else {
      await create(data)
    }
    setIsModalOpen(false)
    fetchAll()
  }

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      await deleteUsuario(id)
      fetchAll()
    }
  }

  if (loading) return <Loading />
  if (error) return <div className="error-message">{error}</div>

  return (
    <div className="usuarios-page">
      <div className="page-header">
        <h1>Gerenciamento de Usuários</h1>
        <button 
          className="btn btn-primary" 
          onClick={handleAddNew}
        >
          + Adicionar Usuário
        </button>
      </div>

      <UsuariosList 
        usuarios={usuariosFiltrados}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Editar Usuário' : 'Novo Usuário'}
      >
        <UsuarioForm 
          usuario={editingUser}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}
```

### 3.3 Componente de Listagem

**components/usuarios/UsuariosList.jsx**
```jsx
export default function UsuariosList({ usuarios, onEdit, onDelete }) {
  if (!usuarios || usuarios.length === 0) {
    return <div className="empty-state">Nenhum usuário cadastrado</div>
  }

  return (
    <div className="table-container">
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>
                <span className={`badge badge-${usuario.cargo.toLowerCase()}`}>
                  {usuario.cargo}
                </span>
              </td>
              <td className="actions">
                <button 
                  className="btn btn-sm btn-edit"
                  onClick={() => onEdit(usuario)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-sm btn-delete"
                  onClick={() => onDelete(usuario.id)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

### 3.4 Componente de Formulário

**components/usuarios/UsuarioForm.jsx**
```jsx
import { useState } from 'react'

export default function UsuarioForm({ usuario, onSave, onCancel }) {
  const [formData, setFormData] = useState(usuario || {
    nome: '',
    senha: '',
    cargo: 'VENDAS'
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    
    if (!formData.nome?.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    } else if (formData.nome.length > 100) {
      newErrors.nome = 'Nome deve ter no máximo 100 caracteres'
    }

    if (!formData.senha?.trim()) {
      newErrors.senha = 'Senha é obrigatória'
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter mínimo 6 caracteres'
    }

    if (!['VENDAS', 'ADMIN'].includes(formData.cargo)) {
      newErrors.cargo = 'Cargo inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSave(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="usuario-form">
      <div className="form-group">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className={errors.nome ? 'error' : ''}
          placeholder="Digite o nome"
        />
        {errors.nome && <span className="error-text">{errors.nome}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          className={errors.senha ? 'error' : ''}
          placeholder="Digite a senha"
        />
        {errors.senha && <span className="error-text">{errors.senha}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="cargo">Cargo</label>
        <select
          id="cargo"
          name="cargo"
          value={formData.cargo}
          onChange={handleChange}
        >
          <option value="VENDAS">VENDAS</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        {errors.cargo && <span className="error-text">{errors.cargo}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {usuario ? 'Atualizar' : 'Salvar'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  )
}
```

---

## 4. Serviços de API

**services/api.js**
```javascript
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptador para adicionar token se necessário
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Interceptador para tratar erros
api.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error)
    throw error.response?.data || error.message
  }
)

export default api
```

**services/usuariosService.js**
```javascript
import api from './api'

export const usuariosService = {
  async getAll() {
    return api.get('/usuarios')
  },

  async getById(id) {
    return api.get(`/usuarios/${id}`)
  },

  async create(usuario) {
    return api.post('/usuarios', usuario)
  },

  async update(id, usuario) {
    return api.put(`/usuarios/${id}`, usuario)
  },

  async delete(id) {
    return api.delete(`/usuarios/${id}`)
  }
}
```

---

## 5. Custom Hooks

**hooks/useUsuarios.js**
```javascript
import { useState } from 'react'
import { usuariosService } from '../services/usuariosService'

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAll = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await usuariosService.getAll()
      setUsuarios(response.data || [])
    } catch (err) {
      setError(err.message || 'Erro ao carregar usuários')
    } finally {
      setLoading(false)
    }
  }

  const create = async (data) => {
    try {
      await usuariosService.create(data)
    } catch (err) {
      setError(err.message || 'Erro ao criar usuário')
      throw err
    }
  }

  const update = async (id, data) => {
    try {
      await usuariosService.update(id, data)
    } catch (err) {
      setError(err.message || 'Erro ao atualizar usuário')
      throw err
    }
  }

  const delete: async (id) => {
    try {
      await usuariosService.delete(id)
    } catch (err) {
      setError(err.message || 'Erro ao deletar usuário')
      throw err
    }
  }

  return { usuarios, loading, error, fetchAll, create, update, delete: deleteUsuario }
}
```

---

## 6. Página de Carros

Seguir o mesmo padrão de usuários com adaptações:

**Diferenças principais:**
- Formatação: valores em moeda (R$)
- Campos adicionais: Modelo, Cor, Valor, Ano

## 7. Utilitários

**utils/formatters.js**
```javascript
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}
```

**utils/validators.js**
```javascript
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validateCPF = (cpf) => {
  // Implementar validação real de CPF se necessário
  return cpf?.length === 11
}

export const validateCargo = (cargo) => {
  return ['VENDAS', 'ADMIN'].includes(cargo)
}
```

---

## 8. Estilos CSS

**styles/globals.css**
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #007bff;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
  --light-color: #f8f9fa;
  --dark-color: #343a40;
  
  --border-radius: 8px;
  --transition: all 0.3s ease;
}

html, body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  color: var(--dark-color);
}

/* Botões */
.btn {
  padding: 10px 16px;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 14px;
  transition: var(--transition);
  font-weight: 500;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-delete {
  background-color: var(--danger-color);
  color: white;
}

.btn-delete:hover {
  background-color: #c82333;
}

.btn-secondary {
  background-color: var(--light-color);
  color: var(--dark-color);
  border: 1px solid #ddd;
}

/* Tabelas */
.table-container {
  background: white;
  border-radius: var(--border-radius);
  overflow-x: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background-color: var(--light-color);
  padding: 16px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #ddd;
}

tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}

tbody tr:hover {
  background-color: #f9f9f9;
}

/* Formulários */
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--dark-color);
}

input, select, textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 14px;
  transition: var(--transition);
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

input.error {
  border-color: var(--danger-color);
}

.error-text {
  color: var(--danger-color);
  font-size: 12px;
  margin-top: 4px;
  display: block;
}

/* Badges */
.badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.badge-vendas {
  background-color: #e7f3ff;
  color: var(--primary-color);
}

.badge-admin {
  background-color: #fff3cd;
  color: #856404;
}

/* Loading */
.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: var(--primary-color);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

/* Error */
.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 12px 16px;
  border-radius: var(--border-radius);
  margin-bottom: 20px;
  border-left: 4px solid var(--danger-color);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: var(--border-radius);
  padding: 30px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
}

.modal-header {
  margin-bottom: 20px;
}

.modal-header h2 {
  margin: 0;
}

/* Responsivo */
@media (max-width: 768px) {
  .btn {
    padding: 8px 12px;
    font-size: 12px;
  }

  table {
    font-size: 12px;
  }

  thead th, tbody td {
    padding: 8px;
  }

  .modal-content {
    padding: 20px;
    max-width: 90%;
  }
}
```

---

## 9. Variáveis de Ambiente

**.env.example**
```
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Sistema de Gestão de Carros
```

---

## 10. Package.json

```json
{
  "name": "carros-frontend",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "lint": "eslint src",
    "format": "prettier --write src"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.0",
    "axios": "^1.4.0",
    "react-hook-form": "^7.45.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.4.0",
    "vitest": "^0.34.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "prettier": "^3.0.0",
    "eslint": "^8.46.0"
  }
}
```

---

## 11. Testes

**tests/unit/UsuarioForm.test.jsx**
```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import UsuarioForm from '../../components/usuarios/UsuarioForm'

describe('UsuarioForm', () => {
  const mockOnSave = vi.fn()
  const mockOnCancel = vi.fn()

  it('deve renderizar o formulário', () => {
    render(
      <UsuarioForm 
        usuario={null}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    )
    
    expect(screen.getByLabelText('Nome')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInTheDocument()
    expect(screen.getByLabelText('Cargo')).toBeInTheDocument()
  })

  it('deve mostrar erro se Nome estiver vazio', async () => {
    render(
      <UsuarioForm 
        usuario={null}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    )
    
    const submitBtn = screen.getByText('Salvar')
    fireEvent.click(submitBtn)
    
    expect(await screen.findByText('Nome é obrigatório')).toBeInTheDocument()
  })

  it('deve chamar onSave com dados válidos', async () => {
    render(
      <UsuarioForm 
        usuario={null}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    )
    
    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'João' } })
    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: '123456' } })
    fireEvent.click(screen.getByText('Salvar'))
    
    expect(mockOnSave).toHaveBeenCalledWith(
      expect.objectContaining({
        nome: 'João',
        senha: '123456'
      })
    )
  })
})
```

---

## 12. Checklist de Desenvolvimento Frontend

### Fase 1: Setup
- [ ] Criar projeto com Vite
- [ ] Configurar React Router
- [ ] Configurar Tailwind CSS ou Material-UI
- [ ] Configurar Axios com interceptadores
- [ ] Configurar variáveis de ambiente

### Fase 2: Componentes Base
- [ ] Header/Navbar
- [ ] Footer
- [ ] Modal genérico
- [ ] Loading component
- [ ] Error boundary

### Fase 3: Usuários
- [ ] Página de listagem
- [ ] Componente de tabela
- [ ] Componente de filtro
- [ ] Modal de criar/editar
- [ ] Confirmação de delete

### Fase 4: Carros
- [ ] Página de listagem
- [ ] Componente de tabela com formatação de moeda
- [ ] Componente de filtro (modelo + preço)
- [ ] Modal de criar/editar
- [ ] Confirmação de delete

### Fase 5: Funcionalidades
- [ ] Context de notificações/toasts
- [ ] Context de autenticação (preparado)
- [ ] Custom hooks para data fetching
- [ ] Tratamento de erros
- [ ] Validações de formulário

### Fase 6: Testes
- [ ] Testes unitários dos componentes
- [ ] Testes de integração
- [ ] Testes E2E com Cypress/Playwright

### Fase 7: Otimização
- [ ] Lazy loading de componentes
- [ ] Otimização de images
- [ ] Cache com React Query
- [ ] SEO base

### Fase 8: Deployment
- [ ] Build otimizado
- [ ] Deploy em produção (Vercel, Netlify, etc)
- [ ] Monitoramento

---

## 13. Recomendações Finais

1. **Usar TypeScript**: Considere adicionar TypeScript para melhor type safety
2. **Storybook**: Use para documentar componentes
3. **Prettier + ESLint**: Mantenha código consistente
4. **Git Hooks**: Configure Husky para executar linters antes de commit
5. **CI/CD**: Configure GitHub Actions para testes automáticos
6. **Documentação**: Mantenha README atualizado com instruções de setup

