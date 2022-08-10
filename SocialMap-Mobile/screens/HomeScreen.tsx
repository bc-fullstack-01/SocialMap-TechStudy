import React, { useContext, useEffect } from "react";
import { Avatar } from 'react-native-elements';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from "react-native";

import { Context as PostContext } from "../context/PostContext"
import { Post } from "../models/Post";



export default function HomeScreen() {
    const { posts, feed, getPostFromId } = useContext(PostContext)

    useEffect(() => {
        feed()
    }, [])

    const getInitials = (name: string) => name.split(" ").slice(0, 2).map(name => name[0])
    const renderItem = ({ item }: { item: Post }) => {
        return (
            <>
                <View style={styles.content}>

                    <Avatar overlayContainerStyle={{ backgroundColor: 'red' }} rounded title={getInitials(item.profile.name)[0]}></Avatar>
                    <Text style={{ marginLeft: 10 }}>{item.title}</Text>
                </View>
                <TouchableOpacity onPress={() => getPostFromId(item._id)}>
                    <View>
                        {item.midia ?
                            (
                                <Image source={{ uri: item.midia }} style={{ width: 400, height: 400 }}></Image>
                            ) : (
                                <Text style={{ marginLeft: 10, marginRight: 10 }}>{item.midia}</Text>

                            )}
                    </View>
                </TouchableOpacity>
                <View style={styles.content}>
                </View>
            </>
        )
    }

    return (
        <View  >
            {posts ? (
                <FlatList
                    data={posts}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                />
            ) : (<></>)}

        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',

        margin: 10,
        alignItems: "center",
        justifyContent: 'flex-start'
    },
    contentPost: {
        flex: 1,
        flexDirection: "column"
    }
})