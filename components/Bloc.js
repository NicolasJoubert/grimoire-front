import styles from '../styles/Bloc.module.css';
import { useState } from 'react'

const Bloc = ({ onClick }) => {
    const [inputValue, setInputValue] = useState('') 

    const addBlock = () => {
        onClick()
    }

    const handleChange = (event) => {
        setInputValue(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          console.log("Enter key was pressed");
          // Add any additional actions here
        }
    }

    return (
        <div className={styles.bloc}
        onClick={addBlock}>
            <input
                className={styles.bloc}
                type="text"
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInputValue(e.target.value)}>
            </input>
        </div>
    )
}


export default Bloc