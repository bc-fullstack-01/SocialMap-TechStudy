import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { TextField, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import CustomAppBar from '../../components/CustomAppBar';
import { DropZoneEdit } from '../../components/DropZone';
import { Profile } from '../../Models/Profile'
import server from '../../api/server';

import logo from '../../assets/logoAlert.png';
import './index.css'

const profileClean = {
    _id: '',
    name: '',
    about: '',
    followers: [''],
    following: [''],
    posts: [''],
    user: ''
}

const EditPerfil = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    const profileId = localStorage.getItem("profile");

    const [profile, setProfile] = useState<Profile>(profileClean)
    const [showSelectPhoto, setShowSelectPhoto] = useState<boolean>(false)

    const [selectedFile, setSelectedFile] = useState<File>();
    const [formData, setFormData] = useState({
        name: '',
        about: '',
    });


    useEffect(() => {
        const getProfile = async () => {
            try {
                const responseProfile = await server.get(`/profiles/${profileId}`, {
                    headers: { authorization: `Bearer ${token}` }
                });
                setProfile(responseProfile.data)
                setFormData({
                    name: responseProfile.data.name,
                    about: responseProfile.data.about,
                })
            } catch (error) {
                toast.warning('Erro ao obter o perfil!', {
                    icon: () => <img src={logo} alt="logo SocialMap" />,
                });
            }
        }
        getProfile()
    }, [token, profileId])


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const { name, about } = formData;
        const data = new FormData();

        data.append("name", name);
        data.append("about", about as string);
        if (selectedFile) {
            data.append("file", selectedFile);
        };

        try {
            await server.put('/profiles', data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success('Perfil editado com sucesso!', {
                icon: () => <img src={logo} alt="logo" />,
            });

            navigate("/home");
        } catch (err) {
            toast.warning('Ocorreu um erro ao editar o perfil!', {
                icon: () => <img src={logo} alt="logo SocialMap" />,
            });
        }
    }

    return (
        <div style={{ marginTop: '50px' }}>
            <CustomAppBar />

            <div className='mainNewPost'>

                <div className="ProfileImageEdit">
                    {showSelectPhoto ?
                        <>
                            <DropZoneEdit onFileUploaded={setSelectedFile} midia={profile.midia} />
                            <Button variant='contained' onClick={() => { }}>Clique na imagem</Button>
                        </>
                        :
                        <>
                            <img src={profile.midia} alt="profile" className="ImageEdit" />
                            <Button variant='contained' onClick={() => setShowSelectPhoto(true)}>Editar</Button>
                        </>
                    }
                </div>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={6}>

                        <h3 className='titleEdit'>Nome</h3>
                        <TextField
                            variant='standard'
                            name='name'
                            value={formData.name}
                            placeholder={profile.name}
                            onChange={handleInputChange}
                            style={{ marginTop: '10px' }}
                        />

                        <h3 className='titleEdit'>Descrição</h3>
                        <TextField
                            variant='standard'
                            name='about'
                            multiline
                            minRows={3}
                            placeholder={profile.about}
                            value={formData.about}
                            onChange={handleInputChange}
                            style={{ marginTop: '10px' }}
                        />

                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Button color={'error'} variant='contained' onClick={() => window.location.reload()}>Cancelar</Button>
                            <Button variant='contained' color={'success'} type='submit'>Salvar</Button>
                        </div>

                    </Stack>
                </form>
            </div>
        </div>
    );
}

export default EditPerfil;