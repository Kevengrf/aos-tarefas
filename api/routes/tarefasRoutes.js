const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefasController');
const authMiddleware = require('../middleware/authMiddleware');

// Aplica o middleware de autenticação a todas as rotas de tarefas.
router.use(authMiddleware);

// Rota para criar uma nova tarefa.
// POST /api/tarefas
router.post('/', tarefasController.criarTarefa);

// Rota para listar todas as tarefas do usuário logado.
// GET /api/tarefas
router.get('/', tarefasController.listarTarefas);

// Rota para obter uma tarefa específica pelo ID.
// GET /api/tarefas/:id
router.get('/:id', tarefasController.obterTarefa);

// Rota para atualizar uma tarefa existente.
// PUT /api/tarefas/:id
router.put('/:id', tarefasController.atualizarTarefa);

// Rota para remover uma tarefa.
// DELETE /api/tarefas/:id
router.delete('/:id', tarefasController.removerTarefa);

module.exports = router;