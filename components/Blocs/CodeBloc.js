import styles from '../../styles/Bloc.module.css';
import { useState, useEffect } from 'react'

const CodeBloc = ({ 
    handleKeyDown, 
    id,
    value,
    setBlocValue }) => {
    // TO DO : 
    //- gérer la suppression de bloc
    //- gérer le passage à la ligne en cliquant sur Entrée

    const [inputValue, setInputValue] = useState(value) 


    const onKeyDown = (e) => {
        handleKeyDown(e, id)
    }

    const handleChange = (e) => {
        setInputValue(e.target.value)
        setBlocValue(id, inputValue)
    } 

    return (
        <div className={styles.bloc}>
            <input 
                className={styles.bloc}
                onKeyDown={onKeyDown}
                type="text"
                value={inputValue}
                onChange={handleChange}>
            </input>
        </div>
    )
}

export default CodeBloc