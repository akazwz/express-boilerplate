import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { helloRouter } from './routes/hello.router'

// get .env config
dotenv.config()

// PORT
const PORT:number = parseInt(process.env.PORT as string, 10) || 7000

const app = express()

/* middlewares */
// cors
app.use(cors())

/* routers */
app.use('/hello', helloRouter)

// run app
app.listen(PORT, () => {
	console.log(`express run at :${PORT}`)
})