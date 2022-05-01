import { Request, Response, } from 'express'
import helloService from '../services/hello.service'

const handleGet = async (req:Request, res:Response) => {
	console.log(req.protocol)
	res.status(200).json({
		msg: await helloService.getHello()
	})
}

export default {
	handleGet,
}
