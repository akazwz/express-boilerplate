import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const register = async (req: Request, res: Response, next: NextFunction) => {
	if (req.method !== 'POST') {
		res.status(404).json({
			msg: 'Not Found'
		})
	}
	try {
		const { username, password } = req.body
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
			data: {
				user,
			},
		})
	} catch (e: any) {
		console.log(e.message)
		next(e)
	}
}

const login = async (req: Request, res: Response, next: NextFunction) => {
	try {

	} catch (e: any) {
		console.log(e.message)
		next(e)
	}
}

export default {
	register,
	login,
}
