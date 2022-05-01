import express, {Request, Response} from 'express'

export const helloRouter = express.Router()

helloRouter.get('/', async (req:Request, res:Response)=>{
	console.log(req.protocol)
	res.status(200).json({
		msg: "Hello, World!"
	})
})