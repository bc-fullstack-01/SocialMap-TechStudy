import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input, Button } from "@rneui/base";
import Spacer from "./Spacer";
import ToastPer from './Toast'


import logo from "../assets/images/parrot-pngrepo-com.png"

interface IProps {
    submitButtonText: string
    onSubmit: any
    link: any
    linkText: string
    errorMessage: string | undefined
    successfulMessage?: string | undefined
}


export default function RegisterForm({
    submitButtonText,
    onSubmit,
    link,
    linkText,
    errorMessage,
    successfulMessage }: IProps) {

    const [name, setName] = useState("");
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("");

    return (
        <>
            <Spacer>
                <>
                    <Text style={styles.title}>SocialMap</Text>
                    <Text style={styles.subTitle}>A melhor comunidade de desenvolvedores!</Text>
                </>
            </Spacer>
            <Spacer />
            <View style={styles.container}>
                <Input
                    label="Nome"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Input
                    label="Usuário"
                    value={user}
                    onChangeText={setUser}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Input
                    secureTextEntry
                    label="Senha"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Input
                    secureTextEntry
                    label="Confirmar senha"
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Spacer>
                    <Button
                        title={submitButtonText}
                        onPress={() => onSubmit({ name, user, password, passwordConfirm })}
                    ></Button>
                </Spacer>

                <TouchableOpacity onPress={() => link()}>
                    <Spacer>
                        <Text style={styles.link}>{linkText}</Text>
                    </Spacer>
                </TouchableOpacity>
            </View>

            <ToastPer msg={successfulMessage} type={'success'} />
            <ToastPer msg={errorMessage} type={'error'} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 18,
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 10
    },
    title: {
        fontSize: 50,
        alignSelf: "center",
        fontWeight: "800",
        color: '#1775ee'
    },
    subTitle: {
        fontSize: 18,
        fontFamily: 'sans-serif-light',
    },
    link: {
        color: "blue",
        alignSelf: "center"
    },
    success: {
        color: "green",
        alignSelf: "center"
    }
})