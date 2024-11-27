import styles from '../styles/Note.module.css';
import 'antd/dist/antd.css';
import { Popover, Button } from 'antd';
import { useState, useEffect } from 'react'
import Tag from './Tag';
import TextBloc from './Blocs/TextBloc';
import RadioBloc from './Blocs/RadioBloc';
import CodeBloc from './Blocs/CodeBloc';

const Note = () => {

    const [blocs, setBlocs] = useState([])
    
    const addBlock = () => {
        setBlocs((prevBlocs) => [
            ...prevBlocs,
            { id: prevBlocs.length,
                textContent: "",
                rawContent: null,
                type: "text",
                langage: null,
            }, // assign a unique id to each block
        ]);
    };
    
    const deleteBlock = (id) => {
        console.log(id)
        setBlocs(blocs.filter(bloc => bloc.id != id))
    };
    
    const setBlocValue = (blocId, textContent, rawContent) => {
        const updatedBlocs = blocs.map(bloc => bloc.id == blocId ? { ...bloc, textContent: textContent, rawContent: rawContent } : bloc)
        setBlocs(updatedBlocs)
    }
    
    const setBlocType = (blocId, type) => {
        const updatedBlocs = blocs.map(bloc => bloc.id == blocId ? { ...bloc, type: type } : bloc)
        setBlocs(updatedBlocs)
    }
    
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
    
    const popoverContent = (
        <div className="flex flex-col">
          <span>Text</span>
          <span>Code</span>
        </div>
      );
      
      const renderedBlocs = blocs.map((bloc, i) => {
          let blocComponent = null
          
          if (bloc.type === "text") {
              blocComponent = <TextBloc 
              id={i}
              textContent={bloc.textContent}
              rawContent={bloc.rawContent}
              handleKeyDown={(e, i) => handleKeyDown(e, i)}
              setBlocValue={setBlocValue}
              addBlock={addBlock}/>

            } else if (bloc.type === "code"){
                blocComponent = <CodeBloc  
                id={i}
                textContent={bloc.textContent}
                rawContent={bloc.rawContent}
                handleKeyDown={(e, i) => handleKeyDown(e, i)}
                setBlocValue={setBlocValue}
                addBlock={addBlock}/>
            }
            
            return (
                <div key={i} className={styles.blocContainer}>
                {/* <Popover title="Bloc types" content={popoverContent} className={styles.popover} trigger="hover">
                    <Button className={styles.buttonType}>+</Button>
                </Popover> */}
                <button onClick={(i, type) => setBlocType(bloc.id, "text")} className={styles.buttonType}>Text</button>
                <button onClick={(i, type) => setBlocType(bloc.id, "code")}className={styles.buttonType}>Code</button>
                {blocComponent}
            </div>
        )})
        
        return (
            <div>
            <main className={styles.container}>
                <div className={styles.note}>
                    <h1 className={styles.title}>findOne()</h1>
                    <div className={styles.tag_container}>
                        <Tag>bdd</Tag>
                        <Tag>méthode</Tag>
                    </div>
                    <div className={styles.blocsContainer}>
                        {renderedBlocs}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Note


/* Idea for blocs data model -> an array object :

When saving a note, the blocs content is sent to DB with JSON.stringify(array).
When getting a note, the blocs content is retrieve with JSON.parse(string)

Changing a bloc position equals to changing its index in the blocs array

In the map function, we have a switch case that renders differents components based on type : 
    - CodeBlock
    - TextBlock
    - InternalLinkBlock
    - ExternalLinkBloc
*/