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
        <div className=" flex flex-1">
            <div className="bg-backImg-signin bg-cover bg-center h-screen w-9/12">
            </div>
            <div className="flex flex-col justify-around items-center w-3/12 bg-backgroundColor">
            <img src="/assets/logofinal.png" alt="logo" className='' />
                <div className='flex justify-around w-full'>
                    <img src="/assets/git.png" alt="gitImg" className='' />
                    <img src="/assets/apple.png" alt="appleImg" className='' />
                    <img src="/assets/google.png" alt="googleImg" className='' />
                </div>
            <div className='flex flex-col'>
            <input className='rounded-md' type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username}/>
            <input className='mt-4 rounded-md' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button className='bg-darkPurple text-white mt-6 rounded-md' onClick={() => handleSubmit()}>Connexion</button>
                </div>
                <div className=' flex flex-col items-center w-full'>
                <p>Pas encore inscrit</p>
                <button className='bg-darkPurple text-white w-2/6 rounded-md' onClick={() => router.push('/signup')}>Inscription</button>
                </div>
            </div>
        </div>
    )
}
export default Signin;