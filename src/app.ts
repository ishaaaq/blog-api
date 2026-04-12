import express from 'express'
import router from './routes/users.route';
import postsRouter from './routes/posts.route';
import usersRouter from './routes/users.route';

const app = express()

app.use(express.json()) //pass incomming json bodies
app.use(router)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)

export default app;