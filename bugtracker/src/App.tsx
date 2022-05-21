import { useState, useEffect } from "react";
import "./App.css";
import Bugs from "./components/bugs/bugs";
import AddBug from "./components/bugs/Modal/addBug/addBug";
import LoginPage from "./components/loginPage/loginPage";
import Projects from "./components/projects/projects";
import { checkLogin, fetchAllProjects } from "./hooks/dataFetching";

function App() {


  async function checkAuth(){
    await checkLogin().then(
      (res)=>{
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

  

  const [fetchIncrement,setFetchIncrement] = useState<number>(0)

  const [projectData, setProjectData] = useState<project[]>([]);
  
  const [activeProject,setActiveProject] = useState<project | null>(null)


  const [isLogged,setLogin] = useState<boolean>(false)

  const [loadingMessage,setLoadingMessage] = useState("Loading data")

 
  useEffect(
    ()=>{
      checkAuth()
    },[]
  )
  useEffect(
    ()=>{
      async function fetch(){
        await fetchAllProjects().then(
          (res)=>{
            if(res.data.err===false){
              setProjectData(res.data.message)
              if(activeProject!==null){
                let newActiveProject = projectData.filter(
                  (proj)=>{
                      if(proj.id===activeProject.id){
                        return true
                      }
                      return false
                  }
                )
                setActiveProject(newActiveProject[0])
              }
              setFetchIncrement(1)
            }
          }
        )
        .catch(
          (err)=>{
            setLoadingMessage("Error retriving data from server")
          }
        )
      }
      fetch()
    },[isLogged,fetchIncrement]
  )


  if(isLogged){
    if(fetchIncrement===0 || projectData.length===0){
      return <p>{loadingMessage}</p>
    }
    else if(projectData.length===0 || activeProject===null || activeProject===undefined ){
      return (
        <div className="App">
          <Projects fetchIncrement={{setter:setFetchIncrement,value:fetchIncrement}} activeProject={{setter:setActiveProject,value:activeProject}} isLogged={{setter:setLogin,value:isLogged}} projectsState={{setter:setProjectData,value:projectData}}/>
        </div>
      );

    }
    else{
    return (
      
      <div className="App">
        <Projects fetchIncrement={{setter:setFetchIncrement,value:fetchIncrement}} activeProject={{setter:setActiveProject,value:activeProject}} isLogged={{setter:setLogin,value:isLogged}} projectsState={{setter:setProjectData,value:projectData}}/>
        <Bugs bugArray={activeProject.bugs} isLogged={{setter:setLogin,value:isLogged}} fetchIncrement={{setter:setFetchIncrement,value:fetchIncrement}} activeProject={activeProject}/>
        <AddBug activeProjectState={{setter:setActiveProject,value:activeProject}} isLogged={{setter:setLogin,value:isLogged}} incrementState={{setter:setFetchIncrement,value:fetchIncrement}}/>
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
