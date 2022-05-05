import { Request, Response, NextFunction, } from 'express'

import helloService from '../services/hello.service'

const handleGet = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const ip = req.ip
		res.status(200).json({
			msg: await helloService.getHello(),
			ip,
		})
	} catch (e: any) {
		console.log(e.message)
		next(e)
	}
}

export default {
	handleGet,
}
