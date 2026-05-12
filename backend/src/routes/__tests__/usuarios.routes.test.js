import { usuariosRoute } from '../usuarios.js'
import { usuariosServices } from '../../services/usuarios.js'

jest.mock('../../services/usuarios.js')

describe('Usuários Routes', () => {
  let req, res, next

  beforeEach(() => {
    req = {
      params: {},
      body: {}
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
    next = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /usuarios', () => {
    test('TC-U-001: Deve retornar 200 com lista de usuários', async () => {
      const usuariosMock = [
        { id: 1, nome: 'João', senha: 'senha123', cargo: 'VENDAS' },
        { id: 2, nome: 'Maria', senha: 'senha456', cargo: 'ADMIN' }
      ]
      usuariosServices.getAll.mockResolvedValue(usuariosMock)

      // Simular a chamada da rota
      const handler = usuariosRoute.stack.find(r => r.route && r.route.path === '/' && r.methods.get).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(usuariosMock)
    })

    test('TC-U-002: Deve retornar 404 quando não há usuários', async () => {
      usuariosServices.getAll.mockResolvedValue([])

      const handler = usuariosRoute.stack.find(r => r.route && r.route.path === '/' && r.methods.get).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalled()
    })
  })

  describe('GET /usuarios/:id', () => {
    test('TC-U-003: Deve retornar 200 com dados do usuário', async () => {
      const usuarioMock = { id: 1, nome: 'João', senha: 'senha123', cargo: 'VENDAS' }
      req.params.id = 1
      usuariosServices.getByID.mockResolvedValue([usuarioMock])

      const handler = usuariosRoute.stack.find(r => r.route && r.route.path === '/:id' && r.methods.get).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        data: usuarioMock,
        message: expect.stringContaining('sucesso')
      })
    })

    test('TC-U-004: Deve retornar 404 quando usuário não existe', async () => {
      req.params.id = 9999
      usuariosServices.getByID.mockResolvedValue([])

      const handler = usuariosRoute.stack.find(r => r.route && r.route.path === '/:id' && r.methods.get).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
    })
  })

  describe('POST /usuarios', () => {
    test('TC-U-005: Deve retornar 201 ao criar usuário com dados válidos', async () => {
      const novoUsuario = { nome: 'João Silva', senha: 'senha123', cargo: 'VENDAS' }
      const usuarioCriado = { id: 1, ...novoUsuario }
      req.body = novoUsuario
      usuariosServices.create.mockResolvedValue(usuarioCriado)

      const handler = usuariosRoute.stack.find(r => r.route && r.route.path === '/' && r.methods.post).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        data: usuarioCriado,
        message: expect.stringContaining('sucesso')
      })
    })

    test('TC-U-006: Deve retornar erro ao criar usuário com cargo inválido', async () => {
      const usuarioInvalido = { nome: 'Maria', senha: 'pass456', cargo: 'GERENTE' }
      req.body = usuarioInvalido
      usuariosServices.create.mockRejectedValue(new Error('Erro de constraint'))

      const handler = usuariosRoute.stack.find(r => r.route && r.route.path === '/' && r.methods.post).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
    })
  })

  describe('PUT /usuarios/:id', () => {
    test('TC-U-008: Deve retornar 200 ao atualizar usuário', async () => {
      const dadosAtualizacao = { nome: 'João Atualizado', senha: 'novaSenha123', cargo: 'ADMIN' }
      const usuarioAtualizado = { id: 1, ...dadosAtualizacao }
      req.params.id = 1
      req.body = dadosAtualizacao
      usuariosServices.put.mockResolvedValue(usuarioAtualizado)

      const handler = usuariosRoute.stack.find(r => r.route && r.route.path === '/:id' && r.methods.put).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        data: usuarioAtualizado,
        message: expect.stringContaining('atualizado')
      })
    })

    test('TC-U-009: Deve retornar 400 quando faltam campos', async () => {
      const dadosIncompletos = { nome: 'João' }
      req.params.id = 1
      req.body = dadosIncompletos

      const handler = usuariosRoute.stack.find(r => r.route && r.route.path === '/:id' && r.methods.put).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
    })
  })

  describe('DELETE /usuarios/:id', () => {
    test('TC-U-010: Deve retornar 200 ao deletar usuário', async () => {
      const usuarioDeletado = { id: 1, nome: 'João', senha: 'senha123', cargo: 'VENDAS' }
      req.params.id = 1
      usuariosServices.delete.mockResolvedValue([usuarioDeletado])

      const handler = usuariosRoute.stack.find(r => r.route && r.route.path === '/:id' && r.methods.delete).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalled()
    })

    test('TC-U-011: Deve retornar 404 ao deletar usuário inexistente', async () => {
      req.params.id = 9999
      usuariosServices.delete.mockResolvedValue([])

      const handler = usuariosRoute.stack.find(r => r.route && r.route.path === '/:id' && r.methods.delete).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
    })
  })
})
