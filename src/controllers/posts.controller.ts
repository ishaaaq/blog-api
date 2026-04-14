import { Request, Response } from "express"
import { posts, users } from "../models/data"
import crypto from 'crypto'
import { post } from "../types"
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

    //check if the user is authenticated, check all post properties are present and then create the post
    public createPost = async (req: Request, res: Response) => {
        const {userId} = req.params
        const {title, description} = req.body

        const legitUser = users.find(user => user.id === userId)

        try {
        if(!userId || !legitUser){
            return res.status(500).json({message: "You must be authenticated to create a post"})
        }

        if (!title || !description){
            return res.status(500).json({message: "Post must have a title and a description"})
        }

        const newPost: post = {
            id: crypto.randomUUID() as string,
            title,
            description,
            authorId: userId as string,
            createdAt: Date.now(),
            updatedAt: 0
        }

        posts.push(newPost)

        return res.status(201).json({
            message: "Post successfully created",
            data: newPost
        })
    } catch (error){
         console.log("Error creating post", error)
        res.status(500).json({message: "Internal server error"})
    }

    }
    public updatePost = async () => {

    }
    public deletePost = async () => {

    }
}