import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from '@expo/vector-icons';

import ProfileScreen from "./ProfileScreen";
import EditProfile from "./EditProfile";
import CreatePostScreen from "./CreatePostScreen";
import { TouchableOpacity } from "react-native";
import PostListScreen from "./PostListScreen";
import PostScreen from "./PostScreen";

const Stack = createNativeStackNavigator()

const Tab = createBottomTabNavigator();

const HomeNavigationScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="PostList" component={PostListScreen} options={({ navigation }) => ({
                headerRight: () => (
                    <TouchableOpacity>
                        <MaterialIcons name="edit" size={24} color="white" onPress={() => navigation.navigate("PostCreate")} />
                    </TouchableOpacity>
                ),
                title: "SocialMap"
            })} />
            <Stack.Screen name="PostDetail" component={PostScreen} options={{ title: "Post" }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "Editar Perfil" }} />
            <Stack.Screen name="PostCreate" component={CreatePostScreen} options={{ title: "Criar Post" }} />
        </Stack.Navigator>
    )
}

export default HomeNavigationScreen