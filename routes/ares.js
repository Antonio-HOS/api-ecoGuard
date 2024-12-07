const express = require("express");
const router = express.Router();
const {
  getAllAres,
  getArById,
  getAresByCidade,
  getAresByRegiao,
  getAresByCidadeRegiao,
  createAr,
  deleteAr,
  updateAr,
} = require("../repositories/aresRepository");

router.post("/", async (req, res) => {
  try {
    const { regiao, cidade, tipo, dado, comentario } = req.body;
    const newAr = await createAr({
      regiao,
      cidade,
      tipo,
      dado,
      comentario,
    });
    res.status(201).json({ message: "Ar criado com sucesso", ar: newAr });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const ares = await getAllAres();
    res.json({ ares });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ar = await getArById(req.params.id);
    if (!ar) {
      return res.status(404).json({ message: "Ar não encontrada" });
    }
    res.json({ ar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/cidade/:cidade", async (req, res) => {
  try {
    const ares = await getAresByCidade(req.params.cidade);
    res.json({ ares });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/regiao/:regiao", async (req, res) => {
  try {
    const ares = await getAllAres(req.params.regiao);
    res.json({ ares });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/cidade/:cidade/regiao/:regiao", async (req, res) => {
  try {
    const ares = await getAresByCidadeRegiao(
      req.params.cidade,
      req.params.regiao
    );
    res.json({ ares });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const ar = await deleteAr(req.params.id);
    if (!ar) {
      return res.status(404).json({ message: "Ar não encontrada" });
    }
    res.json({ message: "Ar deletada com sucesso", ar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { regiao, cidade, tipo, dado, comentario } = req.body;
    const updatedAr = await updateAr(req.params.id, {
      regiao,
      cidade,
      tipo,
      dado,
      comentario,
    });
    if (!updatedAr) {
      return res.status(404).json({ message: "Ar não encontrada" });
    }
    res.json({ message: "Ar atualizada com sucesso", agua: updatedAr });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
