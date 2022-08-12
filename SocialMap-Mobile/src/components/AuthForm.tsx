import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input, Button } from "@rneui/base";
import Spacer from "./Spacer";


interface Props {
    submitButtonText: string
    onSubmit: any
    link: () => void
    linkText: string
}

export default function AuthForm({
    submitButtonText,
    onSubmit,
    link,
    linkText }: Props) {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    return (
        <View style={styles.main}>
            <Spacer>
                <>
                    <Text style={styles.title}>SocialMap</Text>
                    <Text style={styles.subTitle}>A melhor comunidade de desenvolvedores!</Text>
                </>
            </Spacer>
            <Spacer />
            <View style={styles.container}>
                <Input
                    label="Usuário"
                    value={user}
                    onChangeText={setUser}
                    autoCapitalize="none"
                    autoCorrect={false}
                ></Input>
                <Spacer />
                <Input
                    secureTextEntry
                    label="Senha"
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                ></Input>
                <Spacer>
                    <Button
                        title={submitButtonText}
                        onPress={() => onSubmit({ user, password })}
                    ></Button>
                </Spacer>

                <TouchableOpacity onPress={() => link()}>
                    <Spacer>
                        <Text style={styles.link}>{linkText}</Text>
                    </Spacer>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 18,
        paddingTop: 30,
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