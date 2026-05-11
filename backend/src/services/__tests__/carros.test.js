import { carrosService } from '../carros.js'

// Mock do pool de banco de dados
jest.mock('../../config/db.js', () => ({
  query: jest.fn()
}))

import pool from '../../config/db.js'

describe('CarrosService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // TC-C-001: Listar todos os carros com sucesso
  describe('getAll', () => {
    test('TC-C-001: Deve retornar array de carros quando existem', async () => {
      const carrosMock = [
        { id: 1, modelo: 'Honda Civic', cor: 'Preto', valor: 85000.00, ano: 2023 },
        { id: 2, modelo: 'Toyota Corolla', cor: 'Branco', valor: 75000.00, ano: 2022 }
      ]

      pool.query.mockResolvedValueOnce({
        rows: carrosMock,
        rowCount: 2
      })

      const resultado = await carrosService.getAll()
      
      expect(resultado).toEqual(carrosMock)
      expect(resultado.length).toBe(2)
      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM carros')
    })

    // TC-C-002: Listar carros quando não há nenhum
    test('TC-C-002: Deve retornar array vazio quando não há carros', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })

      const resultado = await carrosService.getAll()
      
      expect(resultado).toEqual([])
      expect(resultado.length).toBe(0)
    })
  })

  // TC-C-003: Buscar carro por ID existente
  describe('getByID', () => {
    test('TC-C-003: Deve retornar carro quando ID existe', async () => {
      const carroMock = { id: 1, modelo: 'Honda Civic', cor: 'Preto', valor: 85000.00, ano: 2023 }

      pool.query.mockResolvedValueOnce({
        rows: [carroMock],
        rowCount: 1
      })

      const resultado = await carrosService.getByID(1)
      
      expect(resultado[0]).toEqual(carroMock)
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM carros WHERE id = $1',
        [1]
      )
    })

    // TC-C-004: Buscar carro por ID inexistente
    test('TC-C-004: Deve retornar array vazio quando ID não existe', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })

      const resultado = await carrosService.getByID(9999)
      
      expect(resultado).toEqual([])
    })
  })

  // TC-C-005: Criar carro com dados válidos
  describe('create', () => {
    test('TC-C-005: Deve criar carro com dados válidos', async () => {
      const novoCarro = { modelo: 'Honda Civic', cor: 'Preto', valor: 85000.00, ano: 2023 }
      const carroCriado = { id: 1, ...novoCarro }

      pool.query.mockResolvedValueOnce({
        rows: [carroCriado],
        rowCount: 1
      })

      const resultado = await carrosService.create(novoCarro)
      
      expect(resultado).toEqual(carroCriado)
      expect(resultado.id).toBe(1)
      expect(resultado.modelo).toBe('Honda Civic')
      expect(resultado.valor).toBe(85000.00)
      expect(resultado.ano).toBe(2023)
      expect(pool.query).toHaveBeenCalledWith(
        'INSERT INTO carros (modelo, cor, valor, ano) VALUES ($1, $2, $3, $4) RETURNING *',
        ['Honda Civic', 'Preto', 85000.00, 2023]
      )
    })

    // TC-C-006: Criar carro com valor negativo
    test('TC-C-006: Deve criar carro com valor negativo (atualmente sem validação)', async () => {
      const carroNegativo = { modelo: 'Toyota', cor: 'Azul', valor: -50000, ano: 2022 }
      const carroCriado = { id: 1, ...carroNegativo }

      pool.query.mockResolvedValueOnce({
        rows: [carroCriado],
        rowCount: 1
      })

      const resultado = await carrosService.create(carroNegativo)
      
      expect(resultado.valor).toBe(-50000)
      expect(pool.query).toHaveBeenCalled()
    })

    // TC-C-007: Criar carro sem campo obrigatório
    test('TC-C-007: Deve lançar erro ao criar carro sem campo obrigatório', async () => {
      const carroIncompleto = { modelo: 'BMW', cor: 'Vermelho' }

      pool.query.mockRejectedValueOnce(
        new Error('null value in column "valor"')
      )

      await expect(
        carrosService.create(carroIncompleto)
      ).rejects.toThrow()
    })
  })

  // TC-C-008: Atualizar carro existente
  describe('put', () => {
    test('TC-C-008: Deve atualizar carro com dados válidos', async () => {
      const dadosAtualizacao = { modelo: 'Honda Civic 2024', cor: 'Branco', valor: 95000.00, ano: 2024 }
      const carroAtualizado = { id: 1, ...dadosAtualizacao }

      pool.query.mockResolvedValueOnce({
        rows: [carroAtualizado],
        rowCount: 1
      })

      const resultado = await carrosService.put(dadosAtualizacao, 1)
      
      expect(resultado).toEqual(carroAtualizado)
      expect(resultado.modelo).toBe('Honda Civic 2024')
      expect(resultado.valor).toBe(95000.00)
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE carros'),
        ['Honda Civic 2024', 'Branco', 95000.00, 2024, 1]
      )
    })

    // TC-C-009: Atualizar carro sem preencher todos os campos
    test('TC-C-009: Deve retornar array vazio quando carro não existe', async () => {
      const dadosAtualizacao = { modelo: 'Honda', cor: 'Preto', valor: 80000, ano: 2023 }

      pool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })

      const resultado = await carrosService.put(dadosAtualizacao, 9999)
      
      expect(resultado).toEqual([])
    })
  })

  // TC-C-010: Deletar carro existente
  describe('delete', () => {
    test('TC-C-010: Deve deletar carro existente', async () => {
      const carroDeletado = { id: 1, modelo: 'Honda Civic', cor: 'Preto', valor: 85000.00, ano: 2023 }

      pool.query.mockResolvedValueOnce({
        rows: [carroDeletado],
        rowCount: 1
      })

      const resultado = await carrosService.delete(1)
      
      expect(resultado[0]).toEqual(carroDeletado)
      expect(pool.query).toHaveBeenCalledWith(
        'DELETE FROM carros WHERE id = $1 RETURNING *',
        [1]
      )
    })

    // TC-C-011: Deletar carro inexistente
    test('TC-C-011: Deve retornar array vazio ao deletar carro inexistente', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })

      const resultado = await carrosService.delete(9999)
      
      expect(resultado).toEqual([])
    })
  })
})
