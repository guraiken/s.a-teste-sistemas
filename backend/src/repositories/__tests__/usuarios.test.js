import { usuariosServices } from '../services/usuarios.js'

// Mock do pool de banco de dados
jest.mock('../config/db.js', () => ({
  query: jest.fn()
}))

import pool from '../config/db.js'

describe('UsuariosServices', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // TC-U-001: Listar todos os usuários com sucesso
  describe('getAll', () => {
    test('TC-U-001: Deve retornar array de usuários quando existem', async () => {
      const usuariosMock = [
        { id: 1, nome: 'João', senha: 'senha123', cargo: 'VENDAS' },
        { id: 2, nome: 'Maria', senha: 'senha456', cargo: 'ADMIN' }
      ]

      pool.query.mockResolvedValueOnce({
        rows: usuariosMock,
        rowCount: 2
      })

      const resultado = await usuariosServices.getAll()
      
      expect(resultado).toEqual(usuariosMock)
      expect(resultado.length).toBe(2)
      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM usuarios')
    })

    // TC-U-002: Listar usuários quando não há nenhum
    test('TC-U-002: Deve retornar array vazio quando não há usuários', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })

      const resultado = await usuariosServices.getAll()
      
      expect(resultado).toEqual([])
      expect(resultado.length).toBe(0)
    })
  })

  // TC-U-003: Buscar usuário por ID existente
  describe('getByID', () => {
    test('TC-U-003: Deve retornar usuário quando ID existe', async () => {
      const usuarioMock = { id: 1, nome: 'João', senha: 'senha123', cargo: 'VENDAS' }

      pool.query.mockResolvedValueOnce({
        rows: [usuarioMock],
        rowCount: 1
      })

      const resultado = await usuariosServices.getByID(1)
      
      expect(resultado[0]).toEqual(usuarioMock)
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM usuarios WHERE id = $1',
        [1]
      )
    })

    // TC-U-004: Buscar usuário por ID inexistente
    test('TC-U-004: Deve retornar array vazio quando ID não existe', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })

      const resultado = await usuariosServices.getByID(9999)
      
      expect(resultado).toEqual([])
    })
  })

  // TC-U-005: Criar usuário com dados válidos
  describe('create', () => {
    test('TC-U-005: Deve criar usuário com dados válidos', async () => {
      const novoUsuario = { nome: 'João Silva', senha: 'senha123', cargo: 'VENDAS' }
      const usuarioCriado = { id: 1, ...novoUsuario }

      pool.query.mockResolvedValueOnce({
        rows: [usuarioCriado],
        rowCount: 1
      })

      const resultado = await usuariosServices.create(novoUsuario)
      
      expect(resultado).toEqual(usuarioCriado)
      expect(resultado.id).toBe(1)
      expect(resultado.nome).toBe('João Silva')
      expect(resultado.cargo).toBe('VENDAS')
      expect(pool.query).toHaveBeenCalledWith(
        'INSERT INTO usuarios (nome, senha, cargo) VALUES ($1, $2, $3) RETURNING *',
        ['João Silva', 'senha123', 'VENDAS']
      )
    })

    // TC-U-006: Criar usuário com cargo inválido
    test('TC-U-006: Deve lançar erro ao criar usuário com cargo inválido', async () => {
      const usuarioInvalido = { nome: 'Maria', senha: 'pass456', cargo: 'GERENTE' }

      pool.query.mockRejectedValueOnce(
        new Error('violates check constraint "usuarios_cargo_check"')
      )

      await expect(
        usuariosServices.create(usuarioInvalido)
      ).rejects.toThrow()
    })

    // TC-U-007: Criar usuário sem campo obrigatório
    test('TC-U-007: Deve lançar erro ao criar usuário sem campo obrigatório', async () => {
      const usuarioIncompleto = { nome: 'Ana', cargo: 'ADMIN' }

      pool.query.mockRejectedValueOnce(
        new Error('null value in column "senha"')
      )

      await expect(
        usuariosServices.create(usuarioIncompleto)
      ).rejects.toThrow()
    })
  })

  // TC-U-008: Atualizar usuário existente
  describe('put', () => {
    test('TC-U-008: Deve atualizar usuário com dados válidos', async () => {
      const dadosAtualizacao = { nome: 'João Silva Atualizado', senha: 'novaSenha123', cargo: 'ADMIN' }
      const usuarioAtualizado = { id: 1, ...dadosAtualizacao }

      pool.query.mockResolvedValueOnce({
        rows: [usuarioAtualizado],
        rowCount: 1
      })

      const resultado = await usuariosServices.put(dadosAtualizacao, 1)
      
      expect(resultado).toEqual(usuarioAtualizado)
      expect(resultado.nome).toBe('João Silva Atualizado')
      expect(resultado.cargo).toBe('ADMIN')
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE usuarios'),
        ['João Silva Atualizado', 'novaSenha123', 'ADMIN', 1]
      )
    })

    // TC-U-009: Atualizar usuário sem preencher todos os campos
    test('TC-U-009: Deve lançar erro ao tentar atualizar sem todos os campos', async () => {
      const dadosIncompletos = { nome: 'João' }

      const resultado = await usuariosServices.put(dadosIncompletos, 1)
      
      expect(pool.query).toHaveBeenCalled()
    })

    test('TC-U-009: Deve retornar array vazio quando usuário não existe', async () => {
      const dadosAtualizacao = { nome: 'João', senha: 'senha123', cargo: 'VENDAS' }

      pool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })

      const resultado = await usuariosServices.put(dadosAtualizacao, 9999)
      
      expect(resultado).toEqual([])
    })
  })

  // TC-U-010: Deletar usuário existente
  describe('delete', () => {
    test('TC-U-010: Deve deletar usuário existente', async () => {
      const usuarioDeletado = { id: 1, nome: 'João', senha: 'senha123', cargo: 'VENDAS' }

      pool.query.mockResolvedValueOnce({
        rows: [usuarioDeletado],
        rowCount: 1
      })

      const resultado = await usuariosServices.delete(1)
      
      expect(resultado[0]).toEqual(usuarioDeletado)
      expect(pool.query).toHaveBeenCalledWith(
        'DELETE FROM usuarios WHERE id = $1 RETURNING *',
        [1]
      )
    })

    // TC-U-011: Deletar usuário inexistente
    test('TC-U-011: Deve retornar array vazio ao deletar usuário inexistente', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0
      })

      const resultado = await usuariosServices.delete(9999)
      
      expect(resultado).toEqual([])
    })
  })
})
