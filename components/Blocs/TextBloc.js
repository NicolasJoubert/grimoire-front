import { useEffect, useState } from 'react'
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

    const [editorInput, setEditorInput] = useState(value); // Initial content

    // const CustomStarterKit = StarterKit.extend({
    //     addKeyboardShortcuts() {
    //         return {
    //           'Backspace': () => console.log("ta mère"),
    //         }
    //       },
    // })

    useEffect(() => {
        window.addEventListener("keydown", function (e) {
            console.log("userInput =>", editorInput);
            e.key === "Backspace" && (editorInput === "<p></p>" || editorInput === "") && deleteBloc(position);
        });

        return (() => {
            window.removeEventListener("keydown", function (e) {
                e.key === "Backspace" && (editorInput === "<p></p>" || editorInput === "") && deleteBloc(position);
            }); 
        })
    }, [editorInput])

    const editor = useEditor({
        extensions: [StarterKit],
        content: editorInput, // Initialize editor with userInput
        onUpdate({ editor }) {
            setEditorInput(editor.getHTML()); // Update user input when editor content changes
            setBlocsValue(position, editor.getHTML()) 
        },
        editorProps: {
            attributes: {
                class: "flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md"
            },
        },
    });

    const container = "flex justify-between items-center"
    const buttonStyle = "rounded-full border-solid border border-black w-6 h-6 text-center cursor-pointer"
    const inputStyle = "w-full h-6 ml-2.5 text-black"// border-solid border border-black rounded-md 
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