import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TextBloc = ({ 
    handleKeyDown, 
    id,
    value, 
    setBlocValue,
    }) => {

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

    const handleBold = (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
            event.preventDefault();
            editor.chain().focus().toggleBold().run();
            return true; // Prevent default behavior
          }
        return false; // Allow other keydown events
    };

    return (
        <div className="">
            <EditorContent 
                editor={editor}/>
        </div>
    )
}

export default TextBloc