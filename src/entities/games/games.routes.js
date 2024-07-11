import{Router} from 'express'
import { createGame, deleteGame, getAllGames, updateGames } from './games.controller.js'

const router = Router()

router.post('/', createGame)
router.get('/', getAllGames)
router.put('/', updateGames)
router.delete('/:id',deleteGame)


export {router}