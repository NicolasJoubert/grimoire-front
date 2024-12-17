import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login, logout } from '../reducers/user';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faGoogle,
  faApple,
} from '@fortawesome/free-brands-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import { GoogleLogin } from '@react-oauth/google';

function Signup() {
  const dispatch = useDispatch();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();

  //ETATS
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState(''); //pour singn up
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userGoogle, setUserGoogle] = useState(null);
  //regex email
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isEmailValid = () => {
    if (!EMAIL_REGEX.test(email)) {
      console.log('Invalid Email');
      setEmailError(true);
      return false;
    }
    console.log('Valid Email');
    setEmailError(false);
    return true;
  };
  const isPasswordValid = () => {
    if (password != confirmpassword) {
      console.log('Invalid pwd');
      setPasswordError(true);
      return false;
    }
    console.log('Valid pwd');
    setPasswordError(false);
    return true;
  };

  // Crée un new user classique et google
  const handleSubmit = (googleToken) => {
    // connexion google récupération du credentialResponse.credential
    if (googleToken) {
      fetch(`${backendUrl}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // renvoi les données de google au back pour creation user
        body: JSON.stringify({ googleToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(
              login({
                username: data.username,
                token: data.token,
              })
            );
            console.log(data);
            router.push('/home');
          } else {
            alert(data.error);
          }
        });
    } else {
      let validEmail = isEmailValid();
      let validPassword = isPasswordValid();

      if (validEmail && validPassword) {
        fetch(`${backendUrl}/users/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            username: username,
            password: password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.token) {
              dispatch(login({ username: data.username, token: data.token }));
              setEmail('');
              setUsername('');
              setPassword('');
              setConfirmPassword('');
              console.log(data);
              router.push('/home');
            }
          });
        console.log('user created');
      } else {
        // check si le password est égal a confirm password
        console.log('revoie tes inputs frère');
      }
    }
  };
  return (
    <div className=' flex flex-1'>
      {' '}
      {/* div qui contient tout l'écran */}
      <div className='bg-backImg-signup bg-cover bg-center h-screen w-9/12'>
        {' '}
        {/* image de fond */}
      </div>
      <div className='flex flex-col justify-around items-center w-3/12 bg-backgroundColor'>
        {' '}
        {/*div qui contient tout l'élément de droite */}
        <img src='/assets/logofinal.png' alt='logo' />
        <div className='flex justify-around w-full'>
          {' '}
          {/*div qui contient les logo de connexion externe */}
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
            onError={() => console.error('Google Login Error')}
          />
        </div>
        <button>
          <FontAwesomeIcon
            icon={faCirclePlus}
            size='3x'
            className='text-darkPurple hover:text-lightPurple transition duration-300 ease-in-out'
          />
        </button>
        <div className='flex flex-col w-full items-center'>
          {' '}
          {/*div qui contient tout les input et bouttons*/}
          <input
            className='w-8/12 rounded-md'
            type='text'
            placeholder='Mail'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {emailError && <p className='text-red-500 '>Email incorrect !</p>}
          <input
            className='mt-4 w-8/12 rounded-md'
            type='text'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            className='mt-4 w-8/12 rounded-md'
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            className='mt-4 w-8/12 rounded-md'
            type='password'
            placeholder='Confirm password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmpassword}
          />
          {passwordError && (
            <p className='text-red-500 '>Mot de passe incorrect !</p>
          )}
          <button
            className='bg-darkPurple text-white mt-6 w-2/5 rounded-md hover:bg-lightPurple transition duration-300 ease-in-out'
            onClick={() => handleSubmit()}
          >
            Inscription
          </button>
        </div>
      </div>
    </div>
  );
}
export default Signup;
