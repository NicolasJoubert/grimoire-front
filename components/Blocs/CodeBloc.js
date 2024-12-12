// import './styles.scss'
import clsx from 'clsx';
import 'antd/dist/antd.css';
import { Popover } from 'antd';
import { useEffect, useState } from 'react'

import AceEditor from "react-ace";

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

    const [code, setCode] = useState(content);    // ADD CONTENT
    const [devLang, setDevLang] = useState(language)
    const [lineCount, setLineCount] = useState(1);
    const [blocHeight, setBlocHeight] = useState('80px');

    useEffect(() => {
        // increase blocHeight on every 5 lines added
        (lineCount === 5 || lineCount % 5 === 0) && setBlocHeight(`${lineCount*16}px`) 
    }, [lineCount])

    const saveBloc = async () => {
        try {
            const response = await fetch(`${backendUrl}/blocs/`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ blocId, type, content: code, language })
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

    /** When code it written, it updates the input and save bloc in dv */
    const handleCodeChange = (newCode) => {
        setCode(newCode);
        saveBloc();
    };

      // Load editor and define custom commands
    const handleEditorLoad = (editor) => {
        // Set Shift+delete to delete a codebloc
        editor.commands.addCommand({
            name: "deleteBloc",
            bindKey: { win: "Shift-Backspace", mac: "Shift-Backspace" }, // Bind to Backspace key
            exec: () => {
                deleteBloc(blocId);
            },
        });
        //count number of line to define bloc height
        const updateLineCount = () => {
            const lines = editor.session.getLength();
            setLineCount(lines);
          };
      
          // Update line count whenever the editor content changes
          editor.session.on("change", updateLineCount);
      
          // Initialize the line count on editor load
          updateLineCount();
    };


    const popoverContentStyle = "flex w-full focus:outline-none bg-lightPurple text-darkPurple hover:bg-darkPurple hover:text-white rounded-sm pt-0.5 hover:cursor-pointer"
    const popoverContent = (
        <div className="">
          <div className={popoverContentStyle} onClick={() => addBloc("text", noteId)}>Texte</div>
          <div className={popoverContentStyle} onClick={() => addBloc("code", noteId)}>Code</div>
        </div>
    );

    const container = "flex justify-between items-start mt-0.5"
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
            {/* <div className="flex-1 rounded-md"> */}
                <AceEditor
                    mode="javascript" // Language mode
                    theme="monokai" // Theme
                    value={code} // Current code
                    onChange={handleCodeChange} // Update state on code change
                    onLoad={handleEditorLoad}
                    name={`code-editor-${blocId}`} // Unique ID for the editor
                    editorProps={{ $blockScrolling: true }}
                    fontSize={14}
                    width="95%"
                    className="rounded-md"
                    height={blocHeight}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                />
            {/* </div> */}
        </div>
    )
}

export default CodeBloc