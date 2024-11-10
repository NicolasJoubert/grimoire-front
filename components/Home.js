import styles from '../styles/Home.module.css';
import { useState } from 'react'

import CodeCompiler from './CodeCompiler'
import Button from './Button'

function Home() {
  const [inputValue, setInputValue] = useState('Entre du code frère')  
  const [result, setResult] = useState('')

  async function handleClick() {
    console.log(inputValue)
    const response = await fetch("http://localhost:3000/test", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({script: inputValue})
    })
    const data = await response.json()
    console.log("data :", data)
    console.log("data.output :", data.data.output)
    setResult(data.data.output)
  }

  return (
    <div>
      <main className={styles.main}>
        <CodeCompiler 
        inputValue={inputValue} 
        setInputValue={setInputValue}
        result={result} 
        />
        <Button inputValue={inputValue} onClick={handleClick}/>
      </main>
    </div>
  );
}

export default Home;

