import { userRepository } from "../repositories/UserRepository.js"

class UserService{
    constructor(repository){
        this.repository = repository
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

        if(!userExists || userExists.length === 0) throw new Error("Não foi possível encontrar o usuário")

        return userExists
    }

    async create(userData) {
        if(!userData) throw new Error("Nenhum dado fornecido para o post")

        if(!userData.nome || !userData.senha || !userData.cargo){
            throw new Error("Por favor preencha todos os campos")
        }

        const createUser = await this.repository.create({
            nome: userData.nome,
            senha: userData.senha,
            cargo: userData.cargo
        })

        return createUser
    }

    async edit(id, {nome, senha, cargo}){
        const userExists = await this.repository.getById(id)

        if(!userExists || userExists.length === 0) throw new Error("O usuário não foi encontrado")

        const editedUser = await this.repository.put({nome, senha, cargo}, id)

        return editedUser
    }

    async delete(id){
        const userExists = await this.repository.getById(id)

        if(!userExists || userExists.length === 0) throw new Error("O usuário não foi encontrado")

        const deletedUser = await this.repository.delete(id)

        return deletedUser
    }
}

export const userService = new UserService(userRepository)