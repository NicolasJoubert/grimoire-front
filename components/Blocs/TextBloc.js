import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
// import ManageBlocsExtension from '../TipTap/ManageBlocsExtension'

const TextBloc = ({ 
    deleteBloc,
    addBloc,
    position,
    value, 
    setBlocsValue,
    }) => {

    //
    //  IMPORTANT !!!
    //
    //  if i delete -> is it deleted in database ?
    //  => to check !!
    //
    //


    const [editorInput, setEditorInput] = useState(value); // Initial content

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: true, // Disable specific functionality if needed
            }).extend({
                addKeyboardShortcuts() {
                    return {
                        Enter: () => {
                            addBloc();
                            // editor.commands.blur()   TO CHECK !!!
                            return true; // Suppress the default behavior
                        },
                    };
                },
            }),
        ],
        content: editorInput, // Initialize editor with userInput
        immediatelyRender: false,
        onCreate({ editor }) {
            editor.commands.focus()
        },
        onUpdate({ editor }) {
            setEditorInput(editor.getHTML()); // Update user input when editor content changes
            setBlocsValue(position, editor.getHTML()) 
            document.addEventListener('keydown', handleKeyDown, editor);
        },
        editorProps: {
            attributes: {
                class: "flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md"
            },
        },
    });

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace' && editor.isEmpty) {
            console.log("deletion baby")
            deleteBloc(position);
        } 
    };

    // useEffect(() => {
    //     if (!editor) {
    //         console.log("No editor");
    //         return;
    //     }
        
    //     const handleKeyDown = (event) => {
    //         if (event.key === 'Backspace' && editor.isEmpty) {
    //             deleteBloc(position);
    //         } else if (event.key === 'Enter') {
    //             addBloc()
    //             event.preventDefault()
    //         }
    //     };

    //     editor.on("update", ({ editor }) => {
    //         document.addEventListener('keydown', handleKeyDown);
    //     });

    //     // Cleanup
    //     return () => {
    //         document.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, [editor, position, deleteBloc]);

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