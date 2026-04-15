import { Request, Response } from "express"
import { commentsArr } from "../models/data"
export class comments{
    public getAllComments = async (req: Request, res: Response) => {
        res.status(200).json({
            message: "success",
            data: commentsArr
        })
    }

    public getOneComment = async () => {
        
    }
    public createComment = async () => {

    }
    public updateComment = async () => {

    }
    public  deleteComment = async () => {

    }
}