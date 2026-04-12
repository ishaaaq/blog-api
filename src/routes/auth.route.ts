import express from 'express'
import { auth } from '../controllers/auth.controller'

const authRoute = express.Router()
const authController = new auth()

authRoute.post('/login', authController.login)
authRoute.post('/signup', authController.signUp)

export default authRoute