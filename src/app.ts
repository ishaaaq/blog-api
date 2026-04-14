import express from 'express'
import postsRouter from './routes/posts.route';
import usersRouter from './routes/users.route';
import authRoute from './routes/auth.route';

const app = express()

app.use(express.json()) //parse incoming json bodies
app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/auth', authRoute)
app.use('/', (req, res) => {
    console.log("request recieved")
    res.send("Hello from local host")
})

export default app;