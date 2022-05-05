import { Request, Response } from 'express'

const checkHealth = async (req: Request, res: Response) => {
	res.status(200).json({
		health: true,
	})
}

export default {
	checkHealth,
}
