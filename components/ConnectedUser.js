import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faRightFromBracket, faHatWizard } from '@fortawesome/free-solid-svg-icons';


export default function ConnectedUser({ user, darkLightMode, handleLogout }) {
  return (
    <div className='flex justify-between items-center p-2 border-t border-gray-300'>
      <div className='flex items-center'>
        <FontAwesomeIcon 
        icon={faHatWizard} 
        className='text-darkPurple' 
        />
        <p className='text-sm text-black mb-0 ml-2'>{user.username}</p>
      </div>
      <div className='flex justify-normal items-center'>
        <button>
          <FontAwesomeIcon
            icon={faMoon}
            className='mr-2 text-darkPurple text-base hover:text-lightPurple transition duration-300 ease-in-out'
            onClick={darkLightMode}
          />
        </button>
        <button>
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className='text-darkPurple text-base hover:text-lightPurple transition duration-300 ease-in-out'
            onClick={handleLogout}
          />
        </button>
      </div>
    </div>
  );
}
