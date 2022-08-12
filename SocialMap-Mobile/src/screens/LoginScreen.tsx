import React, { useContext } from "react";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import { Context as AuthContext } from "../context/AuthContext"
import AuthForm from "../components/AuthForm";

interface Props {
    navigation: NativeStackNavigationProp<any, any>
}

export default function LoginScreen({ navigation }: Props) {
    const { login, errorMessage } = useContext(AuthContext)

    const link = () => {
        navigation.navigate("Register")
    }

    return (
        <LinearGradient
            colors={['#97d9e1', '#d9afd9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <AuthForm
                submitButtonText="Logar"
                onSubmit={login}
                link={link}
                linkText="Não tem uma conta? Faça o cadastro"
                errorMessage={errorMessage}
            />
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