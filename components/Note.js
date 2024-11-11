import styles from '../styles/Note.module.css';
import { useState, useEffect } from 'react'
import Tag from './Tag';
import Bloc from './Bloc';

const Note = () => {
    // const [item, setItem] = useState(0) 
    const [blocs, setBlocs] = useState([])

    const addBlock = () => {
        setBlocs((prevBlocs) => [
          ...prevBlocs,
          { id: prevBlocs.length + 1, onClick: addBlock }, // assign a unique id to each block
        ]);
      };

    useEffect(() => {
        // Add an initial block manually when the component mounts
        addBlock();
    }, []);

    return (
        <div>
            <main className={styles.main}>
                <div className={styles.note}>
                    <h1 
                    className={styles.title}
                    onClick={addBlock}>findOne()</h1>
                        <div className={styles.tag_container}>
                            <Tag>bdd</Tag>
                            <Tag>méthode</Tag>
                        </div>
                        <div className={styles.content}>
                            {blocs.map((bloc, index) => (
                                <Bloc key={index + 1} onClick={addBlock}/>
                            ))}
                        </div>
                </div>
            </main>
        </div>
    )
}

export default Note