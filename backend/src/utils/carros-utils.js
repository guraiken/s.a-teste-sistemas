
class CarUtils {

    getAll() {
        return "SELECT * FROM carros"
    }
    getById() {
        return "SELECT * FROM carros WHERE id = $1"
    }
    create() {
        return "INSERT INTO carros (modelo, cor, valor, ano) VALUES ($1, $2, $3, $4) RETURNING *"
    }
    delete() {
        return "DELETE FROM carros WHERE id = $1 RETURNING *"
    }
    edit() {
        return `UPDATE carros 
             SET modelo = $1, cor = $2, valor = $3, ano = $4 
             WHERE id = $5 
             RETURNING *`  
    }
}

export const carUtils = new CarUtils()