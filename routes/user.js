const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} = require("../repositories/userRepository");
const SECRET_KEY = process.env.SECRET_KEY || "secreta";
const bcrypt = require("bcrypt");


router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = await createUser({ nome, email, senha: hashedPassword });
    res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await getUserByEmail(email);
    if (!user || !bcrypt.compareSync(senha, user.senha)) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    
    res.json({  id: user.id, senha: user.senha, nome: user.nome, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const usuarios = await getAllUsers();
    res.json({ usuarios });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const hashedPassword = senha ? await bcrypt.hash(senha, 10) : undefined;
    const updatedUser = await updateUser(req.params.id, {
      nome,
      email,
      senha: hashedPassword,
    });
    if (updatedUser) {
      res.json({ user: updatedUser });
    } else {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Busca o usuário atual no banco
    const existingUser = await getUserById(req.params.id); // Função que busca o usuário no banco
    if (!existingUser) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Monta o objeto de atualizações, preservando os valores existentes
    const updates = {
      nome: nome ?? existingUser.nome,
      email: email ?? existingUser.email,
      senha: senha ? await bcrypt.hash(senha, 10) : existingUser.senha,
    };

    // Atualiza o usuário no banco
    const updatedUser = await updateUser(req.params.id, updates);

    res.json({ user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    await deleteUser(req.params.id);
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
