import  {Router} from "express";
import commentsRouter from "./comments.route";
import { Posts } from "../controllers/posts.controller";
const postsRouter = Router({mergeParams: true})

const postsController = new Posts();

// GET /users/:id/posts
postsRouter.get('/', postsController.getAllPosts)

// GET /users/:id/posts/:id
postsRouter.get('/:postId', postsController.getOnePost)

// POST /users/:id/posts
postsRouter.post('/', postsController.createPost)

//PUT /users/:id/posts/:id
postsRouter.put('/:postId', postsController.updatePost)

//DELETE /users/:id/posts/:id
postsRouter.delete('/:postId', postsController.deletePost)

// All requests to /post/:id/comments
postsRouter.use('/:id/comments', commentsRouter)

export default postsRouter