import { NextFunction, Request, Response, } from 'express'

import helloService from '../services/hello.service'

const handleGet = async (req:Request, res:Response, next:NextFunction) => {
	try {
		res.status(200).json({
			msg: await helloService.getHello()
		})
	} catch (e:any) {
		console.log(e.message)
		next(e)
	}
}

export default {
	handleGet,
}
