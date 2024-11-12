import styles from '../styles/Bloc.module.css';
import { useState } from 'react'

const Bloc = ({ handleKeyDown }) => {
    // TO DO : 
    //- gérer la suppression de bloc
    //- gérer le passage à la ligne en cliquant sur Entrée


    const [inputValue, setInputValue] = useState('') 

    const addBlock = (event) => {
        handleKeyDown(event)
    }

    const handleChange = (event) => {
        setInputValue(event.target.value)
    }

    

    return (
        <div className={styles.bloc}>
            <input
                className={styles.bloc}
                type="text"
                value={inputValue}
                onKeyDown={addBlock}
                onChange={(e) => setInputValue(e.target.value)}>
            </input>
        </div>
    )
}


export default Bloc