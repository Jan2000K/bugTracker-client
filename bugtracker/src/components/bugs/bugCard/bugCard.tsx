import { useState } from "react"
import EditBug from "../Modal/editBug/editBug"
import "./bugCard.css"

export default function BugCard(bugData:bug){
    function openEditModal(){
        setModalOpen(true)

    }

    const [modalOpened,setModalOpen] = useState(false)
    return(
        <div className="columnNames bugContainer">
            <ul>
                <li className="bugTitle" onClick={openEditModal}>{bugData.name}</li>
                <li>{bugData.status}</li>
                <li>{bugData.severity}</li>
                <li>{bugData.note}</li>
            </ul>
            {modalOpened?<EditBug bugData={{...bugData}} modalState={{setter:setModalOpen,value:modalOpened}}  />:null}
        </div>

        
    )
}