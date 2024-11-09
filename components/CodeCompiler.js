import styles from '../styles/CodeCompiler.module.css';
import { useState } from 'react'
import Button from './Button'


const CodeCompiler = () => {

    const [inputValue, setInputValue] = useState('Entre du code frère')

    return (
        <div className={styles.main}>
            
            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={styles.script}
            />
            
            <div className={styles.console}>
            </div>        
            <Button  inputValue={inputValue}/>
        </div>
    )
}

export default CodeCompiler
