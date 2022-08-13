import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext"
import { Button } from "@rneui/base";


export const ButtonsProfileSelf = () => {
    const { logout } = useContext(AuthContext)
    return (
        <View style={styles.container}>
            <Button
                buttonStyle={styles.buttom}
                radius={12}
                title="Editar"
                color='primary'
                onPress={() => { }}
            />
            <Button
                radius={12}
                buttonStyle={styles.buttom}
                color='error'
                title="Sair"
                onPress={() => logout()}
            />

        </View>
    )
}


export const ButtonsProfileFollow = ({ profileId }: { profileId: string }) => {
    return (
        <View style={styles.container}>
            <Button
                title="Editar"
                onPress={() => { }}
            ></Button>
            <Button
                title="Sair"
                onPress={() => { }}
            ></Button>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '89%',
        flexDirection: 'row',
        top: -65,
        justifyContent: 'space-between',

        // borderColor: 'black',
        // borderStyle: 'solid',
        // borderWidth:1
    },
    buttom: {
        width: 120,
        height: 30,
        padding: 0,
    }
})

