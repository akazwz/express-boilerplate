import express from 'express'

import healthzController from '../controllers/healthz.controller'

export const healthRouter = express.Router()

healthRouter.get('/', healthzController.checkHealth)