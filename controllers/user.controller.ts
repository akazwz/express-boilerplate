import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const findProfile = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const uid = req.uid

		const user = await prisma.user.findFirst({
			where: {
				id: uid,
			}
		})

		if (!user) {
			return res.status(400).json({
				msg: 'no such user'
			})
		}

		console.log(user.id)

		const profile = await prisma.profile.findFirst({
			where: {
				userId: user.id,
			}
		})

		return res.status(200).json({
			msg: 'success',
			data: {
				profile,
			}
		})
	} catch (e: any) {
		console.log(e.message)
		next(e)
	}
}

const createProfile = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const uid = req.uid
		const user = await prisma.user.findFirst({
			where: {
				id: uid,
			}
		})

		if (!user) {
			return res.status(400).json({
				msg: 'no such user'
			})
		}

		const profile = await prisma.profile.findFirst({
			where: {
				userId: user.id,
			}
		})

		if (profile) {
			return res.status(400).json({
				msg: 'already had profile',
			})
		}

		const { bio, avatar } = req.body

		await prisma.profile.create({
			data: {
				userId: user.id,
				bio,
				avatar,
			}
		})

		return res.status(200).json({
			msg: 'success',
		})
	} catch (e: any) {
		console.log(e.message)
		next(e)
	}
}

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const uid = req.uid
		const { bio, avatar } = req.body

		const user = await prisma.user.findFirst({
			where: {
				id: uid,
			}
		})

		if (!user) {
			return res.status(400).json({
				msg: 'no such user'
			})
		}

		await prisma.profile.update({
			where: {
				userId: user.id,
			},
			data: {
				bio,
				avatar,
			}
		})

		return res.status(200).json({
			msg: 'success',
		})
	} catch (e: any) {
		console.log(e.message)
		next(e)
	}
}

export default {
	findProfile,
	createProfile,
	updateProfile,
}
