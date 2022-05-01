import express from 'express'
import helloController from '../controllers/hello.controller'

export const helloRouter = express.Router()

helloRouter.get('/', helloController.handleGet)