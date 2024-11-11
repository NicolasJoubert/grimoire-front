import styles from '../styles/CodeCompiler.module.css';
import hljs from 'highlight.js';

// import Button from './Button'


const CodeCompiler = ({ inputValue, setInputValue, result }) => {
    console.log("result:", result)

    const highlightedCode = hljs.highlight(
        inputValue,
        { language: 'javascript' }
      ).value
    console.log(highlightedCode)
    return (
        <div className={styles.main}>
            <textarea
                value={highlightedCode}
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
