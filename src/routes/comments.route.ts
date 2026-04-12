import {Router} from 'express'
import { comments } from '../controllers/comments.controller'
const commentsRouter = Router({mergeParams: true})

const commentsController = new comments()

//GET /posts/:id/comments
commentsRouter.get('/', commentsController.getAllComments)

//GET /posts/:id/comments/:id
commentsRouter.get('/:id', commentsController.getOneComment)

//POST /posts/:id/comments
commentsRouter.post('/', commentsController.createComment)

//PUT posts/:id/comments/:id
commentsRouter.put('/:id', commentsController.updateComment)

//DELETE posts/:id/comments/:id
commentsRouter.delete('/:id', commentsController.deleteComment)

export default commentsRouter