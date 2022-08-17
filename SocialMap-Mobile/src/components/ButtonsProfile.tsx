import React, { useContext, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@rneui/base";

import { Context as AuthContext } from "../context/AuthContext"
import { navigate } from '../../RootNavigation';
import server from "../api/server";


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


export const ButtonsProfileFollow = ({ id, followers }: { id: string, followers: string[] }) => {
    const { createAlert, profile_id, token } = useContext(AuthContext)
    const [following, setFollowing] = useState<string[]>(followers);

    
    const handleFollow = async () => {
        try {
            await server.auth(token).post(`/profiles/${id}/follow`)
            setFollowing([profile_id])
        } catch {
            createAlert({ msg: 'Falha ao seguir esse perfil. Porfavor tente mais tarde!', type: 'error' })
        }
    }

    const handleUnfollow = async () => {
        try {
            await server.auth(token).post(`/profiles/${id}/unfollow`)
            setFollowing([])
        } catch (erro){
            console.log(erro, id)
            createAlert({ msg: 'Falha ao desseguir esse perfil. Porfavor tente mais tarde!', type: 'error' })
        }
    }
    return (
        <View style={styles.container}>
            {following.includes(profile_id) ?
                (<Button
                    color={'red'}
                    buttonStyle={styles.buttom}
                    radius={12}
                    title="Desseguir"
                    onPress={handleUnfollow}
                />) :
                (<Button
                    buttonStyle={styles.buttom}
                    radius={12}
                    title="Seguir"
                    onPress={handleFollow}
                />)
            }

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

