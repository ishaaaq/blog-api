import { Request, Response } from "express"
import { commentsArr } from "../models/data"
export class comments{
    // /posts/id/comments
    // get all comments for one post
    public getAllComments = async (req: Request, res: Response) => {

        const {postId} = req.params
        const postComments = commentsArr.filter(c => c.postId == postId)

        res.status(200).json({
            message: "success",
            data: postComments
        })
    }
    // /posts/id/comments/id
    public getOneComment = async (req: Request, res: Response) => {
        const { commentId} = req.params
        try {
            const comment = commentsArr.find(comment => comment.id === commentId)
    
            if(!comment){
                return res.status(400).json({message: "Please provide a valid comment ID"})
            }
            return res.status(200).json({
                message: "success",
                comment: comment
            })
            
        } catch (error) {
            console.log("error finding comment:", error)
            return res.status(500).json({message: "Internal server error"})
        }
    }
    public createComment = async () => {

    }
    public updateComment = async () => {

    }
    public  deleteComment = async () => {

    }
}