import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { signToken } from '../utils'

const prisma = new PrismaClient()

const register = async (req: Request, res: Response, next: NextFunction) => {
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

		const hashedPassword = await bcrypt.hash(password, 10)

		const user = await prisma.user.create({
			data: {
				username,
				password: hashedPassword
			}
		})

		if (!user) {
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

const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, password } = req.body
		const user = await prisma.user.findFirst({
			where: {
				username,
			}
		})
		if (!user) {
			return res.status(400).json({
				msg: 'credentials error'
			})
		}
		const isPwdCorrect = bcrypt.compare(password, user.password)
		if (!isPwdCorrect) {
			return res.status(400).json({
				msg: 'credentials error'
			})
		}
		// login success
		const token = signToken(username)
		return res.status(201).json({
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
	register,
	login,
}
