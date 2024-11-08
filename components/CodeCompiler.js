import styles from '../styles/CodeCompiler.module.css';

const CodeCompiler = () => {
    return (
        <div className={styles.main}>
            <div className={styles.script}>
                <p>```javascript
                    console.log("foo")
                    ```</p>
                
            </div>
            <div className={styles.console}>
            </div>        
        </div>
    )
}

export default CodeCompiler