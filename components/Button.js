import styles from '../styles/Button.module.css';

const Button = ({ inputValue }) => {
    return (
        <div 
        className={styles.button}
        onClick={() => alert(inputValue)}>Alertez moi 🚨
           Execute
        </div>
    )
}

export default Button