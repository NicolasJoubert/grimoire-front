import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx'; // permet de faire du style conditionel avec tailwinds

const Tag = ({children, deleteTag}) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div 
            className="mr-2 text-xs p-1 pl-2 pr-2 bg-lightPurple px-2 rounded cursor-pointer" 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span>{children}</span>
            <FontAwesomeIcon 
                className={clsx(isHovered ? 'opacity-100' : 'opacity-50', 'ml-1 text-darkPurple')} 
                icon={faCircleXmark}
                onClick={()=>deleteTag(children)} 
            />
        </div>
    )
    
}



export default Tag