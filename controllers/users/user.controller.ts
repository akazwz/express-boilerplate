import { Request, Response, NextFunction } from 'express'

import userService from '../../services/users/user.service'

const banUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { uid } = req.params
		const success = await userService.banUserByUID(uid)
		if (!success) {
			return res.status(400).json({
				msg: 'banned user error',
			})
		}

		return res.status(200).json({
			msg: 'success',
		})
	} catch (e) {
		console.log(e)
		next(e)
	}
}

const findUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { page } = req.params
		const pageCount = Number(process.env.PAGE_COUNT) || 20
		const users = await userService.findUsers(Number(page) * pageCount || 0, pageCount)
		return res.status(200).json({
			msg: 'success',
			data: {
				users,
			}
		})
	} catch (e) {
		console.log(e)
		next(e)
	}
}

export default {
	banUser,
	findUsers,
}
