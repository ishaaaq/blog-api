import {Request, Response} from 'express'
import bcrypt from 'bcryptjs'
import { users } from '../models/data'
import crypto  from 'crypto'
import { user } from '../types'
export class Auth{
    //i wanna get the login details, verify the password is correct (does this involve unhashing saved password and checking it?) and then allow them to login
 public login = async (req: Request, res: Response) => {
    const {email, password} =  req.body
    try {
        
    } catch (error) {
        
    }
 }

 //i wanna take their details, verify all details are present, check if the user exists, hash the password and store the details with hashed password
 public signUp = async (req: Request, res: Response) => {
    const {email, name, password} = req.body

    //verify all details are present
    if(!name || !email || !password){
        return res.status(400).json({message: "All fields are required"})
    }

    //check existing user
   const exisitingUser = users.find(user => user.email === email)
    if(exisitingUser){
        return res.status(409).json({message: "User already exists, please login"})
    }

    const saltRounds = 5
  
    try {
        //hash password
       const hashedPassword = await bcrypt.hash(password, saltRounds)

        // create user with hashedpassword
        const newUser: user = {
            id: crypto.randomUUID() as string,
            email: email,
            name: name,
            passwordHash: hashedPassword,
            createdAt: Date.now()
        }

        //save the user
        users.push(newUser)
   
     // return user WITHOUT the hashedpassword
     const {passwordHash, ...userResponse} = newUser
     return res.status(200).json({
        message: "User registered successfully",
        user: userResponse
     })

    } catch (error) {
        console.log("Error registering User", error)
        res.status(500).json({message: "Internal server Error"})
    }

 }
}