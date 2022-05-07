import { Prisma } from '@prisma/client'

import prisma from '../../prisma/client'

const findProfileByUID = async (uid: string): Promise<Prisma.ProfileGetPayload<{}> | null> => {
	return await prisma.profile.findUnique({
		where: {
			userId: uid,
		}
	})
}

const createProfile = async (profile: Prisma.ProfileUncheckedCreateInput): Promise<Prisma.ProfileGetPayload<{}> | null> => {
	try {
		return await prisma.profile.create({
			data: profile,
		})
	} catch (e) {
		return null
	}
}

const updateProfile = async (profile: Prisma.ProfileUncheckedUpdateInput): Promise<boolean> => {
	if (!profile.userId || typeof profile.userId !== 'string') {
		return false
	}

	try {
		await prisma.profile.update({
			where: {
				userId: profile.userId,
			},
			data: {
				bio: profile.bio,
				avatar: profile.avatar,
			}
		})
		return true
	} catch (e) {
		console.log(e)
		return false
	}
}

export default {
	findProfileByUID,
	createProfile,
	updateProfile,
}