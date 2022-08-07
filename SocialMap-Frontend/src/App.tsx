import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Home from './pages/Home';
import Singin from './pages/Signin';
import Singup from './pages/Signup';
import NewPost from './pages/NewPost';
import PostDetail from './pages/PostDetail';
import ProfilePage from './pages/Profile';
import Profiles from './pages/Profiles';
import ProfileSelf from './pages/ProfileSelf';
import EditPerfil from './pages/EditPerfil';

import AlertsContext from './contexts/AlertsContext'


import './App.css';

function App() {
  return (
    <AlertsContext>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Routes>
          <Route path='/' element={<Singin />}></Route>
          <Route path='/register' element={<Singup />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/profile' element={<ProfileSelf />}></Route>
          <Route path='/profile/:profileId' element={<ProfilePage />}></Route>
          <Route path='/profile/edit' element={<EditPerfil />}></Route>
          <Route path='/profiles' element={<Profiles />}></Route>
          <Route path='/posts/:postId' element={<PostDetail />}></Route>
          <Route path='/post/create' element={<NewPost />}></Route>
        </Routes>
      </BrowserRouter>
    </AlertsContext>


  );
}

export default App;