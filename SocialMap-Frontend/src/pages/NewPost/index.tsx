import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import CustomAppBar from '../../components/CustomAppBar';
import DropZone from '../../components/DropZone';
import server from '../../api/server';

import logo from '../../assets/logoAlert.png';
import './index.css'

const NewPost = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [selectedFile, setSelectedFile] = useState<File>();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { title, content } = formData;
    const data = new FormData();

    data.append("title", title);
    data.append("content", content);
    if (selectedFile) {
      data.append("file", selectedFile);
    };

    try {
      await server.post('/posts', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Post criado com sucesso!', {
        icon: () => <img src={logo} alt="logo" />,
      });
      navigate("/home");

    } catch (err) {
      toast.error('Ocorreu um erro ao criar o Post', {
        icon: () => <img src={logo} alt="logo SocialMap" />,
      });
    }
  }

  return (
    <div>
      <CustomAppBar />

      <div className='mainNewPost'>
        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>

            <TextField
              variant='standard'
              label='Título'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
            />

            <TextField
              variant='standard'
              label='Manda a boa!'
              name='content'
              multiline
              minRows={3}
              value={formData.content}
              onChange={handleInputChange}
            />

            <DropZone onFileUploaded={setSelectedFile} />
            <Button variant='contained' type='submit'>Publicar</Button>

          </Stack>
        </form>
      </div>
    </div>
  );
}

export default NewPost;