import { ChangeEvent, useState } from "react"
import { postNewProject } from "../../hooks/dataFetching"
import ProjectCard from "./projectCard/projectCard"
import "./projects.css"
export default function Projects(props: {
  projectsState: reactStateProp<project[]>
  activeProject: reactStateProp<project | null>
  isLogged: reactStateProp<boolean>
  fetchIncrement: reactStateProp<number>
}) {
  let data: project[] = props.projectsState.value
  const [projectError, setProjectError] = useState("")
  const [projectDataCopy, setProjectDataCopy] = useState<project[]>(data)
  const [searchValue, setSearchValue] = useState("")
  async function addProject() {
    const inputElement = document.querySelector(
      "#addProjectInput"
    ) as HTMLInputElement
    if (inputElement.value.trim().length < 1) {
      setProjectError("Enter project name!")
    } else {
      postNewProject({ id: 0, name: inputElement.value, bugs: [] })
        .then((res) => {
          if (res.data.err) {
            setProjectError(res.data.message)
          } else {
            props.fetchIncrement.setter(0)
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            props.isLogged.setter(false)
          } else {
            setProjectError("Error adding project")
          }
        })
      inputElement.value = ""
      if (projectError !== "") {
        setProjectError("")
      }
    }
  }
  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
    if (e.target.value === "") {
      setProjectDataCopy(data)
    } else {
      let filtered = data.filter((val) => {
        if (val.name.includes(e.target.value)) {
          return true
        } else {
          return false
        }
      })
      setProjectDataCopy(filtered)
    }
  }

  return (
    <section id="projects">
      <div className="addProjectContainer">
        <h2>Add new project</h2>
        {projectError === "" ? null : (
          <p className="errorMsg">{projectError}</p>
        )}
        <input
          type={"text"}
          placeholder={"Project name..."}
          id="addProjectInput"
        />
        <button onClick={addProject}>+ Add</button>
      </div>
      <div className="searchContainer">
        <input
          className="searchProjectsInput"
          type={"search"}
          placeholder={"Search Projects..."}
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <div className="projectHead">
        <h2>Projects</h2>
        <div className="openBugsBox statusBox" title="Open Bugs" />
        <div className="highSeverityBox statusBox" title="High Severity Bugs" />
      </div>

      <div className="projectsContainer">
        {projectDataCopy.map((projectInstance) => {
          return (
            <ProjectCard
              isLogged={props.isLogged}
              fetchIncrement={props.fetchIncrement}
              key={projectInstance.id}
              project={{
                id: projectInstance.id,
                name: projectInstance.name,
                bugStats: projectInstance.bugStats,
                bugs: projectInstance.bugs,
              }}
              activeProjectState={props.activeProject}
            />
          )
        })}
      </div>
    </section>
  )
}
