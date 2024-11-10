import styles from '../styles/Button.module.css';

const Button = ({ inputValue, onClick }) => {
    return (
        <div 
        className={styles.button}
        onClick={onClick}>
           Execute
        </div>
    )
}

export default Button