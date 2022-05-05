import { Express } from 'express-serve-static-core'

// extend express type
declare module 'express-serve-static-core' {
	interface Request{
		uid: string
	}
}