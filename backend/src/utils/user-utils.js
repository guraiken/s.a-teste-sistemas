class UserUtils {
    getAll() {
        return "SELECT * FROM usuarios"
    }
    getById() {
        return "SELECT * FROM usuarios WHERE id = $1"
    }
    create() {
        return "INSERT INTO usuarios (nome, senha, cargo) VALUES ($1, $2, $3) RETURNING *"
    }
    delete() {
        return "DELETE FROM usuarios WHERE id = $1 RETURNING *"
    }
    edit() {
        return `UPDATE usuarios 
             SET nome = $1, senha = $2, cargo = $3 
             WHERE id = $4
             RETURNING *`
    }
}

export const userUtils = new UserUtils()