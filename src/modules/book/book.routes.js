import {Router} from 'express'
const router = Router()
import * as bookController from './book.controller.js'

router.post('/add', bookController.add)
router.get('/getall', bookController.getall)
router.get('/get/:id', bookController.get)
router.patch('/update/:id', bookController.update)
router.delete('/delete/:id', bookController.remove)


export default router