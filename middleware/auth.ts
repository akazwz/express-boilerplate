import { NextFunction, Request, Response } from 'express'
import JWT from 'jsonwebtoken'

import userService from '../services/users/user.service'

export const jwtAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const bearerToken = req.headers.authorization
		if (!bearerToken) {
			return res.status(401).json({
				msg: 'no token',
			})
		}

		const isValidBearerToken = bearerToken.startsWith('Bearer ')
		if (!isValidBearerToken) {
			return res.status(401).json({
				msg: 'not bearer token',
			})
		}
		const token = bearerToken.split(' ')[1]
		const secret = process.env.JWT_SECRET
		if (!secret) {
			return res.status(401).json({
				msg: 'secret must be defined',
			})
		}
		const payLoad = JWT.verify(token, secret)
		if (typeof payLoad === 'string') {
			return res.status(401).json({
				msg: 'token error',
			})
		}
		const uid = payLoad.uid
		if (!uid) {
			return res.status(401).json({
				msg: 'token error',
			})
		}
		req.uid = uid
		next()
	} catch (e) {
		console.log(e)
		return res.status(400).json({
			msg: 'invalid token',
		})
	}
}

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
	const uid = req.uid
	const isAdmin = await userService.isAdmin(uid)
	if (!isAdmin) {
		return res.status(403).json({
			msg: 'permission forbidden',
		})
	}
	next()
}