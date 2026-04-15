import {Router} from 'express'
import { comments } from '../controllers/comments.controller'
const commentsRouter = Router({mergeParams: true})

const commentsController = new comments()

//GET /posts/:id/comments
commentsRouter.get('/', commentsController.getAllComments)

//GET /posts/:id/comments/:id
commentsRouter.get('/:commentId', commentsController.getOneComment)

//POST /posts/:id/comments
commentsRouter.post('/', commentsController.createComment)

//PUT posts/:id/comments/:id
commentsRouter.put('/:commentId', commentsController.updateComment)

//DELETE posts/:id/comments/:id
commentsRouter.delete('/:commentId', commentsController.deleteComment)

export default commentsRouter