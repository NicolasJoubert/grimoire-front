import styles from '../../styles/Bloc.module.css';
import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TextBloc = ({ 
    handleKeyDown, 
    id,
    value, 
    setBlocValue,
    }) => {
    // TO DO : 
    //- gérer la suppression de bloc
    //- gérer le passage à la ligne en cliquant sur Entrée


    // const [userInput, setUserInput] = useState(value) 

    const [userInput, setUserInput] = useState(value); // Initial content

    const editor = useEditor({
        extensions: [StarterKit],
        content: userInput, // Initialize editor with userInput
        onUpdate({ editor }) {
            setUserInput(editor.getHTML()); // Update user input when editor content changes
            setBlocValue(id, editor.getHTML()) 
        },
        editorProps: {
            handleKeyDown: ({ event }) => {
                if (!event) {
                    return false
                }
                // Detect Ctrl+B or Cmd+B
                handleBold(event)// Allow other keydown events
            },
        },
    });

    const onKeyDown = (e) => {
        // handleKeyDown(e, id)
        console.log("foo")
    }


    // const handleChange = (e) => {
    //     setInputValue(e.target.value)
    //     updateContent()
    //     setBlocValue(id, e.target.value)
    // } 

    // const handleInputChange = (e) => {
    //     const newContent = e.target.value;
    //     setUserInput(newContent); // Update state
    //     if (editor) {
    //         editor.commands.setContent(newContent); // Update editor content
    //     }
    // };

    const handleBold = (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
            event.preventDefault();
            editor.chain().focus().toggleBold().run();
            return true; // Prevent default behavior
          }
        return false; // Allow other keydown events
    };

    // const handleKeyDown = (e) => {
    //     if (e.ctrlKey && e.key === 'b') {
    //       e.preventDefault();
    //       handleBold();
    //     }
    //   };



    return (
        <div className={styles.bloc}>
            {/* <input
                value={userInput}
                onChange={handleInputChange}
                placeholder="Enter new content"
                onKeyDown={handleKeyDown}
            /> */}
            
            {/* TipTap Editor */}
            <EditorContent 
                editor={editor}/>
        </div>
    )
}

export default TextBloc