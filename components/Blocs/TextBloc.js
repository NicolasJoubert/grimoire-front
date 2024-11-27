import styles from '../../styles/Bloc.module.css';
import { useState } from 'react'
import { 
        Editor, 
        EditorState, 
        ContentState, 
        convertFromRaw,
        RichUtils, 
        getDefaultKeyBinding  
    } from 'draft-js';
import 'draft-js/dist/Draft.css';

const TextBloc = ({ 
    handleKeyDown, 
    id,
    textContent, 
    rawContent, 
    setBlocValue,
    addBlock }) => {
    // TO DO : 
    //- gérer la suppression de bloc
    //- gérer le passage à la ligne en cliquant sur Entrée


    // const [inputValue, setInputValue] = useState(value) 
    const [editorState, setEditorState] = useState(
        // () => EditorState.createEmpty()
        textContent ? EditorState.createWithContent(ContentState.createFromText(textContent)) : EditorState.createEmpty()
        // rawContent  ? EditorState.createWithContent(convertFromRaw(rawContent)) : EditorState.createEmpty()
    )

    const onKeyDown = (e) => {
        handleKeyDown(e, id)
    }

    const handleChange = (e) => {
        setEditorState(e)
        const textContent = e.getCurrentContent().getPlainText()
        const rawContent = e.getCurrentContent()
        setBlocValue(id, textContent, rawContent)
        // let raw = JSON.stringify(rawContent)
        // console.log(raw)
        // console.log(JSON.parse(raw))
    }

    // Custom key binding function
    const keyBindingFn = (e) => {
        if (e.ctrlKey && e.key === 'b') {
            return 'bold'; // Return a custom command for Ctrl+B
        } else if (e.key === 'Enter') {
            addBlock()
            return
        }
        return getDefaultKeyBinding(e); // Use default bindings for other keys
    };

    // Handle custom key commands
    const handleKeyCommand = (command, editorState) => {
        if (command === 'bold') {
            const newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
            setEditorState(newState);
            return 'handled'; // Indicate the command was handled
        }
        return 'not-handled'; // Allow Draft.js to handle other commands
    };
    

    return (
        <div className={styles.bloc}>
            <Editor 
                editorState={editorState}
                className={styles.bloc}
                onKeyDown={onKeyDown}
                spellCheck={true}
                keyBindingFn={keyBindingFn}
                handleKeyCommand={handleKeyCommand}
                onChange={handleChange}>
            </Editor>
        </div>
    )
}

export default TextBloc