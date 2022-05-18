import axios from "axios";
import { ChangeEvent, useState } from "react";
import ProjectCard from "./projectCard/projectCard";
import "./projects.css";
export default function Projects(
  props:{projectsState:reactStateProp<project[]>,activeProject:reactStateProp<project | null>}
) {
  let data: project[] = props.projectsState.value;
  const setProjectData = props.projectsState.setter;
  const [projectError, setProjectError] = useState("");

  const [projectDataCopy, setProjectDataCopy] = useState<project[]>(data);
  const [searchValue, setSearchValue] = useState("");
  async function addProject() {
    const inputElement = document.querySelector(
      "#addProjectInput"
    ) as HTMLInputElement;
    if (inputElement.value.trim().length < 1) {
      setProjectError("Enter project name!");
    } else {
      await axios.post("http://localhost:5000/project",{
        "id":0,
        "name":inputElement.value,
        "bugs":[]
      },{withCredentials:true})
      .then(
        (res)=>{
          console.log(res)
          if(res.data.err){
            setProjectError(res.data.message)
          }
          else{
            console.log(res.data)
          }
        }
      )
      .catch(
        (err)=>{
          console.log(err)
        }
      )
      inputElement.value=""
      if(projectError!==""){
        setProjectError("")
        
      }

      
    }
  }
  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      setProjectDataCopy(data);
    } else {
      let filtered = data.filter((val) => {
        if (val.name.includes(e.target.value)) {
          return true;
        } else {
          return false;
        }
      });
      setProjectDataCopy(filtered);
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
          type={"search"}
          placeholder={"Search Projects..."}
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <div className="projectHead">
        <h2>Projects</h2>
        <div className="openBugsBox statusBox"  />
        <div className="highSeverityBox statusBox" />
      </div>

      <div className="projectsContainer">
        {projectDataCopy.map((projectInstance,index) => {
          return (
            <ProjectCard
            key={projectInstance.id}
              project={{
              id:projectInstance.id,
              name:projectInstance.name,
              bugStats:projectInstance.bugStats,
              bugs:projectInstance.bugs
              }}
              activeProjectState={props.activeProject}
            />
          );
        })}
      </div>
    </section>
  );
}
