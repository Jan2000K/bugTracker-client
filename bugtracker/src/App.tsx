import { useState,useContext,createContext, useEffect } from "react";
import "./App.css";
import Bugs from "./components/bugs/bugs";
import AddBug from "./components/bugs/Modal/addBug/addBug";
import LoginPage from "./components/loginPage/loginPage";
import Projects from "./components/projects/projects";
import { checkLogin, fetchAllProjects } from "./hooks/dataFetching";

function App() {
  async function fetch(){
    await fetchAllProjects().then(
      (res)=>{
        if(res.data.err===false){
          setActiveProject(res.data.message[0])
          setProjectData(res.data.message)
        }
      }
    )
    .catch(
      (err)=>{
        console.log(err)
      }
    )
  }

  async function checkAuth(){
    await checkLogin().then(
      (res)=>{
        console.log(res)
        if(res.data.err){
          setLogin(false)
        }
        else{
          setLogin(true)
        }
      }
    )
    .catch(
      (err)=>{
        setLogin(false)
      }
    )
  }

  
  useEffect(
    ()=>{
      checkAuth()
      fetch()
    },[]
  )

  const [projectData, setProjectData] = useState<project[]>([]);
  
  const [activeProject,setActiveProject] = useState<project>(projectData[0])

  const [isLogged,setLogin] = useState<boolean>(false)



  if(isLogged){

    if(projectData.length===0 ||activeProject ===null){
      return <p>Loading data</p>
    }
    else{
    return (
      <div className="App">
        <Projects activeProjectState={{setter:setActiveProject,value:activeProject}}  allProjectsState={{setter:setProjectData,value:projectData}}/>
        <Bugs bugArray={activeProject.bugs} activeProject={activeProject}/>
        <AddBug />
      </div>
    );
    }
  }
  else{
    return(
      <div className="loginContainer">
        <LoginPage setter={setLogin} value={isLogged}/>
      </div>
    )
  }

}

export default App;
