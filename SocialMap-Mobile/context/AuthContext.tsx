import React, { ReactElement, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import jwtDecode from "jwt-decode";

import server from "../api/server";


interface TokenUser {
    name: string
    user: string
    profile_id: string
    midia: string | null
}

interface Action {
    type: string
    payload?: any
}

interface LoginIProp {
    user: string
    password: string
}

interface RegisterIProp extends LoginIProp {
    name: string
    passwordConfirm: string
}

interface IAuthContext {
    token: string | null
    user: string | null
    profile_id: string | null
    name?: string
    midia?: string | null
    errorMessage?: string
    successfulMessage?: string
    isLoading: boolean
    login?: () => void
    register?: () => void
    loginStorage?: () => void
}

const defaultValue = {
    token: null,
    user: null,
    profile_id: null,
    isLoading: true,
}


const Context = React.createContext<IAuthContext>(defaultValue)

const Provider = ({ children }: { children: ReactElement }) => {

    const reducer = (state: any, action: Action) => {
        switch (action.type) {
            case "login":
                return { ...state, ...action.payload, isLoading: false }
            case "error":
                return { ...state, errorMessage: action.payload }
            case "successfulMessage":
                return { ...state, successfulMessage: action.payload }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, defaultValue)

    const login = (dispatch: any) => {
        return async ({ user, password }: LoginIProp) => {
            try {
                const response = await server.post("/unsecurity/login", {
                    user,
                    password
                })
                const { accessToken } = response.data
                const decoded = jwtDecode(accessToken) as TokenUser
                AsyncStorage.setItem("accessToken", accessToken)
                AsyncStorage.setItem("user", decoded.user)
                AsyncStorage.setItem("profile_id", decoded.profile_id)
                AsyncStorage.setItem("name", decoded.name)
                AsyncStorage.setItem("midia", decoded.midia)
                dispatch({ type: "login", payload: { token: accessToken, profile: decoded.profile_id, user: decoded.user } })
            } catch (err: any) {
                err.response.status === 401 ?
                    setMessagens("error", "Usuario ou Senha incorretos!") :
                    setMessagens("error", "Houve algum erro inesperado!")
            }
        }
    }

    const loginStorage = (dispatch: any) => async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken")
            const profile_id = await AsyncStorage.getItem("profile_id")
            const user = await AsyncStorage.getItem("user")
            const name = await AsyncStorage.getItem("name")
            const midia = await AsyncStorage.getItem("midia")
            console.log(token, profile_id, user, name, midia)
            dispatch({
                type: "login", payload: { token, profile_id, user, name, midia }
            })
        } catch (err) {
            setMessagens("error", "Por favor faço o login novamente!", { isLoading: true })
        }
    }

    const register = (dispatch: any) => async ({ name, user, password, passwordConfirm }: RegisterIProp) => {
        if (password === passwordConfirm) {
            try {
                await server.post("/unsecurity/register", {
                    name,
                    user,
                    password,
                })
                setMessagens("successfulMessage", "Usuario criado com sucesso tentando fazer o login")
                login(dispatch)({ user, password })

            } catch (err) {
                setMessagens("error", "Erro na criação do usuario!")
            }
        } else {
            setMessagens('error', 'Senhas não correspondem!')
        }
    }

    const setMessagens = (type: string, menssage: string, other: any = {}) => {
        dispatch({ ...other, type: type, payload: menssage })
        setTimeout(() => {
            dispatch({ type: type, payload: "" })
        }, 2500)
    }


    return (
        <Context.Provider value={{
            ...state,
            login: login(dispatch),
            register: register(dispatch),
            loginStorage: loginStorage(dispatch)
        }}>
            {children}
        </Context.Provider>
    )
}

export { Provider, Context }