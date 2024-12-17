import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

const EditorThemeSelector = ({ selectedEditorTheme, setSelectedEditorTheme }) => {

    // const user = useSelector((state) => state.user.value);

    // const [selectedEditorTheme, setSelectedEditorTheme] = useState(user.defaultEditorTheme)
    // const [selectedEditorTheme, setSelectedEditorTheme] = useState({displayValue: "Monokaï", edtorValue: "monokai"})
    const [editorThemes, setEditorThemes] = useState([])
    // const user = useSelector((state) => state.user.value);

    // Handler for when selected language changes
    const handleSelectedEditorThemeChange = (event) => {
        setSelectedEditorTheme(
            editorThemes.find(theme => theme.displayValue === event.target.value)
        );
    };

    const fetchThemes = async () => {
        try {
            const response = await fetch(`${backendUrl}/dev/editor_themes`)
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json()
            if (!data.result) throw new Error('Error retrieving editor themes from backend')
            setEditorThemes(data.editor_themes)

        } catch(err) {
            console.log(err.message)
        }
    }


    useEffect(() => {
        fetchThemes()
    }, [])


    return (
        <div>
            <select id="editor_theme-select" value={selectedEditorTheme.displayValue} onChange={handleSelectedEditorThemeChange}>
                {editorThemes.map((theme) => (
                    <option key={theme.displayValue} value={theme.displayValue}>{theme.displayValue}</option>
                ))}
            </select>
        </div>
    )
}

export default EditorThemeSelector