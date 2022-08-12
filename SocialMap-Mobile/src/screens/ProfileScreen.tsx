import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/AuthContext"
import { Button } from "@rneui/base";

export default function ProfileScreen() {
    const { logout, errorMessage } = useContext(AuthContext)


    return (
        <View style={styles.container}>
            <Text>ProfileScreen</Text>
            <Button
                title="Sair"
                onPress={() => logout()}
            ></Button>        
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    }
})