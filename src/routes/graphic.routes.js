import { Router } from 'express'
import {
    getStats, 
    graphicLine, 
    graphicBar, 
    graphicArea, 
    graphicPie
} from '../controllers/graphic.controller.js'

const router = Router()

router.get("/stats", getStats)
router.get("/graphicLine",  graphicLine)
router.get("/graphicBar", graphicBar)
router.get("/graphicArea", graphicArea)
router.get("/graphicPie", graphicPie)

export default router