const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefasController');

// Rota para criar uma nova tarefa.
// POST /tarefas
router.post('/', tarefasController.criarTarefa);

// Rota para listar todas as tarefas.
// GET /tarefas
router.get('/', tarefasController.listarTarefas);

// Rota para obter uma tarefa específica pelo ID.
// GET /tarefas/:objectId
router.get('/:objectId', tarefasController.obterTarefa);

// Rota para atualizar uma tarefa existente.
// PUT /tarefas/:objectId
router.put('/:objectId', tarefasController.atualizarTarefa);

// Rota para remover uma tarefa.
// DELETE /tarefas/:objectId
router.delete('/:objectId', tarefasController.removerTarefa);

module.exports = router;
