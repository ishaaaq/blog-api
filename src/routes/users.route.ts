import express from 'express'
import postsRouter from './posts.route'
import { Users } from '../controllers/users.controller'
const usersRouter = express.Router()

const usersController = new Users()

usersRouter.get('/:userId', usersController.getOneUser)
usersRouter.get('/', usersController.getAllUsers)
usersRouter.post('/', usersController.createUser)
usersRouter.put('/:userId', usersController.updateUser)


usersRouter.use('/:userId/posts', postsRouter)

export default usersRouter