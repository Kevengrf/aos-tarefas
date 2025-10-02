const Tarefa = require('../models/Tarefa');

// Array para armazenar as tarefas em memória, atuando como nosso "banco de dados".
let tarefas = [];

/**
 * Cria uma nova tarefa e a adiciona à lista.
 */
exports.criarTarefa = (req, res) => {
  const { descricao, concluida } = req.body;

  // Validação simples: verifica se a descrição foi fornecida.
  if (!descricao) {
    return res.status(400).json({ message: 'A descrição é obrigatória.' });
  }

  // Cria uma nova instância da classe Tarefa.
  const novaTarefa = new Tarefa(descricao, concluida);
  
  // Adiciona a nova tarefa ao array.
  tarefas.push(novaTarefa);
  
  // Retorna a tarefa recém-criada com o status 201 (Created).
  res.status(201).json(novaTarefa);
};

/**
 * Lista todas as tarefas existentes.
 */
exports.listarTarefas = (req, res) => {
  // Retorna a lista completa de tarefas.
  res.status(200).json(tarefas);
};

/**
 * Busca e retorna uma tarefa específica pelo seu objectId.
 */
exports.obterTarefa = (req, res) => {
  const { objectId } = req.params;
  
  // Procura a tarefa no array pelo objectId.
  const tarefa = tarefas.find(t => t.objectId === objectId);

  // Se a tarefa não for encontrada, retorna 404 (Not Found).
  if (!tarefa) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }

  // Retorna a tarefa encontrada.
  res.status(200).json(tarefa);
};

/**
 * Atualiza uma tarefa existente.
 */
exports.atualizarTarefa = (req, res) => {
  const { objectId } = req.params;
  const { descricao, concluida } = req.body;

  // Encontra o índice da tarefa a ser atualizada.
  const tarefaIndex = tarefas.findIndex(t => t.objectId === objectId);

  // Se não encontrar, retorna 404.
  if (tarefaIndex === -1) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }

  // Atualiza os campos da tarefa. Se um campo não for fornecido no corpo da requisição,
  // mantém o valor antigo.
  tarefas[tarefaIndex].descricao = descricao || tarefas[tarefaIndex].descricao;
  // Verifica explicitamente se `concluida` foi passado no corpo, pois pode ser `false`.
  tarefas[tarefaIndex].concluida = typeof concluida === 'boolean' ? concluida : tarefas[tarefaIndex].concluida;

  // Retorna a tarefa atualizada.
  res.status(200).json(tarefas[tarefaIndex]);
};

/**
 * Remove uma tarefa da lista.
 */
exports.removerTarefa = (req, res) => {
  const { objectId } = req.params;
  
  // Filtra o array, mantendo apenas as tarefas cujo objectId não corresponde ao fornecido.
  const novasTarefas = tarefas.filter(t => t.objectId !== objectId);

  // Se o tamanho do array não mudou, a tarefa não foi encontrada.
  if (tarefas.length === novasTarefas.length) {
    return res.status(404).json({ message: 'Tarefa não encontrada.' });
  }

  // Atualiza o array de tarefas.
  tarefas = novasTarefas;
  
  // Retorna uma resposta de sucesso sem conteúdo (204 No Content).
  res.status(204).send();
};
