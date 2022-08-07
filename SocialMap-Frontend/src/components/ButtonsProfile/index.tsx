/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import server from '../../api/server'

import { Button } from '@mui/material';
import { toast } from 'react-toastify';

import logo from '../../assets/logoAlert.png';

import './index.css'


export const ButtonsPerfilSelf = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    return (
        <div className="comands-profile-self">
            <Button variant='contained'
                sx={{ width: '100%' }}
                onClick={() => navigate("/profile/edit")}
            >
                Editar
            </Button>
            <Button variant='contained'
                sx={{ width: '100%' }}
                onClick={() => handleLogout()}
                color='error'
            >
                Logout
            </Button>

        </div>
    )
}


export const ButtonsPerfilFollow = ({ profileId }: { profileId: string }) => {
    const navigate = useNavigate();

    const token = localStorage.getItem("accessToken");
    const selfProfileId = localStorage.getItem("profile");

    const [following, setFollowing] = useState<string[]>();

    useEffect(() => {
        const getProfile = async () => {
            try {
                const responseProfile = await server.get(`/profiles/${selfProfileId}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                setFollowing(responseProfile.data.following)
            } catch (error) {
                toast.warning('Erro ao obter o perfil!', {
                    icon: () => <img src={logo} alt="logo SocialMap" />,
                });
            }
        }
        getProfile()
    }, [token])


    const handleFollow = async () => {
        try {
            await server.post(`/profiles/${profileId}/follow`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFollowing([profileId])
            window.location.reload();
        } catch (err) {
            toast.error('Ocorreu um erro ao tentar seguir', {
                icon: () => <img src={logo} alt="logo SocialMap" />,
            });
        }
    }

    const handleUnfollow = async () => {
        try {
            await server.post(`/profiles/${profileId}/unfollow`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFollowing([])
            window.location.reload();

        } catch (err) {
            toast.error('Ocorreu um erro ao tentar seguir', {
                icon: () => <img src={logo} alt="logo SocialMap" />,
            });
        }
    }

    if (selfProfileId === profileId) {
        navigate(`/profile`);
    }

    return (
        <div className="comands-profile-other">
            {following && following.includes(profileId) ?
                <Button variant='contained'
                    sx={{ width: '100%' }}
                    onClick={() => handleUnfollow()}
                > Desseguir
                </Button>
                :
                <Button variant='contained'
                    sx={{ width: '100%' }}
                    onClick={() => handleFollow()}
                > Seguir
                </Button>
            }

        </div>
    )
}



