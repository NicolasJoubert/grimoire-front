import { useState } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUsernameInStore,
  updateProfilePicInStore,
  updateDefaultDevLangInStore,
  updateDefaultEditorThemeInStore,
} from '../reducers/user';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import Avatar from './Avatar';
import LanguageSelector from './Selectors/LanguageSelector';
import EditorThemeSelector from './Selectors/EditorThemeSelector';

import Image from 'next/image';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const Settings = () => {
  // GESTION DE LA REDIRECTION
  const router = useRouter();

  // GESTION DE LA MODAL ET DES AVATARS
  const [isModalOpen, setIsModalOpen] = useState(false);
  const avatarsData = [
    {
      src: '/images/HatSorcerer.png',
      name: 'Hatty',
      alt: 'Chapeau de Sorcier',
    },
    {
      src: '/images/balaiDeSorcerer.png',
      name: 'Broomy',
      alt: 'Balai de Sorcier',
    },
    { src: '/images/grimoire.png', name: 'Booky', alt: 'Grimoire' },
    { src: '/images/dragon.png', name: 'Dragony', alt: 'Dragon' },
  ];

  const avatars = avatarsData.map((data, i) => (
    <Avatar
      key={i}
      src={data.src}
      name={data.name}
      alt={data.alt}
      onClick={() => {
        setSelectedPictureProfil(data.src);
        setIsModalOpen(false);
      }}
    />
  ));

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // REDUCERS
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // LES ETATS
  const [username, setUsername] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(
    user.defaultDevLanguage
  );
  const [selectedEditorTheme, setSelectedEditorTheme] = useState(
    user.defaultEditorTheme
  );
  const [selectedPictureProfil, setSelectedPictureProfil] = useState(
    user.profilePic || '/images/HatSorcerer.png'
  );

  // LES FONCTIONS
  /** Change username in database and updates reducer */
  const updateUsername = async () => {
    // Update user in database
    try {
      const response = await fetch(`${backendUrl}/users/update/username`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: user.token, username }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      data.result && dispatch(updateUsernameInStore(username));
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
        body: JSON.stringify({
          token: user.token,
          defaultDevLang: selectedLanguage.displayValue,
        }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      data.result && dispatch(updateDefaultDevLangInStore(selectedLanguage));
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
        body: JSON.stringify({
          token: user.token,
          defaultEditorTheme: selectedEditorTheme.displayValue,
        }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      data.result &&
        dispatch(updateDefaultEditorThemeInStore(selectedEditorTheme));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  /** Change avatar in database and updates reducer */
  const updateProfilePicture = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/users/update/profilePicture`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: user.token,
            newProfilePic: selectedPictureProfil,
          }),
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.result) {
        dispatch(updateProfilePicInStore(selectedPictureProfil)); // Mets à jour Redux
        console.log('Profile picture updated in Redux:', selectedPictureProfil);
      } else {
        console.error('Failed to update profile picture:', data.error);
      }
    } catch (error) {
      console.error('Error fecthing data :', error);
    }
  };

  const changeUserInfo = () => {
    username && username !== user.username && updateUsername();
    selectedLanguage !== user.defaultDevLanguage && updateDefaultDevLang();
    selectedEditorTheme !== user.defaultEditorTheme &&
      updateDefaultEditorTheme();
    selectedPictureProfil !== user.profilePic && updateProfilePicture();
    router.push('/home');
  };

  // STYLE CSS
  const container = 'flex flex-1';
  const leftSideContainer =
    'flex flex-col justify-around items-center w-3/12 bg-backgroundColor';
  const headerContent = 'flex justify-center items-center ';
  const iconSettings = 'text-darkPurple text-3xl';
  const settingsTitle = 'pl-2 text-darkPurple text-3xl font-bold';
  const chooseYourAvatarContainer = 'flex flex-col justify-center items-center';
  const pictureProfil = 'rounded-[100px] h-40 w-40';
  const btnChooseYourAvatar =
    'flex text-white rounded-md bg-darkPurple mt-8 p-2 text-xs hover:text-darkPurple hover:bg-lightPurple transition duration-300 ease-in-out bg-darkPurple';
  const modalAvatarsContainer = 'flex flex-wrap justify-center gap-6';
  const nouveauUsernameContainer = 'flex flex-col items-center -mt-8 ';
  const subtitleSettings = 'text-darkPurple font-bold pb-2';
  const champsUsername =
    'border rounded-md text-center p-1 bold text-darkPurple focus:border-darkPurple focus:outline-none w-[200px]';
  const languageContainer = 'flex flex-col justify-between items-center -mt-8';

  const themeContainer = 'flex flex-col items-center -mt-8';
  const btnConfirmation =
    'flex text-white rounded-md bg-darkPurple mt-6 p-2 text-xs hover:text-darkPurple hover:bg-lightPurple transition duration-300 ease-in-out bg-darkPurple -mt-8';
  const imageDeFond = 'bg-backImg-settings bg-cover bg-center h-screen w-9/12';

  return (
    <div className={container}>
      {/* Settings Container */}
      <div className={leftSideContainer}>
        {/* Title */}
        <div className={headerContent}>
          <FontAwesomeIcon icon={faGear} size='3x' className={iconSettings} />
          <h1 className={settingsTitle}>Settings</h1>
        </div>
        <div className={chooseYourAvatarContainer}>
          <Image
            src={selectedPictureProfil}
            className={pictureProfil}
            alt='Avatar sélectionné'
            width={120}
            height={120}
          />
          {/* Modification de l'avatar */}
          <div>
            <Button type='ghost' onClick={() => setIsModalOpen(!isModalOpen)}>
              <p className={btnChooseYourAvatar}>Changer d'avatar</p>
            </Button>
          </div>
        </div>

        <Modal
          title='Avatars'
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div className={modalAvatarsContainer}>{avatars}</div>
        </Modal>

        {/* Modification du username */}
        <div className={nouveauUsernameContainer}>
          <p className={subtitleSettings}>Nouveau username</p>
          <input
            className={champsUsername}
            type='text'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        {/* Choix du language de dev */}
        <div className={languageContainer}>
          <p className={subtitleSettings}>Langage par défault</p>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        </div>

        {/* Choix du thèmes de l'éditeur de code*/}
        <div className={themeContainer}>
          <p className={subtitleSettings}>Thème</p>
          <EditorThemeSelector
            selectedEditorTheme={selectedEditorTheme}
            setSelectedEditorTheme={setSelectedEditorTheme}
          />
        </div>
        {/* Confirmer les changements */}
        <button className={btnConfirmation} onClick={changeUserInfo}>
          Confirmation
        </button>
      </div>
      {/*image de fond */}
      <div className={imageDeFond}></div>
    </div>
  );
};
export default Settings;
