import {Router} from 'express'
const router = Router()
import * as authorController from './author.controller.js'

router.post('/add', authorController.add)
router.get('/getall', authorController.getall)
router.get('/get/:id', authorController.get)
router.patch('/update/:id', authorController.update)
router.delete('/delete/:id', authorController.remove)

export default router