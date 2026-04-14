import { post, user } from "../types";

export let users: user[] = [{
        id: "1c3556e9-f6a8-486f-9598-5ee829dd1132",
        email: "ishaqabdullahi660@gmail.com",
        name: "ishaq Abdullahi",
        passwordHash: "$2b$05$ng48QUT4xdpR0uWHNf6Wz.pKTPfVF..8H4/CO/uwOhW8FRxKbB18O",
        createdAt: 1776203435859
    }]

export let posts: post[] = [
     {
        id: "c84fae6b-f4a9-47ff-91d0-77bd368cacaa",
        title: "A night in the Woods",
        description: "Once upon a time, a couple of friends went camping in the woods. It was saturday, a perfect day to take a break from the worklife they have hade all through the week. A perfect time to get away from tech and bond with nature.",
        authorId: "1c3556e9-f6a8-486f-9598-5ee829dd1132",
        createdAt: 1776205902070,
        updatedAt: 0
    },
    {id:"365f7f41-042c-4bc9-84e7-d20a6b0d02d6", 
title:"The boys",
description:"The boys is an amazon prime series by Eric Kiripke. Its currently #1 on amazon prime and IMDB. It started in 2019 and the 5th and final season is being released this year, 2026. The premiere was last week wedesday with the first 2 episodes of the season released, and new episodes will be released every wednesday through the 20th of april. Its tuesday night, im super pumped for the third episode tomorrow. are you?", 
authorId:"1c3556e9-f6a8-486f-9598-5ee829dd1132",
createdAt:1776206702766, 
updatedAt:0}
]

