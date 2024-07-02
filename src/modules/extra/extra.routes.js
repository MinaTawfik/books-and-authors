import {Router} from 'express'
const router = Router()
import * as extraController from './extra.controller.js'


router.get('/getallbooksandauthors/:page', extraController.getBooksAndAuthors)
router.get('/search/books', extraController.searchBooks)
router.get('/search/authors', extraController.searchAuthors)
router.get('/getauthorbooks/:id', extraController.getAuthorBooks)



export default router