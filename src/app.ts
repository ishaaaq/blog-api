import express from 'express'

const app = express()

app.use(express.json()) //pass incomming json bodies

export default app;