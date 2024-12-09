import { useState } from "react"
import SidebarLeft from "./SidebarLeft"
import SidebarRight from "./SidebarRight"
import Searchbar from "./Searchbar"
import Note from "./Note"
import Placeholder from "./Placeholder"

export default function Home() {

    const [isSidebarLeftVisible, setIsSidebarLeftVisible] = useState(true)
    const [isSidebarRightVisible, setIsSidebarRightVisible] = useState(true)
    const [isNoteVisible, setIsNoteVisible] = useState(true)

    const toggleSidebarLeft = () => {
        setIsSidebarLeftVisible(!isSidebarLeftVisible)
    }
    return (
        <div className="text-white p-4 flex flex-row space-x h-screen p-0 m-0">
            {isSidebarLeftVisible && <SidebarLeft toggleSidebarLeft={toggleSidebarLeft}/> }
            <div className="h-full flex-1 flex flex-col">
                <Searchbar />
                {isNoteVisible ? <Note /> : <Placeholder />}
            </div>
            {isSidebarRightVisible && <SidebarRight /> }
        </div>
    )

}

/*
    <div className="bg-red-500 flex flex-row">
            <div className="basis-1/5 bg-red-500"></div>
            <div className="basis-11/20 bg-blue-500"></div>
            <div className="basis-1/4 bg-blue-500"></div>
    </div>
*/