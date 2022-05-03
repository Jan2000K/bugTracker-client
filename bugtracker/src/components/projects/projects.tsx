import { ChangeEvent, useState } from "react";
import ProjectCard from "./projectCard/projectCard";
import "./projects.css";
export default function Projects(
  projectsState: activeAndAllProjectsReactState
) {
  let data: project[] = projectsState.allProjectsState.value;
  const setProjectData = projectsState.allProjectsState.setter;
  const [projectError, setProjectError] = useState("");

  const [projectDataCopy, setProjectDataCopy] = useState<project[]>(data);
  const [searchValue, setSearchValue] = useState("");
  function addProject() {
    const inputElement = document.querySelector(
      "#addProjectInput"
    ) as HTMLInputElement;
    if (inputElement.value.trim().length < 1) {
      setProjectError("Enter project name!");
    } else {
      inputElement.value=""
      if(projectError!==""){
        setProjectError("")
        
      }
      //API call
      let project: project = {
        id: 0,
        name: inputElement.value,
        bugs: [],
        bugStats: {
          highPriority: 0,
          lowPriority: 0,
          mediumPriority: 0,
          open: 0,
        },
      };
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
        {projectDataCopy.map((project) => {
          return (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              bugStats={project.bugStats}
              bugs={project.bugs}
              activeProjectState={projectsState.activeProjectState}
            />
          );
        })}
      </div>
    </section>
  );
}
