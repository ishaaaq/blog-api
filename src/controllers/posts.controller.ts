import { Request, Response } from "express"
import { posts } from "../models/data"

export class Posts{
    public getAllPosts = async (req: Request, res: Response) => {
        return res.status(200).json({posts: posts})
    }
    public getOnePost = async (req: Request, res: Response) => {
        //get the post id, search for the post, return the post
        const {id} = req.params
        if (!id){
          return  res.status(500).json({message: "Invalid request. Please provide post id"})
        }
        try {
        const thePost = posts.find(post => post.id === id)
        if(!thePost){
           return res.status(500).json({message: "Post doent exist"})
        }
 
        return res.status(200).json({
            message: "post found",
            data: thePost
        })
   } catch (error) {
    console.log("Error finding post", error)
    res.status(500).json({message: "Internal server error"})
   }
    }
    public createPost = async () => {

    }
    public updatePost = async () => {

    }
    public deletePost = async () => {

    }
}