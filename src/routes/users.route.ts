import express from 'express'
import postsRouter from './posts.route'

const usersRouter = express.Router()

usersRouter.get('/:userId', getOneUser)
usersRouter.get('/', getAllUsers)
usersRouter.post('/', createUser)
usersRouter.put('/:userId', updateUser)


usersRouter.use('/:userId/posts', postsRouter)

export default usersRouter