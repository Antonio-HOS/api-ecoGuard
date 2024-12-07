const express = require("express");
const router = express.Router();
const {
  getAllAguas,
  getAguaById,
  getAguasByCidade,
  getAguasByRegiao,
  createAgua,
  deleteAgua,
  updateAgua,
  getAguasByCidadeRegiao,
} = require("../repositories/aguasRepository");

router.post("/", async (req, res) => {
  try {
    const { regiao, cidade, tipo, dado, comentario } = req.body;
    const newAgua = await createAgua({
      regiao,
      cidade,
      tipo,
      dado,
      comentario,
    });
    res.status(201).json({ message: "Agua criada com sucesso", agua: newAgua });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
    try {
        const aguas = await getAllAguas();
        res.json({ aguas });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }
);

router.get("/:id", async (req, res) => {
    try {
        const agua = await getAguaById(req.params.id);
        if (!agua) {
            return res.status(404).json({ message: "Agua não encontrada" });
        }
        res.json({ agua });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/cidade/:cidade", async (req, res) => {
    try {
        const aguas = await getAguasByCidade(req.params.cidade);
        res.json({ aguas });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/regiao/:regiao", async (req, res) => {
    try {
        const aguas = await getAguasByRegiao(req.params.regiao);
        res.json({ aguas });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/cidade/:cidade/regiao/:regiao", async (req, res) => {
    try {
        const aguas = await getAguasByCidadeRegiao(req.params.cidade, req.params.regiao);
        res.json({ aguas });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const agua = await deleteAgua(req.params.id);
        if (!agua) {
            return res.status(404).json({ message: "Agua não encontrada" });
        }
        res.json({ message: "Agua deletada com sucesso", agua });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { regiao, cidade, tipo, dado, comentario } = req.body;
        const updatedAgua = await updateAgua(req.params.id, {
            regiao,
            cidade,
            tipo,
            dado,
            comentario,
        });
        if (!updatedAgua) {
            return res.status(404).json({ message: "Agua não encontrada" });
        }
        res.json({ message: "Agua atualizada com sucesso", agua: updatedAgua });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
