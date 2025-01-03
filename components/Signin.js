import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login, logout } from '../reducers/user';

//LOGIN WITH GOOGLE

import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';

import { useRouter } from 'next/router';

function Signin() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();
  const dispatch = useDispatch();
  //ETATS
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);
  // const [userInfoGoogle, setUserInfoGoogle] = useState(null);

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

  const signinContainer = 'flex flex-1';
  const signinImageLeftSide =
    'bg-backImg-signin bg-cover bg-center h-screen w-9/12';
  const signinImageRightSide =
    'flex flex-col justify-around items-center w-3/12 bg-backgroundColor';

  const connexionContainer =
    'flex flex-col w-full h-1/5 items-center justify-center mb-32';
  const usernameInputFieldStyle =
    'border rounded-md text-center p-1 bold text-darkPurple focus:border-darkPurple focus:outline-none w-[200px]';
  const passwordInputFieldStyle =
    'mt-4 border rounded-md text-center p-1 bold text-darkPurple focus:border-darkPurple focus:outline-none w-[200px]';
  const passwordErrorInputFieldStyle = 'text-red-500 ';
  const btnConnexion =
    'bg-darkPurple text-white w-2/6 rounded-md hover:bg-lightPurple transition duration-300 ease-in-out w-[150px] mt-4';
  const inscriptionContainer = 'flex flex-col items-center w-full mt-12';
  const btnInscription =
    'bg-lightPurple text-darkPurple w-2/6 rounded-md hover:bg-darkPurple hover:text-white transition duration-300 ease-in-out w-[150px]';
  const googleConnect = 'm-6';

  return (
    <div className={signinContainer}>
      {/* div qui contient tout l'écran */}
      <div className={signinImageLeftSide}> {/*image de fond */}</div>
      <div className={signinImageRightSide}>
        {/*div qui contient tout l'élément de droite */}
        <img src='images/logofinal.png' alt='logo' />
        <div className={connexionContainer}>
          <div className={googleConnect}>
            <GoogleLogin
              onSuccess={(credentialResponse) =>
                handleSubmit(credentialResponse.credential)
              } // Passer le token Google a la fonction handleSubmit
              onError={(error) => console.error(error)}
            />
          </div>
          {/* div qui contient les input et boutton sign in */}
          <input
            className={usernameInputFieldStyle}
            type='text'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            className={passwordInputFieldStyle}
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {wrongPassword && (
            <p className={passwordErrorInputFieldStyle}>
              Utilisateur introuvable ou mot de passe incorrect
            </p>
          )}
          <button className={btnConnexion} onClick={() => handleSubmit()}>
            Connexion
          </button>
          <div className={inscriptionContainer}>
            <button
              className={btnInscription}
              onClick={() => router.push('/signup')}
            >
              Inscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signin;
