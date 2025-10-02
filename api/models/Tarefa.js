const { v4: uuidv4 } = require('uuid');

/**
 * Classe que representa o modelo de dados de uma Tarefa.
 */
class Tarefa {
  /**
   * Construtor da classe Tarefa.
   * @param {string} descricao - A descrição da tarefa.
   * @param {boolean} [concluida=false] - O status da tarefa (opcional, padrão é false).
   */
  constructor(descricao, concluida = false) {
    // Gera um ID único universal (UUID) para a tarefa.
    this.objectId = uuidv4();
    this.descricao = descricao;
    this.concluida = concluida;
  }
}

module.exports = Tarefa;
