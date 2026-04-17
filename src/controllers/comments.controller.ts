import { Request, Response } from "express"
import { commentsArr, posts } from "../models/data"
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
            console.log(`newly created comment ${newComment.postId}`)
            return res.status(200).json({message: "success", comment: newComment, postID: `im here ${postId}`})

        } else {
            return res.status(401).json({message: "Please login to comment"})
        }
        } catch (error) {
            return res.status(500).json({message: "Internal server error"})
        }
    }

    // /posts/postId/comments/commentId
    //check the user is authenticated, check he's authorrized to edit, check both post and comment exist, save new value
    public updateComment = async (req: Request, res: Response) => {
        console.log("recieved in updatecomment:")
        try {
            if(req.user){
                
                const { postId, commentId } = req.params
                const { body } = req.body

                const post = posts.find(p => p.id === postId)
                const comment = commentsArr.find(c => c.id === commentId)

                if (!post || !comment){
                    return res.status(400).json({message: "Comment or post dosent exist"})
                }

                if(comment.authorId !== req.user.id){
                    return res.status(403).json({message: "You are unauthorized to edit this comment!"})
                }

                const newComment = {
                    ...comment,
                    body: body
                }

                const commentIndex = commentsArr.indexOf(comment)

                commentsArr.splice(commentIndex, 1, newComment)
                console.log("new comments array, check updated", commentsArr)

                return res.status(200).json({message: "success", updatedComment: newComment})
            } else {
                return res.status(401).json({message: "Please login to edit comment"})
            }
        } catch (error) {
            console.log("Error updating comment:", error)
            return res.status(500).json("Internal server error")
        }
    }
    //check the user is authenticated,
     //check that both postid and comment id exist 
    // check that both postid and comment id are legit
    //check that comment belongs to the post
    //check that the user is authorized to perform the delete
   //delete comment
    public  deleteComment = async (req: Request, res: Response) => {
        const {postId, commentId} = req.params
        try {
            //1. check user is authenticated
          if(!req.user){
            return res.status(401).json({message: "You must be logged in to delete comment"})
          }

          //2. check both postid and comment id exist and are real
          if(!postId || !commentId){
          return  res.status(400).json({message: "post or comment is missing"})
          }

          const post = posts.find(p => p.id === postId)
          const comment = commentsArr.find(c => c.id === commentId)

          //3. check both post and comment exist
          if(!post || !comment){
            return res.status(404).json({message: "post or comment dosent exist"})
          }

          //4. check the comment belongs to the post
          if (comment.postId !== post.id){
          return  res.status(404).json({message: "Invalid! comment dosent belong to the selected post"})
          }

          //5. check the user is authorized to delete
          if(req.user.id !== comment.authorId || req.user.id == post.authorId){
            return res.status(403).json({message: "You are unauthorized to perform this action"})
          }
          //6. delete comment. since its an array, we create a new array WITHOUT the deleted item
          //and then point to it as the new array
          const newCommentsArr = commentsArr.filter(c => c.id !== commentId)

          commentsArr.splice(0, commentsArr.length, ...newCommentsArr)

          return res.json(200).json({
            message: "success",
            deletedComment: comment,
            newCommentsArr
          })


        } catch (error) {
            console.log("error deleting comment:", error)
            return res.status(500).json({message: "internal server error"})
        }
    }
}