import JWT from 'jsonwebtoken'
import { addDays, } from 'date-fns'

export const signToken = (username: string): string => {
	const secret = process.env.JWT_SECRET
	if (!secret) {
		throw new Error('jwt secret must be defined')
	}
	return JWT.sign({
			iss: 'auth',
			username: username,
			iat: parseInt((new Date().getTime() / 1000).toFixed(0)),
			exp: parseInt((addDays(new Date(), 7).getTime() / 1000).toFixed(0)),
		} as Record<string, any>,
		secret
	)
}
