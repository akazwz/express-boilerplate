import { Request, Response, } from 'express'

const handleGet = async (req:Request, res:Response) => {
	console.log(req.protocol)
	res.status(200).json({
		msg: 'Hello, World!'
	})
}

export default {
	handleGet,
}
