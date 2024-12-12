// import './styles.scss'
import clsx from 'clsx';
import 'antd/dist/antd.css';
import { Popover } from 'antd';
import { useState } from 'react'

import React from 'react'

// Import a theme and a language mode from Ace
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-javascript";

// Ensure Ace can find its worker files
import "ace-builds/src-noconflict/worker-javascript";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

const CodeBloc = ({ 
    blocId,
    noteId,
    type,
    language,
    content, 
    deleteBloc,
    addBloc,
}) => {

    const [editorInput, setEditorInput] = useState(content); // Initial content
    const [blocHeight, setBlocHeight] = useState('24px'); //              // !!!!!!!!!!  CODE GPT TO REMOVE 

    // const [nextBlocType, setNextBlocType] = useState("") 

    const editorStyle = "flex-1 focus:outline-none bg-darkPurple text-white rounded-md pt-0.5 px-1"

    
    
    const saveBloc = async () => {
        try {
            const response = await fetch(`${backendUrl}/blocs/`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ blocId, type, content: editorInput, language })
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
    
    /** Sync bloc height with Editor height */
    const adjustHeight = (editor) => {                  // !!!!!!!!!!!  CODE GPT TO REMOVE !!!!!! 
        if (editor) {
            const { height } = editor.view.dom.getBoundingClientRect(); // Get the bounding height
            setBlocHeight(`${height}px`);
        }
    };

    if (editor && blocHeight === '24px') {             // !!!!!!!!!!!  CODE GPT TO REMOVE !!!!!! 
        adjustHeight(editor);
    }

    const popoverContentStyle = "flex w-full focus:outline-none bg-lightPurple text-darkPurple hover:bg-darkPurple hover:text-white rounded-sm pt-0.5 hover:cursor-pointer"
    const popoverContent = (
        <div className="">
          <div className={popoverContentStyle} onClick={() => addBloc("text", noteId)}>Texte</div>
          <div className={popoverContentStyle} onClick={() => addBloc("code", noteId)}>Code</div>
        </div>
    );

    const container = "flex justify-between items-start"
    const popoverStyle = ""
    const buttonStyle = "rounded-full w-6 h-6 text-center cursor-pointer bg-transparent text-white hover:bg-darkPurple hover:opacity-100 transition-opacity duration-200 opacity-0"
    const inputStyle = "w-full h-6 ml-2.5 text-black"// border-solid border border-black rounded-md 

    return (                              // style= code GPT TO REMOVE !!!!!! 
        <div className={clsx(container)} style={{ height: blocHeight }}>  
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

export default CodeBloc