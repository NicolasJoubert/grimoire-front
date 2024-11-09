import styles from '../styles/Home.module.css';
import CodeCompiler from './CodeCompiler'
import Button from './Button'

function Home() {
  return (
    <div>
      <main className={styles.main}>
        <CodeCompiler />
        {/* <Button {...inputValue}/> */}
      </main>
    </div>
  );
}

export default Home;

