import "./projectCard.css"
import editIcon from "../../../assets/editIcon.svg"
import { useState } from "react"
import EditProjectModal from "../editModal/editModal"
export default function ProjectCard(props:{activeProjectState:reactStateProp<project |null>,project:project,isLogged:reactStateProp<boolean>,fetchIncrement:reactStateProp<number>}){

    const setActiveProject = props.activeProjectState?.setter

    const [modalOpen,setModalOpen] = useState(false)

    function openEditModal(){
        setModalOpen(true)
    }
    function setThisToActive(){
        const currentProject:project = {...props.project}
        if(setActiveProject!==undefined){
            setActiveProject(currentProject)
        }
    }


    return(
        <div className="projectCard">
            <div><p className="projectName" onClick={setThisToActive}>{props.project.name}</p></div>
            <p>{props.project.bugStats.open}</p>
            <p>{props.project.bugStats.highPriority}</p>
            <img src={editIcon}  onClick={openEditModal}/>
            {modalOpen?<EditProjectModal modalVisible={{setter:setModalOpen,value:modalOpen}} fetchIncrement={props.fetchIncrement} isLogged={props.isLogged} projectObj={{id:props.project.id,name:props.project.name,bugs:props.project.bugs}} />:null }
        </div>

    )
}