import { Request, Response, NextFunction } from 'express'

import authService from '../services/auth.service'
import prisma from '../prisma/client'


const signUp = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, password } = req.body
		// find username
		const exitedUser = await prisma.user.findFirst({
			where: {
				username,
			}
		})

		if (exitedUser) {
			return res.status(400).json({
				msg: 'username has been token'
			})
		}

		const isSuccess = await authService.signupByUsernamePwd(username, password)

		if (!isSuccess) {
			return res.status(400).json({
				msg: 'register error, please try again later'
			})
		}

		return res.status(201).json({
			msg: 'register success',
		})
	} catch (e: any) {
		console.log(e.message)
		next(e)
	}
}

const signIn = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, password } = req.body
		const token = await authService.loginByUsernamePwd(username, password)
		if (!token) {
			return res.status(400).json({
				msg: 'wrong credentials'
			})
		}
		return res.status(200).json({
			msg: 'login success',
			data: {
				token,
			},
		})
	} catch (e: any) {
		console.log(e.message)
		next(e)
	}
}

export default {
	signUp,
	signIn,
}
