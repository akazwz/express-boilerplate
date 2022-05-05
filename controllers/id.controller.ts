import { Request, Response } from 'express'

const handleDirect = async (req: Request, res: Response) => {
	const { id } = req.params
	res.status(200).json({
		id,
	})
}

export default {
	handleDirect,
}
