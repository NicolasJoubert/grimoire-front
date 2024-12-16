import { useEffect, useState } from 'react'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

const LanguageSelector = ({ selectedLanguage, setSelectedLanguage }) => {

    const [languages, setLanguages] = useState([])


    // const languages = [
    //     { displayValue: "Javascript", editorValue: "javascript", apiValue: "nodejs", isExecutable: true },
    //     { displayValue: "Python 3", editorValue: "python", apiValue: "python3", isExecutable: true },
    //     { displayValue: "Go", editorValue: "golang", apiValue: "go", isExecutable: true },
    //     { displayValue: "CSS", editorValue: "css", apiValue: null, isExecutable: false },
    //     // to add: java, ruby, json, xml, shell script, html... => compare ace editor and jdoodle doc
    // ]

    // Handler for when selected language changes
    const handleSelectedLanguageChange = (event) => {
        setSelectedLanguage(
            languages.find(language => language.displayValue === event.target.value)
        );
    };

    const fetchLanguages = async () => {
        try {
            const response = await fetch(`${backendUrl}/dev/languages`)
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json()
            if (!data.result) throw new Error('Error retrieving languages from backedn')
            
            setLanguages(data.dev_languages)

        } catch(err) {
            console.log(err.message)
        }
    }


    useEffect(() => {
        fetchLanguages()
    }, [])


    return (
        <div>
            <select id="language-select" value={selectedLanguage.displayValue} onChange={handleSelectedLanguageChange}>
                {languages.map((language) => (
                    <option key={language.displayValue} value={language.displayValue}>{language.displayValue}</option>
                ))}
            </select>
        </div>
    )
}

export default LanguageSelector