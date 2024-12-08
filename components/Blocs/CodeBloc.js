import { useState, useEffect } from 'react'

const CodeBloc = ({ 
    handleKeyDown, 
    id,
    value,
    setBlocValue }) => {

    const [inputValue, setInputValue] = useState(value) 


    const onKeyDown = (e) => {
        handleKeyDown(e, id)
    }

    const handleChange = (e) => {
        setInputValue(e.target.value)
        setBlocValue(id, inputValue)
    } 

    return (
        <div className={styles.bloc}>
            <input 
                className=""
                onKeyDown={onKeyDown}
                type="text"
                value={inputValue}
                onChange={handleChange}>
            </input>
        </div>
    )
}

export default CodeBloc