import { Profile } from './Profile'
import { Comment } from './Comment'

export interface Post {
    _id: string;
    title: string;
    content: string;
    midia?: string;
    profile: Profile;
    comments: Comment[];
    likes: string[];
}