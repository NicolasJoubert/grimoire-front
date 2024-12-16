import React from 'react';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear,faHatWizard, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
function Settings() {

    //ETATS
    const [email, setemail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    
   return(
    <div className='flex flex-1 '>

        <div className='flex flex-col justify-around items-center w-3/12 bg-backgroundColor'>
            <div className='flex justify-center items-center '>
                <FontAwesomeIcon icon={faGear} size="3x" className='text-darkPurple'/>
                <p className='text-darkPurple text-4xl font-bold '>Settings</p>
            </div>
            <div>
            <FontAwesomeIcon icon={faHatWizard} size="4x" className='text-darkPurple' />
            </div>
         <p className='text-darkPurple'>Modifier votre Avatar</p>
         <button>
         <FontAwesomeIcon icon={faCirclePlus} size="2x" 
         className='text-darkPurple hover:text-lightPurple transition duration-300 ease-in-out' 
         />
         </button>
         {/* <input className=' w-8/12 rounded-md' type="text" placeholder='Email' onChange={(e) => setemail(e.target.value)} value={email}/> */}
         <input className=' w-8/12 rounded-md' type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username}/>
         {/* <input className=' w-8/12 rounded-md' type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password}/> */}
         {/* <input className=' w-8/12 rounded-md' type="password" placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmpassword}/> */}
            <div className='flex justify-around'>
                <div className='flex flex-col  justify-between items-center'>
                 <p className='text-darkPurple font-bold'>Langage favoris</p>
                <select>
                 <option value="JavaScript">JavaScript</option>
                 <option value="Python">Python</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Java">Java</option>
                <option value="Go">Go</option>
                </select>
                {/* <button
                className='bg-darkPurple text-white mb-6 w-2/5 rounded-md hover:bg-lightPurple transition duration-300 ease-in-out'>
                Confirmation
                </button> */}
                 </div> 
                 <div className='flex flex-col items-center'>
                 <p className='text-darkPurple font-bold'>Thèmes</p>
                <select>
                 <option value="JavaScript">Monokai</option>
                 <option value="Python">Dracula</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Java">Java</option>
                <option value="Go">Go</option>
                </select>
                </div>  

                </div>  
                <button
                className='bg-darkPurple text-white mb-6 w-2/5 rounded-md hover:bg-lightPurple transition duration-300 ease-in-out'>
                Confirmation
                </button>
        </div>
        <div className="bg-backImg-settings bg-cover bg-center h-screen w-9/12"> {/*image de fond */}
        </div>
    </div>
   ) 
}
export default Settings;    