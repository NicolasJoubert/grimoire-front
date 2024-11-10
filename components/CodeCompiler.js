import styles from '../styles/CodeCompiler.module.css';
import Button from './Button'


const CodeCompiler = ({ inputValue, setInputValue, result }) => {
    console.log("result:", result)
    return (
        <div className={styles.main}>
            <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={styles.script}
            />
            
            <div className={styles.console}>
                <p>{result}</p>
            </div>        
        </div>
    )
}

export default CodeCompiler
