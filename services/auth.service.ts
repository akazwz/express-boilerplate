import bcrypt from 'bcrypt'

import { signToken } from '../utils'
import prisma from '../prisma/client'

const signupByUsernamePwd = async (username: string, password: string): Promise<boolean> => {
	const hashedPassword = await bcrypt.hash(password, 10)

	try {
		await prisma.user.create({
			data: {
				username,
				password: hashedPassword
			}
		})
		return true
	} catch (e) {
		return false
	}
}

const loginByUsernamePwd = async (username: string, password: string): Promise<string | null> => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				username,
			}
		})

		if (!user) {
			return null
		}

		const isPwdCorrect = await bcrypt.compare(password, user.password)
		if (!isPwdCorrect) {
			return null
		}

		return signToken(user.id)
	} catch (e) {
		console.log(e)
		return null
	}
}

export default {
	signupByUsernamePwd,
	loginByUsernamePwd,
}