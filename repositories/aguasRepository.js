const Aguas = require("../models/aguas");

async function getAllAguas() {
  return Aguas.findAll();
}

async function getAguaById(id) {
  return Aguas.findByPk(id);
}

async function getAguasByCidade(cidade) {
  return Aguas.findAll({ where: { cidade } });
}

async function getAguasByRegiao(regiao) {
  return Aguas.findAll({ where: { regiao } });
}

async function getAguasByCidadeRegiao(cidade, regiao) {
  return Aguas.findAll({ where: { cidade, regiao } });
}

async function createAgua(dados) {
  const { regiao, cidade, tipo, dado, comentario } = dados;
  return Aguas.create({ regiao, cidade, tipo, dado, comentario });
}

async function deleteAgua(id) {
  const agua = await Aguas.findByPk(id);
  if (agua) {
    await agua.destroy();
    return agua;
  }
  return null;
}

async function updateAgua(id, dadosAtualizados) {
  const agua = await Aguas.findByPk(id);
  if (agua) {
    const { regiao, cidade, tipo, dado, comentario } = dadosAtualizados;
    agua.set({ regiao, cidade, tipo, dado, comentario });
    await agua.save();
    return agua;
  }
  return null;
}

module.exports = {
  getAllAguas,
  getAguaById,
  getAguasByCidade,
  getAguasByRegiao,
  createAgua,
  deleteAgua,
  updateAgua,
  getAguasByCidadeRegiao
};
