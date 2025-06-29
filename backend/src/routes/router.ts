import { Router } from "express"
import { TransacaoController } from "../controllers/transacaoController"
import { CategoriaController } from "../controllers/categoriaController"
import { TipoController } from "../controllers/tipoController"

const router = Router()

// Rota de saúde
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString()
    })
})

// Rotas para Transações
const transacaoController = new TransacaoController()
router.get('/transacoes', transacaoController.getTransacoes.bind(transacaoController))
router.get('/transacoes/:id', transacaoController.getTransacaoPorId.bind(transacaoController))
router.get('/transacoes/mes/:mes', transacaoController.getTransacoesPorMes.bind(transacaoController))
router.put('/transacoes', transacaoController.setTransacoes.bind(transacaoController))

// Rotas para Categorias
const categoriaController = new CategoriaController()
router.get('/categorias', categoriaController.getCategorias.bind(categoriaController))
router.get('/categorias/:id', categoriaController.getCategoriaPorId.bind(categoriaController))
router.get('/categorias/tipo/:id_tipo', categoriaController.getCategoriaPorIdTipo.bind(categoriaController))

// Rotas para Tipos
const tipoController = new TipoController()
router.get('/tipos', tipoController.getTipos.bind(tipoController))
router.get('/tipos/:id', tipoController.getTipoPorId.bind(tipoController))

export default router
