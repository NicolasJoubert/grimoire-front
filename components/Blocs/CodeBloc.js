import styles from '../../styles/Bloc.module.css';
import { useState, useEffect } from 'react'
import { 
        Editor, 
        EditorState, 
        ContentState, 
        convertFromRaw,
        getDefaultKeyBinding,
        RichUtils, 
    } from 'draft-js';
import 'draft-js/dist/Draft.css';

const CodeBloc = ({ 
    handleKeyDown, 
    id,
    textContent, 
    rawContent,
    addBlock, 
    setBlocValue }) => {
    // TO DO : 
    //- gérer la suppression de bloc
    //- gérer le passage à la ligne en cliquant sur Entrée


    // const [inputValue, setInputValue] = useState(value) 
    const [editorState, setEditorState] = useState(
        // () => EditorState.createEmpty()
        textContent ? EditorState.createWithContent(ContentState.createFromText(textContent)) : EditorState.createEmpty()
    )
    useEffect(() => {
        setEditorState(RichUtils.toggleBlockType(editorState, 'code-block'))
    }, [])

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

    const keyBindingFn = (e) => {
        if (e.key === 'Enter') {
            addBlock()
            return
        }
        return getDefaultKeyBinding(e); // Use default bindings for other keys
    };


    return (
        <div className={styles.bloc}>
            <Editor 
                editorState={editorState}
                className={styles.bloc}
                keyBindingFn={keyBindingFn}
                onChange={handleChange}>
            </Editor>
        </div>
    )
}

export default CodeBloc