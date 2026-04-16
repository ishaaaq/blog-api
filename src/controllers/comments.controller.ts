import { Request, Response } from "express"
import { commentsArr } from "../models/data"
import crypto from 'crypto'
import { comment } from "../types"
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

    // /posts/id/comments
    // get user in request
    public createComment = async (req: Request, res: Response) => {

         try {
        if(req.user){
            
            const { postId } = req.params
            const { body } = req.body

            const newComment: comment = {
                id: crypto.randomUUID(),
                body,
                createdAt: Date.now(),
                postId: postId as string,
                authorId: req.user.id
            }

            commentsArr.push(newComment)

            return res.status(200).json({message: "success", comment: newComment})

        } else {
            return res.status(401).json({message: "Please login to comment"})
        }
        } catch (error) {
            return res.status(500).json({message: "Internal server error"})
        }
    }
    public updateComment = async () => {

    }
    public  deleteComment = async () => {

    }
}