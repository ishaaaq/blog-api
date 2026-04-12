import  {Router} from "express";
import commentsRouter from "./comments.route";

const postsRouter = Router({mergeParams: true})

// GET /users/:id/posts
postsRouter.get('/', getAllPosts)

// GET /users/:id/posts/:id
postsRouter.get('/:id', getOnePost)

// POST /users/:id/posts
postsRouter.post('/', createPost)

//PUT /users/:id/posts/:id
postsRouter.put('/:id', updatePost)

//DELETE /users/:id/posts/:id
postsRouter.delete('/:id', deletePost)

// All requests to /post/:id/comments
postsRouter.use('/:id/comments', commentsRouter)

export default postsRouter