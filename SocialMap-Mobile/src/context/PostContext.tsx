import React, { ReactElement, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

import { Action } from "../models/Actions"
import { Post } from "../models/Post";
import server from "../api/server";
import Utils from "../Utils"

interface INewPost {
    title: string
    content: string
    file?: File | null
}
interface IPostContext {
    posts: Post[]
    errorMessage: string | null
    errorMessageScreen: string | null
    successfulMessage: string | null
    getPosts?: (page: number) => void
    likePost?: (postId: string) => void
    unlikePost?: (postId: string) => void
    createPost?: ({ title, content, file }: INewPost) => void

}
const defaultValue = { posts: [], errorMessage: null, errorMessageScreen: null, successfulMessage: null };
const Context = React.createContext<IPostContext>(defaultValue);


const Provider = ({ children }: { children: ReactElement }) => {
    const reducer = (state: any, action: Action) => {
        const { posts } = state
        const index = posts.findIndex((post: Post) => post._id === action.payload.postId)
        switch (action.type) {
            case "show_posts":
                return { ...state, posts: [].concat(posts).concat(action.payload) };
            case "like_post":
                posts[index].liked = action.payload.liked
                posts[index].likes = posts[index].likes.filter(
                    (profile: string) => profile !== action.payload.profile
                )
                posts[index].likes = [...posts[index].likes, action.payload.profile]
                return { ...state, posts };
            case "unlike_post":
                posts[index].liked = action.payload.liked
                posts[index].likes = posts[index].likes.filter(
                    (profile: string) => profile !== action.payload.profile
                )
                return { ...state, posts };
            case "errorComponent":
                return { ...state, errorMessage: action.payload }
            case "errorScreen":
                return { ...state, errorMessageScreen: action.payload }
            case "successfulMessage":
                return { ...state, successfulMessage: action.payload }
            default:
                return state
        }
    };

    const [state, dispatch] = useReducer(reducer, defaultValue);


    const getPosts = async (page: number) => {
        try {
            const token = await AsyncStorage.getItem("accessToken")
            const response = await server.auth(token as string).get(`/feed?page&=${page}`)
            const profile_id = await AsyncStorage.getItem("profile_id")
            const posts = response.data.map((post: Post) => {
                return { ...post, liked: post.likes.includes(profile_id as string) }
            })
            dispatch({ type: "show_posts", payload: posts })
        } catch (error) {
            Utils.setMessagensContext(dispatch, "errorScreen", "Houve um erro ao carregar o feed!");
        }
    }

    const likePost = async (postId: String) => {
        try {
            const token = await AsyncStorage.getItem("accessToken")
            const profile_id = await AsyncStorage.getItem("profile_id")
            await server.auth(token as string).post(`/posts/${postId}/like`)
            dispatch({ type: "like_post", payload: { postId, liked: true, profile_id } })
        } catch (err) {
            Utils.setMessagensContext(dispatch, "errorComponent", "Falha ao realizar o Like!");
        }
    }

    const unlikePost = async (postId: String) => {
        try {
            const token = await AsyncStorage.getItem("accessToken")
            const profile_id = await AsyncStorage.getItem("profile_id")
            await server.auth(token).post(`/posts/${postId}/unlike`)
            dispatch({ type: "unlike_post", payload: { postId, liked: false, profile_id } })
        } catch (err) {
            Utils.setMessagensContext(dispatch, "errorComponent", "Falha ao realizar o Like!");
        }
    }

    const createPost = async ({ title, content, file }: INewPost) => {
        try {
            const token = await AsyncStorage.getItem("accessToken")
            const data = new FormData()
            data.append('title', title)
            data.append('content', content)
            file ? data.append('file', file) : ''
            await server.upload(token).post('/posts', data)
            Utils.setMessagensContext(dispatch, "successfulMessage", "Post criado com sucesso!");
        } catch (err) {
            Utils.setMessagensContext(dispatch, "errorComponent", "Falha ao criar o Post!");

        }
    }


    return (
        <Context.Provider value={{ ...state, getPosts, likePost, unlikePost, createPost }}>
            {children}
        </Context.Provider>
    )
}

export { Provider, Context };