import clsx from 'clsx';
import 'antd/dist/antd.css';
import { Popover } from 'antd';
import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// import ManageBlocsExtension from '../TipTap/ManageBlocsExtension'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

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
    
    const [editorInput, setEditorInput] = useState(content); // Initial content
    const [lineCount, setLineCount] = useState(1);
    const [blocHeight, setBlocHeight] = useState(`${lineCount * 24}px`)

    useEffect(() => {
        setBlocHeight(`${(lineCount + 1) * 24}px`)
    }, [lineCount])

    // let blocHeight =  // bloc and input height increase proportionnaly with number of lines

    const editorStyle = clsx(`h-[${blocHeight}]`, "flex-1 focus:outline-none focus:bg-backgroundColor hover:bg-backgroundColor rounded-md pt-0.5")

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
        onBlur({ editor }) {
            saveBloc() // Save bloc when focus is lost
        },
        onUpdate({ editor }) {
            setEditorInput(editor.getHTML()); // Update user input when editor content changes 
            saveBloc()
        },
        editorProps: {
            attributes: {
                class: editorStyle
            },
            handleDOMEvents: {
                keydown: (view, e) => {
                    handleKeyDown(e)
                    return false; // Allow default behavior
                },
            },
        },
    });

    /** Manage key shortcuts  */
    const handleKeyDown = (event) => {
        if (event.key === 'Backspace' && editor.isEmpty) {
            deleteBloc(blocId);
            return
        } 

        if (event.key === 'Enter' && !event.shiftKey) {
            addBloc(type, noteId)
            return
        }
        if (event.key === 'ArrowUp') {
            // addBloc(type, noteId)
            return
        }
    };

    /** Save Bloc in database */
    const saveBloc = async () => {
        try {
            const response = await fetch(`${backendUrl}/blocs/`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ blocId, type, content: editorInput })
              });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.result) {
                // for now, only log success
                console.log(`Bloc ${blocId} saved in database`)
                // NEED TO MANAGE NOTE UPDATEDAT HERE (new route put ?)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const popoverContentStyle = "flex w-full focus:outline-none bg-lightPurple text-darkPurple hover:bg-darkPurple hover:text-white rounded-sm pt-0.5 hover:cursor-pointer"
    const popoverContent = (
        <div className="">
          <div className={popoverContentStyle} onClick={() => addBloc("text", noteId)}>Texte</div>
          <div className={popoverContentStyle} onClick={() => addBloc("code", noteId)}>Code</div>
        </div>
    );

    const container = clsx(`h-[${blocHeight}]`, "flex justify-between items-center mt-0.5")
    const popoverStyle = ""
    const buttonStyle = "rounded-full w-6 h-6 text-center cursor-pointer bg-transparent text-white hover:bg-darkPurple hover:opacity-100 transition-opacity duration-200 opacity-0"
    const inputStyle = "w-full h-6 ml-2.5 text-black"// border-solid border border-black rounded-md 
    return (
        <div className={container}>
            <Popover title="Type de bloc" content={popoverContent} className={popoverStyle} trigger="hover">
                <div 
                    className={buttonStyle}
                    onClick={() => addBloc(type, noteId)}>+</div>
            </Popover>

            <EditorContent 
                editor={editor}
                className={inputStyle}/>
        </div>
    )
}

export default TextBloc