import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoon,
  faRightFromBracket,
  faHatWizard,
} from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/user';
import { removeCurrentNote } from '../reducers/currentNote';
import { useRouter } from 'next/router';

export default function ConnectedUser() {
  const router = useRouter();

  // REDUCER
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // FONCTION TO DISCONNECT USERS
  const handleLogout = () => {
    router.push('/');
    dispatch(logout());
    dispatch(removeCurrentNote());
  };

  // TODO FAIRE LA FONCTION DARK LIGHT MODE
  // turn on light or dark mode NOT ACTIVE
  const darkLightMode = () => {
    console.log('clique sur le ligth dark mode');
  };

  return (
    <div className='flex justify-between items-center p-2 border-t border-gray-300'>
      <div className='flex items-center'>
        <FontAwesomeIcon icon={faHatWizard} className='text-darkPurple' />
        <p className='text-sm text-black mb-0 ml-2'>{user.username}</p>
      </div>

      <div className='flex justify-normal items-center'>
        <button onClick={darkLightMode}>
          <FontAwesomeIcon
            icon={faMoon}
            className='mr-2 text-darkPurple text-base hover:text-lightPurple transition duration-300 ease-in-out'
          />
        </button>

        <button onClick={handleLogout}>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className='text-darkPurple text-base hover:text-lightPurple transition duration-300 ease-in-out'
          />
        </button>
      </div>
    </div>
  );
}
