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

     public updateUser= async () => {
        
    }
}