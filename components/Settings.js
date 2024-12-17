import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
    updateUsernameInStore, 
    updateProfilePicInStore, 
    updateDefaultDevLangInStore,
    updateDefaultEditorThemeInStore
 } from '../reducers/user';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear,faHatWizard, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';
import Avatar from '../components/avatar';
import { useDispatch, useSelector } from 'react-redux';

const Settings = () => {
    const router = useRouter();
    const user = useSelector((state) => state.user.value);
    
    const dispatch = useDispatch()
    const [username, setUsername] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState(user.defaultDevLanguage)
    const [selectedEditorTheme, setSelectedEditorTheme] = useState(user.defaultEditorTheme)

    /** Change username in database and updates reducer */
    const updateUsername = async () => {
        // Update user in database
        try {
            const response = await fetch(`${backendUrl}/users/update/username`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: user.token, username }),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            data.result && dispatch(updateUsernameInStore(username)) 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    /** Change default lang in database and updates reducer */
    const updateDefaultDevLang = async () => {
        // Update user in database
        try {
            const response = await fetch(`${backendUrl}/users/update/devlang`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: user.token, defaultDevLang: selectedLanguage.displayValue }),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            data.result && dispatch(updateDefaultDevLangInStore(selectedLanguage)) 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    /** Change default editor theme in database and updates reducer */
    const updateDefaultEditorTheme = async () => {
        // Update user in database
        try {
            const response = await fetch(`${backendUrl}/users/update/editorTheme`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: user.token, defaultEditorTheme: selectedEditorTheme.displayValue }),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            data.result && dispatch(updateDefaultEditorThemeInStore(selectedEditorTheme)) 
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const changeUserInfo = () => {
        ((username) && (username !== user.username)) && updateUsername()
        selectedLanguage !== user.defaultDevLanguage && updateDefaultDevLang()
        selectedEditorTheme !== user.defaultEditorTheme && updateDefaultEditorTheme()
        router.push("/home")
    }

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
                    
                    <Avatar />
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
                    <EditorThemeSelector 
                        selectedEditorTheme={selectedEditorTheme}
                        setSelectedEditorTheme={setSelectedEditorTheme}/>
                </div>  

                {/* Confirmer les changements */}
                <button
                    className='bg-darkPurple text-white mb-6 w-2/5 rounded-md hover:bg-lightPurple transition duration-300 ease-in-out'
                    onClick={changeUserInfo}
                    >Confirmation
                </button>
            </div>
            {/*image de fond */}
            <div className="bg-backImg-settings bg-cover bg-center h-screen w-9/12"></div>
        </div>
   ) 
}
export default Settings;    