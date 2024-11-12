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
          { id: prevBlocs.length + 1 }, // assign a unique id to each block
        ]);
      };

    const deleteBlock = (id) => {
        console.log(id)
        console.log("bloc:", blocs)
        setBlocs(blocs.filter(bloc => bloc.id != id))
      };

    useEffect(() => {
        // Add an initial block manually when the component mounts
        addBlock();
    }, []);

    const handleKeyDown = (event, id) => {
        // add Bloc
        if (event.key === "Enter") {
          console.log("Enter key was pressed");
          addBlock()
        }
        // remove bloc
        if ((event.key === "Delete") || (event.key === "Backspace")) {
            console.log(`${event.key} was pressed`)
            deleteBlock(id)
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
                                handleKeyDown={(e, i) => handleKeyDown(e, i)}/>
                            ))}
                        </div>
                </div>
            </main>
        </div>
    )
}

export default Note