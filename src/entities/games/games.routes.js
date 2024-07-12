import{Router} from 'express'
import { addFavouriteGame, createGame, deleteGame, getAllGames, updateGames } from './games.controller.js'
import { auth } from '../middlewares/auth.js'

const router = Router()

router.post('/', createGame)
router.get('/', getAllGames)
router.put('/', updateGames)
router.delete('/:id',deleteGame)
router.put('/add-user-favourite/:id', auth, addFavouriteGame)


export {router}