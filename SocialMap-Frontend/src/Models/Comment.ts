import { Profile } from './Profile'

export interface Comment {
    _id: string;
    post: string;
    description: string;
    profile: Profile ;
    likes: string[];
}