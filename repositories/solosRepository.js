

const Solos = require("../models/solos");

async function getAllSolos() {
  return Solos.findAll();
}

async function getSoloById(id) {
  return Solos.findByPk(id);
}

async function getSolosByCidade(cidade) {
  return Solos.findAll({ where: { cidade } });
}

async function getSolosByRegiao(regiao) {
  return Solos.findAll({ where: { regiao } });
}

async function getSolosByCidadeRegiao(cidade, regiao) {
    return Solos.findAll({ where: { cidade, regiao } });
  }

async function createSolo(dados) {
  const { regiao, cidade, tipo, dado, comentario } = dados;
  return Solos.create({ regiao, cidade, tipo, dado, comentario });
}

async function deleteSolo(id) {
  const Solos = await Solos.findByPk(id);
  if (Solos) {
    await Solos.destroy();
    return Solos;
  }
  return null;
}

async function updateSolo(id, dadosAtualizados) {
  const Solos = await Solos.findByPk(id);
  if (Solos) {
    const { regiao, cidade, tipo, dado, comentario } = dadosAtualizados;
    Solos.set({ regiao, cidade, tipo, dado, comentario });
    await Solos.save();
    return Solos;
  }
  return null;
}

module.exports = {
    getAllSolos,
    getSoloById,
    getSolosByCidade,
    getSolosByRegiao,
    createSolo,
    deleteSolo,
    updateSolo,
    getSolosByCidadeRegiao
};
