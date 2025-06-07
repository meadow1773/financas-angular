import { Router } from "express"

const router: Router = Router()

// Home
router.get("/", (req, res) => {
        res.json({
            response: 'Olá mundo!'
        }
    )})

export { router }