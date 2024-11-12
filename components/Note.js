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

    const deleteBlock = () => {
        // setBlocs((blocs) => blocs.filter())
        console.log("delete bloc")
      };

    useEffect(() => {
        // Add an initial block manually when the component mounts
        addBlock();
    }, []);

    const handleKeyDown = (event) => {
        // add Bloc
        if (event.key === "Enter") {
          console.log("Enter key was pressed");
          addBlock()
        }
        // remove bloc
        if ((event.key === "Delete") || (event.key === "Backspace")) {
            console.log(`${event.key} was pressed`)
            deleteBlock()
          }
    }

    return (
        <div>
            <main className={styles.main}>
                <div className={styles.note}>
                    <h1 
                    className={styles.title}>findOne()</h1>
                        <div className={styles.tag_container}>
                            <Tag>bdd</Tag>
                            <Tag>méthode</Tag>
                        </div>
                        <div className={styles.content}>
                            {blocs.map((bloc, index) => (
                                <Bloc 
                                key={index + 1} 
                                id={index + 1} 
                                handleKeyDown={(e) => handleKeyDown(e)}/>
                            ))}
                        </div>
                </div>
            </main>
        </div>
    )
}

export default Note