// Criando as rotas de autenticação para o usuário

const express = require("express");
const router = express.Router();
const autenticacaoController = require("../controllers/autenticacaoController");

router.post("/login", autenticacaoController.login);

router.post("/register", autenticacaoController.register);

module.exports = router;
