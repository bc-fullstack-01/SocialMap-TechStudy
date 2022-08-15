import React, { useContext, useState } from "react";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet,  } from "react-native";

import { Context as AuthContext } from "../context/AuthContext"
import RegisterForm from "../components/RegisterForm";
import ToastPer from '../components/Toast'


interface Props {
    navigation: NativeStackNavigationProp<any, any>
}

export default function RegisterScreen({ navigation }: Props) {

    const { register, errorMessage, successfulMessage } = useContext(AuthContext)

    const link = () => {
        navigation.navigate("Login")
    }

    return (
        <LinearGradient
            colors={['#97d9e1', '#d9afd9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <RegisterForm
                submitButtonText="Registrar"
                onSubmit={register}
                link={link}
                linkText="Já tem uma conta? Faça o login"
            />
            <ToastPer msg={successfulMessage as string} type={'success'} />
            <ToastPer msg={errorMessage as string} type={'error'} />
            
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        paddingBottom: 50,
        paddingTop: 70,
        paddingHorizontal: 15,
    }

})  