import styles from '../styles/Home.module.css';
import CodeCompiler from './CodeCompiler'

function Home() {
  return (
    <div>
      <main className={styles.main}>
        <CodeCompiler />
      </main>
    </div>
  );
}

export default Home;
