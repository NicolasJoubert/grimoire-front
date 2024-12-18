import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login, logout } from '../reducers/user';

//LOGIN WITH GOOGLE

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import { useRouter } from 'next/router';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faGithub,
//   faGoogle,
//   faApple,
// } from '@fortawesome/free-brands-svg-icons';

function Signin() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();
  const dispatch = useDispatch();
  //ETATS
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);
  const [userInfoGoogle, setUserInfoGoogle] = useState(null);

  //FUNCTIONS
  const handleSubmit = (googleToken) => {
    const url = `${backendUrl}/users/signin`;
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({
      googleToken: googleToken ?? null,
      username: username,
      password: password,
    });

    fetch(url, { method, headers, body })
      .then((response) => response.json())
      .then((data) => {
        if (!data.result) return alert(data.error);
        console.log(data);

        dispatch(
          login({
            username: data.username,
            token: data.token,
            profilePic: data.profilePic,
          })
        );
        router.push('/home');
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setUsername('');
        setPassword('');
      });
  };

  return (
    <div className=' flex flex-1'>
      {' '}
      {/* div qui contient tout l'écran */}
      <div className='bg-backImg-signin bg-cover bg-center h-screen w-9/12'>
        {' '}
        {/*image de fond */}
      </div>
      <div className='flex flex-col justify-around items-center w-3/12 bg-backgroundColor'>
        {' '}
        {/*div qui contient tout l'élément de droite */}
        <img src='/assets/logofinal.png' alt='logo' />
        <div className='flex justify-around w-full'>
          {' '}
          {/* div qui contient les logo de connexion externe */}
          {/* <button>
            <FontAwesomeIcon
              icon={faGithub}
              size='4x'
              className='text-darkPurple  text-bae  hover:text-lightPurple transition duration-300 ease-in-out'
            />
          </button>
          <button>
            <FontAwesomeIcon
              icon={faApple}
              size='4x'
              className='text-darkPurple  text-bae  hover:text-lightPurple transition duration-300 ease-in-out'
            />
          </button>
          <button>
            <FontAwesomeIcon
              icon={faGoogle}
              size='4x'
              className='text-darkPurple  text-bae  hover:text-lightPurple transition duration-300 ease-in-out'
            />
          </button> */}
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              handleSubmit(credentialResponse.credential)
            } // Passer le token Google a la fonction handleSubmit
            onError={(error) => console.error(error)}
          />
        </div>
        <div className='flex flex-col w-full h-1/5 items-center justify-center '>
          {' '}
          {/* div qui contient les input et boutton sign in */}
          <input
            className='rounded-md w-4/5 h-1/5'
            type='text'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            className='mt-4 rounded-md w-4/5 h-1/5'
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {wrongPassword && (
            <p className='text-red-500 '>
              Utilisateur introuvable ou mot de passe incorrect
            </p>
          )}
          <button
            className='bg-darkPurple text-white mt-6 rounded-md w-3/5 h-1/5 hover:bg-lightPurple transition duration-300 ease-in-out'
            onClick={() => handleSubmit()}
          >
            Connexion
          </button>
        </div>
        <div className=' flex flex-col items-center w-full'>
          {' '}
          {/*div qui contient les éléments signup */}
          <p>Pas encore inscrit</p>
          <button
            className='bg-darkPurple text-white w-2/6 rounded-md hover:bg-lightPurple transition duration-300 ease-in-out'
            onClick={() => router.push('/signup')}
          >
            Inscription
          </button>
        </div>
      </div>
    </div>
  );
}
export default Signin;
