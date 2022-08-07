import React, { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import server from '../../api/server'

import { ButtonsPerfilFollow } from "../../components/ButtonsProfile"
import CustomAppBar from '../../components/CustomAppBar';
import ProfileCard from '../../components/ProfileCard'
import PostCard from '../../components/PostCard';

import { Profile } from '../../Models/Profile'
import { Post } from "../../Models/Post";

import logo from '../../assets/logoAlert.png';
import './index.css'


const profileClean = {
  _id: '',
  name: '',
  followers: [''],
  following: [''],
  posts: [''],
  user: ''
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const { profileId } = useParams();

  const [profile, setProfile] = useState<Profile>(profileClean)

  const [postsAll, setPostsAll] = useState<Post[]>([])
  const [posts, setPosts] = useState<Post[]>([])

  const [page, setPage] = useState<number>(0)

  useEffect(() => {
    const getProfile = async () => {
      try {
        const responseProfile = await server.get(`/profiles/${profileId}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setProfile(responseProfile.data)
      } catch (error) {
        toast.warning('Erro ao obter o perfil!', {
          icon: () => <img src={logo} alt="logo SocialMap" />,
        });
      }
    }
    getProfile()
  }, [token, profileId])

  useEffect(() => {
    const getPosts = async () => {
      try {
        const responsePost = await server.get(`/feed/profile/${profileId}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setPostsAll(responsePost.data)
        setPosts(responsePost.data)

      } catch (error) {
        toast.warning('Erro ao obter os Posts!', {
          icon: () => <img src={logo} alt="logo SocialMap" />,
        });
      }
    }
    getPosts()
  }, [token, profileId])

  const loadMorePosts = () => {
    setPage(page + 1);
  }

  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  }

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    var value = e.target.value
    if (value) {
      var profilesFilted = postsAll.filter(post => `${post.title} ${post.content}`.includes(value))
      setPosts(profilesFilted)
    } else setPosts(postsAll)
  }


  return (
    <>
      <CustomAppBar handleSearch={handleSearch} />
      <div className='ProfileBody'>
        
        <ProfileCard profile={profile}>
          <ButtonsPerfilFollow profileId={profileId as string} />
        </ProfileCard>
        <br />

        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={false}
          loader={<h4>Loading...</h4>}
        >
          {posts && posts.map((post) => (
            <div key={post._id}>
              <PostCard post={post} handlePostClick={handlePostClick} />
              <hr />
            </div>
          ))}
        </InfiniteScroll>

      </div>
    </>
  );
}

export default ProfilePage;