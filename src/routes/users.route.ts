import express from 'express'
import { Users } from '../controllers/users.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
const usersRouter = express.Router()

const usersController = new Users()

usersRouter.get('/:userId', usersController.getOneUser)
usersRouter.get('/', usersController.getAllUsers)
usersRouter.put('/:userId', authMiddleware, usersController.updateUser)


export default usersRouter