import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                profilePic: data.profilePic,
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
            profilePic: null,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.token) {
              dispatch(
                login({
                  username: data.username,
                  token: data.token,
                  profilePic: data.profilePic,
                })
              );
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

  const signupContainer = 'flex flex-1';
  const signupImageLeftSide =
    'bg-backImg-signup bg-cover bg-center h-screen w-9/12';
  const signupImageRightSide =
    'flex flex-col justify-around items-center w-3/12 bg-backgroundColor';
  const googleLoginContainer = 'flex justify-around w-full mt-8';

  const signupInputFieldsContainer = 'flex flex-col w-full items-center mb-12';
  const inputStyle =
    'border mb-4 rounded-md text-center p-1 bold text-darkPurple focus:border-darkPurple focus:outline-none w-[200px] text-sm';
  const emailErrorStyle = 'text-red-500 ';
  const passwordErrorInputFieldStyle = 'text-red-500 ';
  const btnInscription =
    'flex justify-center items-center text-white rounded-md bg-darkPurple p-2 text-xs hover:text-darkPurple hover:bg-lightPurple transition duration-300 ease-in-out w-[200px]';

  return (
    <div className={signupContainer}>
      {' '}
      {/* div qui contient tout l'écran */}
      <div className={signupImageLeftSide}> {/* image de fond */}</div>
      <div className={signupImageRightSide}>
        {/*div qui contient tout l'élément de droite */}
        <img src='/assets/logofinal.png' alt='logo' />

        <div className={signupInputFieldsContainer}>
          {/*div qui contient tout les input et bouttons*/}
          <input
            className={inputStyle}
            type='text'
            placeholder='Mail'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {emailError && <p className={emailErrorStyle}>Email incorrect !</p>}
          <input
            className={inputStyle}
            type='text'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            className={inputStyle}
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            className={inputStyle}
            type='password'
            placeholder='Confirm password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmpassword}
          />
          {passwordError && (
            <p className={passwordErrorInputFieldStyle}>
              Mot de passe incorrect !
            </p>
          )}
          <button className={btnInscription} onClick={() => handleSubmit()}>
            Inscription
          </button>
          <div className={googleLoginContainer}>
            <GoogleLogin
              onSuccess={(credentialResponse) =>
                handleSubmit(credentialResponse.credential)
              } // Passer le token Google a la fonction handleSubmit
              onError={() => console.error('Google Login Error')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
