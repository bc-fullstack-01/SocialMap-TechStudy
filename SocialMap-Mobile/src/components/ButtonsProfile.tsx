import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext"
import { Button } from "@rneui/base";
import { navigate } from '../../RootNavigation';


export const ButtonsProfileSelf = () => {
    const { logout } = useContext(AuthContext)
    return (
        <View style={styles.container}>
            <Button
                buttonStyle={styles.buttom}
                radius={12}
                title="Editar"
                color='primary'
                onPress={() => navigate('EditProfile')}
            />
            <Button
                radius={12}
                buttonStyle={styles.buttom}
                color='error'
                title="Logout"
                onPress={() => logout()}
            />

        </View>
    )
}


export const ButtonsProfileFollow = ({ profileId }: { profileId: string }) => {
    return (
        <View style={styles.container}>
            <Button
                buttonStyle={styles.buttom}
                radius={12}
                title="Seguir"
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

    },
    buttom: {
        width: 120,
        height: 30,
        padding: 0,
    }
})

