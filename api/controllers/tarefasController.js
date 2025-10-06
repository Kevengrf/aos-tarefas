const { Tarefa } = require('../models');

exports.criarTarefa = async (req, res) => {
  try {
    const { descricao, concluida } = req.body;
    // We get UserId from the auth middleware
    const novaTarefa = await Tarefa.create({ descricao, concluida, UserId: req.userId });
    res.status(201).json(novaTarefa);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar tarefa", error: error.message });
  }
};

exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.findAll({ where: { UserId: req.userId } });
    res.status(200).json(tarefas);
  } catch (error) {
    res.status(400).json({ message: "Erro ao listar tarefas", error: error.message });
  }
};

exports.obterTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const tarefa = await Tarefa.findOne({ where: { id, UserId: req.userId } });
    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
    res.status(200).json(tarefa);
  } catch (error) {
    res.status(400).json({ message: "Erro ao obter tarefa", error: error.message });
  }
};

exports.atualizarTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, concluida } = req.body;
    const [updated] = await Tarefa.update({ descricao, concluida }, {
      where: { id, UserId: req.userId }
    });
    if (updated) {
      const tarefaAtualizada = await Tarefa.findOne({ where: { id, UserId: req.userId } });
      res.status(200).json(tarefaAtualizada);
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar tarefa", error: error.message });
  }
};

exports.removerTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tarefa.destroy({
      where: { id, UserId: req.userId }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
  } catch (error) {
    res.status(400).json({ message: "Erro ao remover tarefa", error: error.message });
  }
};