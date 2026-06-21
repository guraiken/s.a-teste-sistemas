import { userRepository } from "../repositories/UserRepository.js"
import bcrypt from "bcrypt"
import { signTokenAcesso, signTokenRefresh } from "../utils/jwt-utils.js"

class UserService{
    constructor(repository){
        this.repository = repository
    }

    async logar(dadosUsuario) {
        const existeUsuario = await this.repository.existeUsuario(dadosUsuario.email || '')
        const credenciaisValidas = await bcrypt.compare(dadosUsuario.senha || "", existeUsuario?.senha || "")
        
        console.log(existeUsuario, credenciaisValidas, dadosUsuario)

        if (existeUsuario && credenciaisValidas) {
            const tokenAcesso = signTokenAcesso({
                email: existeUsuario.email,
                nome: existeUsuario.nome,
                cargo: existeUsuario.cargo
            })
            const tokenRefresh = signTokenRefresh({
                email: existeUsuario.email,
                nome: existeUsuario.nome,
                cargo: existeUsuario.cargo
            })

            const accessExpires = new Date()
            const accessExpiresUpdate = accessExpires.setHours(accessExpires.getHours() + 1)
            
            // acesso create
            await this.repository.criarToken({
                token: tokenAcesso,
                expiresAt: new Date(accessExpiresUpdate),
                type: 'ACCESS',
                usuarioId: existeUsuario.id
            })

            //refresh create
            const refreshExpires = new Date()
            const refreshExpiresUpdated = refreshExpires.setMonth(refreshExpires.getMonth() + 1)

            await this.repository.criarToken({
                token: tokenRefresh,
                expiresAt: new Date(refreshExpiresUpdated),
                type: 'REFRESH',
                usuarioId: existeUsuario.id
            })

            return {
                tokenAcesso,
                tokenRefresh,
                usuario: {
                    id: existeUsuario.id,
                    nome: existeUsuario.nome,
                    email: existeUsuario.email,
                    cargo: existeUsuario.cargo
                }
            }
        }

        throw new Error("Credenciais inválidas")
    }

    async getAll() {
        const users = await this.repository.getAll()

        if (users.length === 0) {
            throw new Error("Nenhum usuário foi encontrado")
        }

        return users
    }

    async getById(id){
        if (!id) throw new Error("ID não fornecido")

        const userExists = await this.repository.getById(id)

        if(!userExists) throw new Error("Não foi possível encontrar o usuário")

        return userExists
    }

    async create(userData) {
        if(!userData) throw new Error("Nenhum dado fornecido para o post")

        if(!userData.nome || !userData.email || !userData.senha || !userData.cargo){
            throw new Error("Por favor preencha todos os campos")
        }

        const hashedPassword = await bcrypt.hash(userData.senha, 10)

        const createUser = await this.repository.create({
            nome: userData.nome,
            email: userData.email,
            senha: hashedPassword,
            cargo: userData.cargo
        })

        return createUser
    }

    async edit(id, {nome, senha, cargo}){
        const userExists = await this.repository.getById(id)

        if(!userExists) throw new Error("O usuário não foi encontrado")

        const editedUser = await this.repository.put({nome, senha, cargo}, id)

        return editedUser
    }

    async delete(id){
        const userExists = await this.repository.getById(id)

        if(!userExists) throw new Error("O usuário não foi encontrado")

        const deletedUser = await this.repository.delete(id)

        return deletedUser
    }
}

export const userService = new UserService(userRepository)