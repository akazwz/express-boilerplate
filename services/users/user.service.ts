import { Prisma } from '@prisma/client'

import prisma from '../../prisma/client'

const findUserByUID = async (uid: string): Promise<Prisma.UserGetPayload<{}> | null> => {
	return await prisma.user.findUnique(({
		where: {
			id: uid,
		}
	}))
}

const banUserByUID = async (uid: string): Promise<boolean> => {
	try {
		await prisma.user.update({
			where: {
				id: uid,
			},
			data: {
				banned: true,
			},
		})
		return true
	} catch (e) {
		console.log(e)
		return false
	}
}

const isAdmin = async (uid: string): Promise<boolean> => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: uid,
			},
			select: {
				role: true,
			},
		})
		return user?.role === 'ADMIN'
	} catch (e) {
		console.log(e)
		return false
	}
}

export default {
	findUserByUID,
	banUserByUID,
	isAdmin,
}