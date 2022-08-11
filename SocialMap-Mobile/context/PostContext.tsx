import React, { ReactElement, useReducer } from "react";
import * as SecureStore from 'expo-secure-store'

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
            const token = await SecureStore.getItemAsync("token")
            const response = await server.get("/feed?page=0", {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
            dispatch({ type: "show_posts", payload: response.data })
        } catch (error) {
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