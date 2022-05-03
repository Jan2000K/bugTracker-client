import { useState } from "react";
import "./App.css";
import Bugs from "./components/bugs/bugs";
import AddBug from "./components/bugs/Modal/addBug/addBug";
import LoginPage from "./components/loginPage/loginPage";
import Projects from "./components/projects/projects";

function App() {
  const initialObj:project={
    id: 5,
    name: "Project One",
    bugs: [
      {
        id: 1,
        name: "Center front image",
        status: "Open",
        severity: "Medium",
        note: "Filename:Index.js",
      }
    ],
    bugStats:{
      open:1,
      mediumPriority:1,
      highPriority:0,
      lowPriority:0
    } 
  }

  const secondObj:project ={
    id: 10,
    name: "Project two",
    bugs: [
      {
        id: 2,
        name: "Fix login error message",
        status: "Testing",
        severity: "High",
        note: "Filename:Login.js",
      },
      {
        id: 3,
        name: "Lower image opacity",
        status: "Closed",
        severity: "Low",
        note: "Filename:Index.js",
      }
    ],
    bugStats:{
      open:2,
      highPriority:1,
      mediumPriority:0,
      lowPriority:1
    } 
  }
  const [projectData, setProjectData] = useState<project[]>([initialObj,secondObj]);

  const [activeProject,setActiveProject] = useState<project>(projectData[0])

  const Loggedin = false

  if(Loggedin){
    return (
      <div className="App">
        <Projects activeProjectState={{setter:setActiveProject,value:activeProject}}  allProjectsState={{setter:setProjectData,value:projectData}}/>
        <Bugs bugArray={activeProject.bugs} activeProject={activeProject}/>
        <AddBug />
      </div>
    );
  }
  else{

    return(
      <div className="loginContainer">
        <LoginPage />
      </div>
    )
  }

}

export default App;
