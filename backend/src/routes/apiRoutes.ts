import { Router } from "express";
import { ApiController } from "../controllers/apiController";

const router = Router();
const controller = new ApiController();

// Rotas para Transações
router.get('/transacoes', controller.getTransacoes.bind(controller));
router.get('/transacoes/:id', controller.getTransacoesPorId.bind(controller));

// Rotas para Categorias
router.get('/categorias', controller.getCategorias.bind(controller));
router.get('/categorias/:id', controller.getCategoriasPorId.bind(controller));

// Rotas para Tipos
router.get('/tipos', controller.getTipos.bind(controller));
router.get('/tipos/:id', controller.getTipoPorId.bind(controller));

export default router;