import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
// import ManageBlocsExtension from '../TipTap/ManageBlocsExtension'

const TextBloc = ({ 
    // handleKeyDownYo, 
    deleteBloc,
    addBloc,
    position,
    value, 
    setBlocsValue,
    }) => {

    const [userInput, setUserInput] = useState(value); // Initial content

    // const CustomStarterKit = StarterKit.extend({
    //     addKeyboardShortcuts() {
    //         return {
    //           'Backspace': () => console.log("ta mère"),
    //         }
    //       },
    // })

    const editor = useEditor({
        extensions: [StarterKit],
        content: userInput, // Initialize editor with userInput
        onUpdate({ editor }) {
            setUserInput(editor.getHTML()); // Update user input when editor content changes
            setBlocsValue(position, editor.getHTML()) 
        },
        editorProps: {
            handleKeyDown: ({ event }) => {
                console.log("event", event)
                if (!event) {
                    return false
                }
                if ((event.key === "Backspace") && (userInput.length === 0)) {
                    event.preventDefault();
                    deleteBloc(position)
                    return true;
                }
                return false; // Allow other keydown events
            },
        },
    });

    // const onKeyDown = (e) => {
    //     // handleKeyDown(e, id)
    //     console.log("foo")
    // }

    const removeBloc = (event) => {
        // console.log(event)
        // if ((event.key === "Backspace") && (editor.content.length == 0)) {
        //     deleteBloc(position)
        // }
        if (event.key === "Backspace") {
            event.preventDefault();
            deleteBloc(position)
            return true;
        }
    }

    const container = "flex justify-between items-center"
    const buttonStyle = "rounded-full border-solid border border-black w-6 h-6 text-center cursor-pointer"
    const inputStyle = "bg-backgroundColor w-full h-full ml-2.5 border-solid border border-black rounded-lg text-black"
    return (
        <div className={container}>
            <div 
                className={buttonStyle}
                onClick={() => addBloc()}>+</div>
            <div 
                className={buttonStyle}
                onClick={() => deleteBloc(position)}>-</div>
            <EditorContent 
                editor={editor}
                className={inputStyle}/>
        </div>
    )
}

export default TextBloc