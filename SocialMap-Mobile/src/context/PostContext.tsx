import React, { ReactElement, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

import server from "../api/server";
import { Post } from "../models/Post";


interface Action {
    type: string;
    payload: any;
}

interface IPostContext {
    posts: Post[];
    errorMessage: string | null;
    getPosts?: () => void;
}

const defaultValue = { posts: [], errorMessage: null };

const Context = React.createContext<IPostContext>(defaultValue);

const reducer = (state: any, action: Action) => {
    switch (action.type) {
        case "show_posts":
            return { ...state, posts: action.payload };
        case "add_error":
            return { ...state, errorMessage: action.payload }
    }
};

const Provider = ({ children }: { children: ReactElement }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);


    const getPosts = (dispatch: any) => async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken")
            const page = 0
            const response = await server.get(`/feed?page&=${page}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
            // console.log('getPosts',response.data)
            dispatch({ type: "show_posts", payload: response.data })
        } catch (error) {
            console.log(error)
            dispatch({
                type: "add_error",
                payload: "Houve um erro ao carregar o feed",
            });
        }
    }

    return (
        <Context.Provider value={{ ...state, getPosts: getPosts(dispatch) }}>
            {children}
        </Context.Provider>
    )
}

export { Provider, Context };