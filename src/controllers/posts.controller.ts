import { Request, Response } from "express"
import { posts, users } from "../models/data"
import crypto from 'crypto'
import { post } from "../types"
export class Posts {
    public getAllPosts = async (req: Request, res: Response) => {
        return res.status(200).json({ posts: posts })
    }
    public getOnePost = async (req: Request, res: Response) => {
        //get the post id, search for the post, return the post
        const { id } = req.params
        if (!id) {
            return res.status(500).json({ message: "Invalid request. Please provide post id" })
        }
        try {
            const thePost = posts.find(post => post.id === id)
            if (!thePost) {
                return res.status(500).json({ message: "Post doent exist" })
            }

            return res.status(200).json({
                message: "post found",
                data: thePost
            })
        } catch (error) {
            console.log("Error finding post", error)
            res.status(500).json({ message: "Internal server error" })
        }
    }

    //check if the user is authenticated, check all post properties are present and then create the post
    public createPost = async (req: Request, res: Response) => {
        const { title, description } = req.body

        const legitUser = users.find(user => user.id === req.user?.id)

        try {
            if (!req.user || !legitUser) {
                return res.status(500).json({ message: "You must be authenticated to create a post" })
            }

            if (!title || !description) {
                return res.status(500).json({ message: "Post must have a title and a description" })
            }

            const newPost: post = {
                id: crypto.randomUUID() as string,
                title,
                description,
                authorId: req.user.id as string,
                createdAt: Date.now(),
                updatedAt: 0
            }

            posts.push(newPost)

            return res.status(201).json({
                message: "Post successfully created",
                data: newPost
            })
        } catch (error) {
            console.log("Error creating post", error)
            res.status(500).json({ message: "Internal server error" })
        }

    }
    public updatePost = async (req: Request, res: Response) => {
        const { postId } = req.params
        const { title, description } = req.body

        try {
            if (!req.user) {
                return res.status(401).json({ message: "You must be logged in to update a post" })
            }

            if (!postId) {
                return res.status(400).json({ message: "post id required" })
            }

            const postToUpdate = posts.find(post => post.id === postId)
            if (!postToUpdate) {
                return res.status(500).json({ message: "post dosent exist for this id" })
            }

            if (postToUpdate.authorId !== req.user.id) {
                return res.status(400).json({ message: `You have to be the author of a ${postToUpdate.title} in order to edit it!` })
            }

            const itsIndex = posts.indexOf(postToUpdate)
            if (!itsIndex) throw new Error("Error finding index")

            const newPost = {
                ...postToUpdate,
                title: title,
                description: description,
                updatedAt: Date.now()
            }

            posts.splice(1, itsIndex, newPost)

            return res.status(201).json({
                message: "Success updating blog post",
                updatedPost: newPost,
                allPosts: posts
            })

        } catch (error) {
            console.log(`Error updating post: ${error}`)
            return res.status(500).json({ error: "Internal Server error" })
        }

    }
    public deletePost = async (req: Request, res: Response) => {
        const { postId } = req.params
        const post = posts.find(post => post.id === postId)

        if (!req.user) {
            return res.status(401).json({ message: "You must be logged in to update a post" })
        }

        if (!post) {
            return res.status(400).json({ message: "Post dosent exist" })
        }
        try {
            if (post.authorId !== req.user?.id) {
                return res.status(400).json({
                    message: "You can an only delete your own posts!"
                })
            }


            const newArray = posts.filter(post => post.id !== postId)
            posts.splice(0, posts.length, ...newArray)

            return res.status(200).json({
                message: "success",
                deletedPost: post,
            })
        } catch (error) {
            console.log("Error deleting post:", error)
            return res.status(500).json({ Message: "Internal server error" })
        }
    }
}