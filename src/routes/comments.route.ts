import {Router} from 'express'

const commentsRouter = Router({mergeParams: true})

//GET /posts/:id/comments
commentsRouter.get('/', getAllComments)

//GET /posts/:id/comments/:id
commentsRouter.get('/:id', getOnePostComment)

//POST /posts/:id/comments
commentsRouter.post('/', createComment)

//PUT posts/:id/comments/:id
commentsRouter.put('/:id', updateComment)

//DELETE posts/:id/comments/:id
commentsRouter.delete('/:id', deleteComment)

export default commentsRouter