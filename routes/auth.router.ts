import express from 'express'

import authController from '../controllers/auth.controller'

export const authRouter = express.Router()

authRouter.post('/signup', authController.signUp)
authRouter.post('/login', authController.signIn)