import "./projectCard.css"

export default function ProjectCard(props:{activeProjectState:reactStateProp<project |null>,project:project}){

    const setActiveProject = props.activeProjectState?.setter

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
        </div>
    )
}