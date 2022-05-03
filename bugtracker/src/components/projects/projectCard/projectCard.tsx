import "./projectCard.css"

export default function ProjectCard(projectData:project){

    const setActiveProject = projectData.activeProjectState?.setter

    function setThisToActive(){
        const currentProject:project = {...projectData}
        if(setActiveProject!==undefined){
            setActiveProject(currentProject)
        }
    }
    return(
        <div className="projectCard">
            <div><p className="projectName" onClick={setThisToActive}>{projectData.name}</p></div>
            <p>{projectData.bugStats.open}</p>
            <p>{projectData.bugStats.highPriority}</p>
        </div>
    )
}