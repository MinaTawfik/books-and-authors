import express from 'express'

import bookRouter from './src/modules/book/book.routes.js'
import authorRouter from './src/modules/author/author.routes.js'
import extraRouter from './src/modules/extra/extra.routes.js'


import { connection } from './database/connection.js'

import cors from 'cors'

const app = express()
const port = 3000

connection()

app.use(cors())
app.use(express.json())
app.use('/book', bookRouter)
app.use('/author', authorRouter)
app.use('/extra', extraRouter)

 
app.listen(port, ()=>{console.log(`Server is running on port ${port}`)})