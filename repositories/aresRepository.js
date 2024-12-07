const Ares = require("../models/ares");

async function getAllAres() {
  return Ares.findAll();
}

async function getArById(id) {
  return Ares.findByPk(id);
}

async function getAresByCidade(cidade) {
  return Ares.findAll({ where: { cidade } });
}

async function getAresByRegiao(regiao) {
  return Ares.findAll({ where: { regiao } });
}

async function getAresByCidadeRegiao(cidade, regiao) {
  return Ares.findAll({ where: { cidade, regiao } });
}

async function createAr(dados) {
  const { regiao, cidade, tipo, dado, comentario } = dados;
  return Ares.create({ regiao, cidade, tipo, dado, comentario });
}

async function deleteAr(id) {
  const ar = await Ares.findByPk(id);
  if (ar) {
    await ar.destroy();
    return ar;
  }
  return null;
}

async function updateAr(id, dadosAtualizados) {
  const ar = await Ares.findByPk(id);
  if (ar) {
    const { regiao, cidade, tipo, dado, comentario } = dadosAtualizados;
    ar.set({ regiao, cidade, tipo, dado, comentario });
    await ar.save();
    return ar;
  }
  return null;
}

module.exports = {
getAllAres,
getArById,
getAresByCidade,
getAresByRegiao,
getAresByCidadeRegiao,
createAr,
deleteAr,
updateAr
};
