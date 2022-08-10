import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { Avatar } from "react-native-elements";
import {Context as PostContext} from "../context/PostContext"
import {Context as AuthContext} from "../context/AuthContext"
import {  Button } from "@rneui/base";
import SpacerComment from "../components/SpacerComment"

const UselessTextInput = (props) => {
    return (
      <TextInput
        {...props} 
        editable
        maxLength={160}
      />
    );
}

export default function PostScreen (){
    const {post, like, unlike, createComment} = useContext(PostContext)
    const {profile} = useContext(AuthContext)
    const getInitials = (name: string) => name.split(" ").slice(0,2).map(name => name[0])

    const handleComment =  (id: string, comment: string) => {
        createComment(id, comment)
        setComment("")
    }

    const [comment, setComment] = useState("")
      

    return (
        <>
            <View style={styles.content}>
                <Avatar overlayContainerStyle={{backgroundColor: 'red'}} rounded title={getInitials(post.profile.name)[0] }></Avatar>
                <Text style={{marginLeft: 10}}>{post.title}</Text>
            </View>  
           
            <View>
                {post.image ? (
                    <Image source={{uri:post.content}} style={{width: 400, height: 400}}></Image>
                ): (
                    <Text style={{marginLeft: 10, marginRight: 10}}>{post.content}</Text>
                )}
            </View>
            <View
                 style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                margin: 10
                }}
            />  
            <View style={styles.content}>
                <Text style={{fontWeight: "bold"}}>{post.comments.length} Comentários</Text>
                <TouchableOpacity onPress={() =>  {post.likes.includes(profile) ? unlike(post._id) : like(post._id) }}>
                    <Text style={{fontWeight: "bold", marginLeft: 10}}>{post.likes.length} Curtidas</Text>
                </TouchableOpacity>
            </View>
            <View
                 style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                margin: 10
                }}
            />  
            <View>
                <Text style={{fontWeight: "bold", margin: 10}}>Comentário</Text>
                <UselessTextInput
                    multiline
                    numberOfLines={3}
                    onChangeText={setComment}
                    value={comment}
                    style={{paddingLeft: 10, paddingRight: 10}}
                />
                <View
                    style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginLeft: 10,
                    marginRight: 10   
                    }}
                />
                <SpacerComment>
                    <Button 
                        title="Publicar"
                        onPress={() => handleComment(post._id, comment) }
                    ></Button>
                </SpacerComment>
            </View>
            <View
                 style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                margin: 10
                }}
            />  
            {post.comments.map(( c) => (    
                <View key={c._id}>       
                    <View style={styles.content} > 
                        <Avatar overlayContainerStyle={{backgroundColor: 'red'}} rounded title={getInitials(c.profile.name)[0] }></Avatar>
                        <Text style={{marginLeft: 10, marginRight: 10}}>{c.content}</Text>
                        
                    </View> 
                    <View
                    style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    margin: 10
                    }}
                    />  
                </View>
            ))}
           
        </>
        
        
    )
}

const styles = StyleSheet.create({
    content:{
        
        flexDirection:'row',
        
        margin: 10,
        alignItems:"center",
        justifyContent:'flex-start'
    }
})