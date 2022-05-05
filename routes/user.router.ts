import express from 'express'

import userController from '../controllers/user.controller'

export const userRouter = express.Router()

userRouter.get('/profile', userController.findProfile)
userRouter.post('/profile', userController.createProfile)
userRouter.put('/profile', userController.updateProfile)
