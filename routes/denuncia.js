const express = require("express");
const router = express.Router();
const {
    getAllDenuncias,
    getDenunciaById,
    getSolosByTitulo,
    createDenuncia,
    deleteDenuncia
} = require("../repositories/solosRepository");

router.post("/", async (req, res) => {
  try {
    const { titulo, mensagem} = req.body;
    const newDenuncia = await createDenuncia({
        titulo,
        mensagem
    });
    res.status(201).json({ message: "Denuncia criada com sucesso", Denuncia: newDenuncia });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
    try {
        const Denuncias = await getAllDenuncias();
        res.json({ Denuncias });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    }
);

router.get("/:id", async (req, res) => {
    try {
        const denuncia = await getDenunciaById(req.params.id);
        if (!denuncia) {
            return res.status(404).json({ message: "Denuncia não encontrada" });
        }
        res.json({ denuncia });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/titulo/:titulo", async (req, res) => {
    try {
        const solos = await getSolosByTitulo(req.params.titulo);
        res.json({ solos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.delete("/:id", async (req, res) => {
    try {
        const denuncia = await deleteDenuncia(req.params.id);
        if (!denuncia) {
            return res.status(404).json({ message: "Denuncia não encontrada" });
        }
        res.json({ message: "Denuncia deletada com sucesso", denuncia });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
