class UserUtils {
    getAll() {
        return "SELECT * FROM usuarios"
    }
    getById() {
        return "SELECT * FROM usuarios WHERE id = $1"
    }
    existeUsuario() {
        return "SELECT * FROM usuarios WHERE email = $1"
    }
    create() {
        return "INSERT INTO usuarios (nome, email, senha, cargo) VALUES ($1, $2, $3, $4) RETURNING *"
    }
    criarToken() {
        return "INSERT INTO token (token, expiresAt, type, usuarioId) VALUES ($1, $2, $3, $4) RETURNING *"
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