import React, { useEffect, useState, useCallback } from 'react';
import { Input, Button, Text, Divider } from '@rneui/base';
import { View, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"

import CustomAvatar from "../components/CustomAvatar";
import CardPost from '../components/CardPost';
import Spacer from '../components/Spacer';
import { Post } from '../models/Post';
import server from '../api/server';
import Utils from "../Utils"

export default function PostScreen({ route }: { route: any }) {
    const { id } = route.params;
    const [comment, setComment] = useState('');
    const [post, setPost] = useState<Post>();

    const [, updateState] = useState<any>();
    const Update = useCallback(() => updateState({}), []);


    useEffect(() => {
        const getPost = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                const profile_id = await AsyncStorage.getItem('profile_id');
                const response = await server.auth(token).get(`/posts/${id}`)
                const post = {
                    ...response.data,
                    liked: response.data.likes.includes(profile_id),
                };
                setPost(post);
            } catch (err) {
                console.log('getPost', err);
            }
        };
        getPost();
    }, []);

    const addComment = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            const profile_id = await AsyncStorage.getItem('profile_id');
            const name = await AsyncStorage.getItem('name');
            const midia = await AsyncStorage.getItem('midia');

            const response = await server.auth(token).post(`/posts/${id}/comment`, { description: comment });
            const newComment = {
                ...response.data,
                profile: {
                    _id: profile_id,
                    name: name,
                    midia: midia ? midia : null,
                }
            }
            post?.comments.unshift(newComment);
            setPost(post)
            Update()
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <ScrollView>
            {post ? (
                <View>
                    <CardPost post={post} />
                    <Spacer>
                        <>
                            <Divider />
                            <Spacer />
                            <Input
                                label='Novo comentario:'
                                value={comment}
                                onChangeText={setComment}
                                multiline={true}
                                numberOfLines={3}
                            />
                            <Button buttonStyle={styles.button} title='comentar' onPress={() => {
                                setComment('')
                                addComment()
                            }} />
                            <Spacer />
                            {post.comments.map((item) => (
                                <View style={styles.container} key={item._id}>
                                    <View style={styles.header}>
                                        <CustomAvatar id={item.profile._id} name={item.profile.name} midia={item.profile.midia} />
                                        <Text style={styles.name}>{Utils.capitalizeFirstLetter(item.profile.name)}</Text>
                                    </View>
                                    <Text style={styles.text}>{item.description}</Text>
                                </View>
                            ))
                            }

                        </>
                    </Spacer>
                </View>
            ) : null}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    list: {
        height: "100%",
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 0,
    },
    name: {
        marginLeft: 8,
        fontWeight: "bold",
        fontSize: 20,
    },
    text: {
        fontSize: 14,
        marginLeft: 10,
        marginTop: 10,
    },
    button: {
        alignSelf: 'flex-end',
        width: '33%'
    }
})


