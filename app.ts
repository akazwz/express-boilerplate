import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

// get .env config
dotenv.config({
	/* prod and dev env config */
	path: process.env.NODE_ENV === 'production' ? '.env' : '.env'
})

// routers
import { helloRouter } from './routes/hello.router'
import { healthRouter } from './routes/heathz.router'

// short id redirect controller
import idController from './controllers/id.controller'

// PORT
const PORT: number = parseInt(process.env.PORT as string, 10) || 7000

const app = express()

app.set('trust proxy', true)

/* middlewares */
// cors
app.use(cors())

/* routers */
app.use('/hello', helloRouter)
app.use('/healthz', healthRouter)
// 7 numbers a-z A-Z _ - regex
app.get(`/:id([0-9a-zA-Z_-]{7})`, idController.handleDirect)

// run app
app.listen(PORT, async () => {
	console.log(`express run at :${PORT}`)
})