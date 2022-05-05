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

// PORT
const PORT: number = parseInt(process.env.PORT as string, 10) || 7000

const app = express()

/* middlewares */
// cors
app.use(cors())

/* routers */
app.use('/hello', helloRouter)
app.use('/healthz', healthRouter)

// run app
app.listen(PORT, async () => {
	console.log(`express run at :${PORT}`)
})