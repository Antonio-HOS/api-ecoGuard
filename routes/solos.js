const express = require("express");
const router = express.Router();
const {
    getAllSolos,
    getSoloById,
    getSolosByCidade,
    getSolosByRegiao,
    createSolo,
    deleteSolo,
    updateSolo,
    getSolosByCidadeRegiao,
} = require("../repositories/solosRepository");

router.post("/", async (req, res) => {
  try {
    const { regiao, cidade, tipo, dado, comentario } = req.body;
    const newSolo = await createSolo({
      regiao,
      cidade,
      tipo,
      dado,
      comentario,
    });
    res.status(201).json({ message: "Solo criada com sucesso", solo: newSolo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
    try {
        const solos = await getAllSolos();
        res.json({ solos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }
);

router.get("/:id", async (req, res) => {
    try {
        const solo = await getSoloById(req.params.id);
        if (!solo) {
            return res.status(404).json({ message: "Solo não encontrada" });
        }
        res.json({ solo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/cidade/:cidade", async (req, res) => {
    try {
        const solo = await getSolosByCidade(req.params.cidade);
        res.json({ solo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/regiao/:regiao", async (req, res) => {
    try {
        const solo = await getSolosByRegiao(req.params.regiao);
        res.json({ solo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/cidade/:cidade/regiao/:regiao", async (req, res) => {
    try {
        const solos = await getSolosByCidadeRegiao(req.params.cidade, req.params.regiao);
        res.json({ solos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const solo = await deleteSolo(req.params.id);
        if (!solo) {
            return res.status(404).json({ message: "solo não encontrada" });
        }
        res.json({ message: "Solo deletada com sucesso", solo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { regiao, cidade, tipo, dado, comentario } = req.body;
        const updetedSolo = await updateSolo(req.params.id, {
            regiao,
            cidade,
            tipo,
            dado,
            comentario,
        });
        if (!updetedSolo) {
            return res.status(404).json({ message: "Solo não encontrada" });
        }
        res.json({ message: "Solo atualizada com sucesso", solo: updetedSolo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
