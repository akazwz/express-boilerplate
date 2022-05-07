import { Request, Response, NextFunction } from 'express'

import profileService from '../../services/users/profile.service'
import userService from '../../services/users/user.service'

// find profile
const findProfile = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const uid = req.uid

		const user = await userService.findUserByUID(uid)
		if (!user) {
			return res.status(400).json({
				msg: 'no such user'
			})
		}

		const profile = await profileService.findProfileByUID(uid)

		if (!profile) {
			return res.status(400).json({
				msg: 'no such profile'
			})
		}

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
		const user = await userService.findUserByUID(uid)

		if (!user) {
			return res.status(400).json({
				msg: 'no such user'
			})
		}

		const profile = await profileService.findProfileByUID(uid)

		if (profile) {
			return res.status(400).json({
				msg: 'already had profile',
			})
		}

		const { bio, avatar } = req.body

		const profileCreated = await profileService.createProfile({
			bio: bio,
			avatar: avatar,
			userId: uid,
		})

		if (!profileCreated) {
			return res.status(400).json({
				msg: 'create profile error',
			})
		}

		return res.status(200).json({
			msg: 'success',
			data: {
				profile: profileCreated,
			}
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

		const user = await userService.findUserByUID(uid)

		if (!user) {
			return res.status(400).json({
				msg: 'no such user'
			})
		}

		const isUpdated = await profileService.updateProfile({
			bio,
			avatar,
			userId: uid,
		})

		if (!isUpdated) {
			return res.status(400).json({
				msg: 'update profile error'
			})
		}

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
