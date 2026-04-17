import { users } from "../models/data"
import { Request, Response } from "express"
export class Users {
     public getOneUser= async () => {
        
    }

     public getAllUsers= async (req: Request, res: Response) => {
        res.status(200).json({
            data: users
        })
    }

     public createUser= async () => {
        
    }

    //check user is authennticated, check authorization, check id exists
     public updateUser= async (req: Request, res: Response) => {

        try {
        const { email, name } = req.body
        if(!req.user){
            return res.status(401).json({message: "please login to edit profile"})
        }

        if(req.user.id !== req.params.userId){
            return res.status(403).json({message: "You are unauthorized to edit this profile"})
        }

        const user = users.find(u => u.id === req.params.userId)
        if(!user){
            return res.status(400).json({message: "User not found!"})
        }

       const newUser = {
        ...user,
        name,
        email, 
       }

       const userIndex = users.indexOf(user)
       users.splice(userIndex, 1, newUser)

       return res.status(200).json({
        message: "success",
        updatedUser: newUser
       })
    
      } catch (error) {
            console.log("Error editing profile: ", error)
            return res.status(500).json("Internal server error")
        }
    }
}