
const Denuncias = require("../models/denuncia");

async function getAllDenuncias() {
  return Denuncias.findAll();
}

async function getDenunciaById(id) {
  return Denuncias.findByPk(id);
}

async function getSolosByTitulo(titulo) {
  return Denuncias.findAll({ where: { titulo } });
}

async function createDenuncia(dados) {
  const { titulo, mensagem } = dados;
  return Denuncias.create({ titulo, mensagem });
}

async function deleteDenuncia(id) {
  const Denuncia = await Denuncia.findByPk(id);
  if (Denuncia) {
    await Denuncia.destroy();
    return Denuncia;
  }
  return null;
}

module.exports = {
  getAllDenuncias,
  getDenunciaById,
  getSolosByTitulo,
  createDenuncia,
  deleteDenuncia
};
