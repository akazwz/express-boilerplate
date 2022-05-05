import { Request, Response, NextFunction, } from 'express'

import helloService from '../services/hello.service'

const handleGet = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const ip = req.ip
		const ips = req.ips
		res.status(200).json({
			msg: await helloService.getHello(),
			ip,
			ips,
		})
	} catch (e: any) {
		console.log(e.message)
		next(e)
	}
}

export default {
	handleGet,
}
