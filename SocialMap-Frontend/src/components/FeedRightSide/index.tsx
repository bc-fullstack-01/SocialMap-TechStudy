import React, { memo, useState, useEffect } from 'react'
import { CardHeader, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import CustomAvatar from '../../components/CustomAvatar';
import server from '../../api/server';
import { toast } from 'react-toastify';

import { Profile } from "../../Models/Profile"
import Utils from "../../Utils"
import logo from '../../assets/logoAlert.png';

import "./index.css"


const FeedRightSide = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("accessToken");
    const selfProfile = localStorage.getItem("profile");

    const [profiles, setProfiles] = useState<Profile[]>()


    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await server.get(`/profiles/${selfProfile}/followers`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                setProfiles(response.data.users)
            } catch (error) {
                toast.warning('Erro ao obter o perfil de seguidores!', {
                    icon: () => <img src={logo} alt="logo SocialMap" />,
                });
            }
        }
        getProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    return (
        <div className="ProfileSideRight">
            <div className='card'>
                <h3 className='title'>Quem são seus seguidores:</h3>

                {profiles ?
                    profiles.map((profile) => (
                        <div className='cardFollower'>
                            <CardHeader
                                avatar={<CustomAvatar name={profile.name} profile_id={profile._id} midia={profile.midia} />}
                                title={<h4>{Utils.fistToUpperCase(profile.name.split(' ')[0])}</h4>}
                                style={{ padding: 0 }}
                            />
                            <Button variant='contained'
                                onClick={() => navigate(`/profile/${profile._id}`)}
                            > Espiar
                            </Button>
                        </div>
                    ))
                    :
                    <></>
                }

            </div>
        </div>
    )
}

export default memo(FeedRightSide)