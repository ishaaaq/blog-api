import  {Router} from "express";
import commentsRouter from "./comments.route";
import { Posts } from "../controllers/posts.controller";
const postsRouter = Router({mergeParams: true})

const postsController = new Posts();

// GET /users/:id/posts
postsRouter.get('/', postsController.getAllPosts)

// GET /users/:id/posts/:id
postsRouter.get('/:id', postsController.getOnePost)

// POST /users/:id/posts
postsRouter.post('/', postsController.createPost)

//PUT /users/:id/posts/:id
postsRouter.put('/:id', postsController.updatePost)

//DELETE /users/:id/posts/:id
postsRouter.delete('/:id', postsController.deletePost)

// All requests to /post/:id/comments
postsRouter.use('/:id/comments', commentsRouter)

export default postsRouter