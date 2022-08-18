import React, { ReactElement, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import jwtDecode from "jwt-decode";

import { Action } from "../models/Actions"
import server from "../api/server";
import Utils from "../Utils"
import { Profile } from '../models/Profile'
import Cover from "../assets/backgroundPerfil";


interface TokenUser {
    name: string
    user: string
    profile_id: string
    midia: string | null
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
    profile: Profile,
    alert: any
    isLoading: boolean
    background: any,
    dispatch?: () => void,
    login?: () => void
    register?: () => void
    loginStorage?: () => void
    logout?: () => void
    getProfile?: () => void
    createAlert?: ({ msg, type }: { msg: string, type: "error" | "success" }) => void
}

const profileClean = {
    _id: '',
    name: '',
    followers: [''],
    following: [''],
    posts: [''],
    user: ''
}

const defaultValue = {
    token: null,
    user: null,
    profile_id: null,
    isLoading: true,
    profile: profileClean,
    background: Cover[Utils.randomNumber(0, Cover.length)],
    alert: { msg: '', alert: '' }
}


const Context = React.createContext<IAuthContext>(defaultValue)

const Provider = ({ children }: { children: ReactElement }) => {

    const reducer = (state: any, action: Action) => {
        switch (action.type) {
            case "login":
                return { ...state, ...action.payload, isLoading: false }
            case "logout":
                return { ...state, ...action.payload, isLoading: false }
            case "setProfile":
                return { ...state, profile: action.payload }
            case "alert":
                return { ...state, alert: action.payload }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, defaultValue)

    const login = async ({ user, password }: LoginIProp) => {
        try {
            const response = await server.noAuth.post("/unsecurity/login", { user, password })
            const { accessToken } = response.data
            const decoded = jwtDecode(accessToken) as TokenUser

            AsyncStorage.setItem("accessToken", accessToken)
            AsyncStorage.setItem("user", decoded.user)
            AsyncStorage.setItem("profile_id", decoded.profile_id)
            AsyncStorage.setItem("name", decoded.name)

            dispatch({ type: "login", payload: { token: accessToken, profile_id: decoded.profile_id, user: decoded.user, name: decoded.name } })

        } catch (err: any) {
            err.response.status === 401 ?
                createAlert({ msg: "Usuario ou Senha incorretos!", type: 'error' }) :
                createAlert({ msg: "Houve algum erro inesperado!", type: 'error' })
        }
    }

    const loginStorage = async () => {
        try {
            const token = await AsyncStorage.getItem("accessToken")
            const profile_id = await AsyncStorage.getItem("profile_id")
            const user = await AsyncStorage.getItem("user")
            const name = await AsyncStorage.getItem("name")
            dispatch({
                type: "login", payload: { token, profile_id, user, name }
            })
        } catch (err) {
            Utils.setMessagensContext(dispatch, "alert", { msg: "Por favor faça o login novamente!", type: 'error' }, { isLoading: true })
        }
    }

    const register = async ({ name, user, password, passwordConfirm }: RegisterIProp) => {
        if (password === passwordConfirm) {
            try {
                await server.noAuth.post("/unsecurity/register", { name, user, password })
                createAlert({ msg: "Usuario criado com sucesso tentando fazer o login", type: 'success' })
                login({ user, password })
            } catch (err) {
                createAlert({ msg: "Erro na criação do usuario!", type: 'error' })
            }
        } else {
            createAlert({ msg: 'Senhas não correspondem!', type: 'error' })
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem("accessToken")
        await AsyncStorage.removeItem("profile_id")
        await AsyncStorage.removeItem("user")
        await AsyncStorage.removeItem("name")
        dispatch({ type: "logout", payload: defaultValue })
    }

    const getProfile = async () => {
        const token = await AsyncStorage.getItem("accessToken")
        const profile_id = await AsyncStorage.getItem("profile_id")
        try {
            const response = await server.auth(token).get(`/profiles/${profile_id}`)
            dispatch({ type: "setProfile", payload: response.data })
        } catch (error) {
            createAlert({ msg: "Erro na busca do perfil!", type: 'error' })
        }
    }

    const createAlert = ({ msg, type }: { msg: string, type: string }) => {
        Utils.setMessagensContext(dispatch, "alert", { msg: msg, type: type })
    }

    return (
        <Context.Provider value={{ ...state, dispatch, login, register, loginStorage, logout, getProfile, createAlert }}>
            {children}
        </Context.Provider>
    )
}

export { Provider, Context }