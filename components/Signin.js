import React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import user from '../reducers/user';
import { login, logout } from '../reducers/user';
import { useRouter } from "next/router";

function Signin() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const router = useRouter();
    const dispatch = useDispatch();
    //ETATS
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //FUNCTIONS
        const handleSubmit = () => {
            fetch(`${backendUrl}/users/signin`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username: username, password: password }),
            }).then(response => response.json())
             .then(data => {
                if (data.result) {
                    console.log(data)
					dispatch(login({ username: username , token: data.token }));
					setUsername('');
					setPassword('');
                    console.log(data)
					router.push('/home')
				} else {
                    window.alert('User not found or wrong password')
                }
             })
                console.log('connexion')
        }
    return(
        <div className=" flex flex-1"> {/* div qui contient tout l'écran */}
            <div className="bg-backImg-signin bg-cover bg-center h-screen w-9/12"> {/*image de fond */}
            </div>
            <div className="flex flex-col justify-around items-center w-3/12 bg-backgroundColor"> {/*div qui contient tout l'élément de droite */}
            <img src="/assets/logofinal.png" alt="logo" />
                <div className='flex justify-around w-full'> {/* div qui contient les logo de connexion externe */}
                    <img src="/assets/git.png" alt="gitImg"  />
                    <img src="/assets/apple.png" alt="appleImg"  />
                    <img src="/assets/google.png" alt="googleImg"  />
                </div>
            <div className='flex flex-col w-full h-1/5 items-center justify-center '> {/* div qui contient les input et boutton sign in */}
            <input className='rounded-md w-4/5 h-1/5' type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username}/>
            <input className='mt-4 rounded-md w-4/5 h-1/5' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button className='bg-darkPurple text-white mt-6 rounded-md w-3/5 h-1/5' onClick={() => handleSubmit()}>Connexion</button>
                </div>
                <div className=' flex flex-col items-center w-full'> {/*div qui contient les éléments signup */}
                <p>Pas encore inscrit</p>
                <button className='bg-darkPurple text-white w-2/6 rounded-md' onClick={() => router.push('/signup')}>Inscription</button>
                </div>
            </div>
        </div>
    )
}
export default Signin;