import express from 'express'
import router from './routes/users.route';
import postsRouter from './routes/posts.route';
import usersRouter from './routes/users.route';
import authRoute from './routes/auth.route';

const app = express()

app.use(express.json()) //parse incoming json bodies
app.use(router)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/auth', authRoute)

export default app;