import express from 'express'
import { Auth } from '../controllers/auth.controller'

const authRoute = express.Router()
const authController = new Auth()

authRoute.post('/login', authController.login)
authRoute.post('/signup', authController.signUp)

export default authRoute