import React from 'react';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear,faHatWizard, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import LanguageSelector from './LanguageSelector';

function Settings() {

    //ETATS
    // const [email, setemail] = useState('');
    const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmpassword, setConfirmPassword] = useState('');

    const [selectedLanguage, setSelectedLanguage] = useState({ displayValue: "Javascript", editorValue: "javascript", apiValue: "nodejs", isExecutable: true })

    return(
        <div className='flex flex-1 '>

            {/* Settings Container */}
            <div className='flex flex-col justify-around items-center w-3/12 bg-backgroundColor'>

                {/* Title */}
                <div className='flex justify-center items-center '>
                    <FontAwesomeIcon icon={faGear} size="3x" className='text-darkPurple'/>
                    <p className='text-darkPurple text-4xl font-bold '>Settings</p>
                </div>

                {/* Modification de l'avatar */}
                <div className="flex flex-col justify-center items-center">
                    <FontAwesomeIcon icon={faHatWizard} size="4x" className='text-darkPurple mb-3' />
                    <p className='text-darkPurple'>Modifiez votre Avatar</p>
                    <button>
                        <FontAwesomeIcon icon={faCirclePlus} size="2x" 
                            className='text-darkPurple hover:text-lightPurple transition duration-300 ease-in-out' 
                        />
                    </button>
                </div>

                {/* Modification du username */}
                <div className='flex flex-col items-center'>
                    <p className='text-darkPurple font-bold'>Nouveau username</p>
                    <input 
                        className=' w-8/12 rounded-md' 
                        type="text" 
                        placeholder='Username' 
                        onChange={(e) => setUsername(e.target.value)} value={username}/>
                </div>  

                {/* Choix du language de dev */}
                <div className='flex flex-col justify-between items-center'>
                    <p className='text-darkPurple font-bold'>Langage par défault</p>
                    <LanguageSelector 
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}/>
                </div> 

                {/* Choix du thèmes de l'éditeur de code*/}
                <div className='flex flex-col items-center'>
                    <p className='text-darkPurple font-bold'>Thème</p>
                    <select>
                        <option value="Monokai">Monokai</option>
                        <option value="Dracula">Dracula</option>
                    </select>
                </div>  

                {/* Confirmer les changements */}
                <button
                    className='bg-darkPurple text-white mb-6 w-2/5 rounded-md hover:bg-lightPurple transition duration-300 ease-in-out'>
                    Confirmation
                </button>
            </div>
            {/*image de fond */}
            <div className="bg-backImg-settings bg-cover bg-center h-screen w-9/12"></div>
        </div>
   ) 
}
export default Settings;    