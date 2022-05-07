import express from 'express'

import userController from '../controllers/users/user.controller'
import profileController from '../controllers/users/profile.controller'
import { adminAuth } from '../middleware/auth'

export const userRouter = express.Router()

userRouter.get('/profile', profileController.findProfile)
userRouter.post('/profile', profileController.createProfile)
userRouter.put('/profile', profileController.updateProfile)

// only admin can ban users
userRouter.post('/:uid/banned', adminAuth, userController.banUser)
