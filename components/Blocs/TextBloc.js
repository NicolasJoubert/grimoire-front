import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
// import ManageBlocsExtension from '../TipTap/ManageBlocsExtension'

const TextBloc = ({ 
    blocId,
    noteId,
    type,
    content, 
    deleteBloc,
    addBloc,
    blocRef,
    switchBlocs,
    position,
    }) => {

    const saveBloc = async () => {
        try {
            const response = await fetch(`${backendUrl}/blocs/`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ blocId, type })
              });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.result) {
                // for now, only log success
                console.log(`Note ${currentNote} saved in database`)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const [editorInput, setEditorInput] = useState(content); // Initial content

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: true, // Disable specific functionality if needed
            })
            .extend({
                addKeyboardShortcuts() {
                    return {
                        Enter: () => {
                            return true; // Prevent adding line return in current bloc
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
        // onFocus({ editor }) {
        // },
        onUpdate({ editor }) {
            setEditorInput(editor.getHTML()); // Update user input when editor content changes 
        },
        editorProps: {
            attributes: {
                class: "flex-1 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md"
            },
            handleDOMEvents: {
                keydown: (view, e) => {
                    handleKeyDown(e)
                    return false; // Allow default behavior
                },
            },
        },
    });

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace' && editor.isEmpty) {
            deleteBloc(blocId);
            return
        } 
        if (event.key === 'Enter') {
            addBloc(type, noteId)
            return
        }
        if (event.key === 'ArrowUp') {
            // addBloc(type, noteId)
            return
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
                onClick={() => addBloc(type, noteId)}>+</div>
            {/* <div 
                className={buttonStyle}
                onClick={() => deleteBloc(blocId)}>-</div> */}
            <EditorContent 
                ref={blocRef}
                editor={editor}
                className={inputStyle}/>
        </div>
    )
}

export default TextBloc