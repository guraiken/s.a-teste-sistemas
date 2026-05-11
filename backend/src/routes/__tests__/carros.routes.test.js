import { carrosRoute } from '../carros.js'
import { carrosService } from '../../services/carros.js'

jest.mock('../../services/carros.js')

describe('Carros Routes', () => {
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

  describe('GET /carros', () => {
    test('TC-C-001: Deve retornar 200 com lista de carros', async () => {
      const carrosMock = [
        { id: 1, modelo: 'Honda Civic', cor: 'Preto', valor: 85000.00, ano: 2023 },
        { id: 2, modelo: 'Toyota Corolla', cor: 'Branco', valor: 75000.00, ano: 2022 }
      ]
      carrosService.getAll.mockResolvedValue(carrosMock)

      const handler = carrosRoute.stack.find(r => r.route && r.route.path === '/' && r.methods.get).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(carrosMock)
    })

    test('TC-C-002: Deve retornar 404 quando não há carros', async () => {
      carrosService.getAll.mockResolvedValue([])

      const handler = carrosRoute.stack.find(r => r.route && r.route.path === '/' && r.methods.get).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
    })
  })

  describe('GET /carros/:id', () => {
    test('TC-C-003: Deve retornar 200 com dados do carro', async () => {
      const carroMock = { id: 1, modelo: 'Honda Civic', cor: 'Preto', valor: 85000.00, ano: 2023 }
      req.params.id = 1
      carrosService.getByID.mockResolvedValue([carroMock])

      const handler = carrosRoute.stack.find(r => r.route && r.route.path === '/:id' && r.methods.get).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        data: carroMock,
        message: expect.stringContaining('sucesso')
      })
    })

    test('TC-C-004: Deve retornar 404 quando carro não existe', async () => {
      req.params.id = 9999
      carrosService.getByID.mockResolvedValue([])

      const handler = carrosRoute.stack.find(r => r.route && r.route.path === '/:id' && r.methods.get).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
    })
  })

  describe('POST /carros', () => {
    test('TC-C-005: Deve retornar 201 ao criar carro com dados válidos', async () => {
      const novoCarro = { modelo: 'Honda Civic', cor: 'Preto', valor: 85000.00, ano: 2023 }
      const carroCriado = { id: 1, ...novoCarro }
      req.body = novoCarro
      carrosService.create.mockResolvedValue(carroCriado)

      const handler = carrosRoute.stack.find(r => r.route && r.route.path === '/' && r.methods.post).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        data: carroCriado,
        message: expect.stringContaining('sucesso')
      })
    })

    test('TC-C-006: Deve permitir criar carro com valor negativo (sem validação)', async () => {
      const carroNegativo = { modelo: 'Toyota', cor: 'Azul', valor: -50000, ano: 2022 }
      const carroCriado = { id: 1, ...carroNegativo }
      req.body = carroNegativo
      carrosService.create.mockResolvedValue(carroCriado)

      const handler = carrosRoute.stack.find(r => r.route && r.route.path === '/' && r.methods.post).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
    })

    test('TC-C-007: Deve retornar erro ao criar carro sem campo obrigatório', async () => {
      const carroIncompleto = { modelo: 'BMW', cor: 'Vermelho' }
      req.body = carroIncompleto
      carrosService.create.mockRejectedValue(new Error('null value'))

      const handler = carrosRoute.stack.find(r => r.route && r.route.path === '/' && r.methods.post).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
    })
  })

  describe('PUT /carros/:id', () => {
    test('TC-C-008: Deve retornar 200 ao atualizar carro', async () => {
      const dadosAtualizacao = { modelo: 'Honda Civic 2024', cor: 'Branco', valor: 95000.00, ano: 2024 }
      const carroAtualizado = { id: 1, ...dadosAtualizacao }
      req.params.id = 1
      req.body = dadosAtualizacao
      carrosService.put.mockResolvedValue(carroAtualizado)

      const handler = carrosRoute.stack.find(r => r.route && r.route.path === '/:id' && r.methods.put).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        data: carroAtualizado,
        message: expect.stringContaining('atualizado')
      })
    })

    test('TC-C-009: Deve retornar 400 quando faltam campos', async () => {
      const dadosIncompletos = { modelo: 'Honda' }
      req.params.id = 1
      req.body = dadosIncompletos

      const handler = carrosRoute.stack.find(r => r.route && r.route.path === '/:id' && r.methods.put).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
    })
  })

  describe('DELETE /carros/:id', () => {
    test('TC-C-010: Deve retornar 200 ao deletar carro', async () => {
      const carroDeletado = { id: 1, modelo: 'Honda Civic', cor: 'Preto', valor: 85000.00, ano: 2023 }
      req.params.id = 1
      carrosService.delete.mockResolvedValue([carroDeletado])

      const handler = carrosRoute.stack.find(r => r.route && r.route.path === '/:id' && r.methods.delete).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalled()
    })

    test('TC-C-011: Deve retornar 404 ao deletar carro inexistente', async () => {
      req.params.id = 9999
      carrosService.delete.mockResolvedValue([])

      const handler = carrosRoute.stack.find(r => r.route && r.route.path === '/:id' && r.methods.delete).handle

      await handler(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
    })
  })
})
