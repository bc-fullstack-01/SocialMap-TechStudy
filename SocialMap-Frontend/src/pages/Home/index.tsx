/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";

import CustomAppBar from '../../components/CustomAppBar';
import PostCard from '../../components/PostCard';
import ProfileSide from '../../components/ProfileSide'
import FeedRightSide from '../../components/FeedRightSide'

import { Post } from "../../Models/Post";
import server from '../../api/server';
import { Profile } from '../../Models/Profile'

import "./index.css";
import logo from '../../assets/logoAlert.png';

const profileClean = {
  _id: '',
  name: '',
  followers: [''],
  following: [''],
  posts: [''],
  user: ''
}


const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const profile_id = localStorage.getItem("profile");

  const [profile, setProfile] = useState<Profile>(profileClean)

  const [postsAll, setPostsAll] = useState<Post[]>([])
  const [posts, setPosts] = useState<Post[]>([]);

  const [page, setPage] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)


  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await server.get(`/feed?page=${page}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setHasMore(response.data.length > 0);

        var allPosts = [...postsAll, ...response.data]
        setPostsAll(allPosts)
        setPosts(allPosts)

      } catch (error) {
        toast.warning('Erro ao buscar postagens', {
          icon: () => <img src={logo} alt="logo SocialMap" />,
        });
      }
    }
    getPosts();
  }, [token, page]);

  const loadMorePosts = () => {
    setPage(page + 1);
  }

  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await server.get(`/profiles/${profile_id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data)
      } catch (error) {
        toast.warning('Erro ao obter o perfil!', {
          icon: () => <img src={logo} alt="logo SocialMap" />,
        });
      }
    }
    getProfile()
  }, [token])


  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    var value = e.target.value
    if (value) {
      var profilesFilted = postsAll.filter(post => `${post.title} ${post.content}`.includes(value))
      setPosts(profilesFilted)
    } else {
      setPosts(postsAll)

    }
  }

  return (
    <div>
      <CustomAppBar handleSearch={handleSearch} />

      <div className="Home">

        <ProfileSide profile={profile} />

        <div className='midDiv'>
          <InfiniteScroll
            dataLength={posts.length}
            next={loadMorePosts}
            hasMore={hasMore}
            loader={
              <h4 style={{ margin: 'auto' }}>Loading...</h4>
            }
          >
            {posts && posts.map((post) => (
              <div>
                <PostCard post={post} handlePostClick={handlePostClick} />
                <hr />
              </div>
            ))}
          </InfiniteScroll>
        </div>

        <FeedRightSide />

      </div>

    </div>
  );
};

export default Home;