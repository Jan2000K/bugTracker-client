import { useState, useEffect } from "react"
import "./App.css"
import Bugs from "./components/bugs/bugs"
import AddBug from "./components/bugs/Modal/addBug/addBug"
import LoginPage from "./components/loginPage/loginPage"
import Projects from "./components/projects/projects"
import { checkLogin, fetchAllProjects } from "./hooks/dataFetching"

function App() {
  async function checkAuth() {
    //Checking if user is Authorized
    checkLogin()
      .then((res) => {
        if (res.data.err) {
          setLogin(false)
        } else {
          setLogin(true)
        }
      })
      .catch(() => {
        setLogin(false)
      })
  }

  //changing state to refetch the data from the API
  const [fetchIncrement, setFetchIncrement] = useState<number>(0)
  
  const [projectData, setProjectData] = useState<project[]>([])

  const [activeProject, setActiveProject] = useState<project | null>(null)

  const [isLogged, setLogin] = useState<boolean>(false)

  const [loadingMessage, setLoadingMessage] = useState("Loading data")
 //first check users Auth
  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    //if user is authorized, then fetch data from the API
    if(isLogged){
    fetchAllProjects()
      .then((res) => {
        if (res.data.err === false) {
          setProjectData(res.data.message)
          //if there is an active project, find it in the new data recived and update the state with new data
          if (
            activeProject !== null &&
            activeProject !== undefined &&
            projectData.length > 0
          ) {
            let newActiveProject = projectData.filter((proj) => {
              if (proj && proj.id) {
                if (proj.id === activeProject.id) {
                  return true
                }
                return false
              } 
            })
            //if the new projectDataArray has a length of 0 it means, no project was found that matched the previous active project
            if (newActiveProject.length === 0) {
              setActiveProject(null)
            } else {
              setActiveProject(newActiveProject[0])
            }
          } else {
            //if there was no previous active project set new project data
            setProjectData(res.data.message)
            
            if (res.data.message.length > 0) {
              setActiveProject(res.data.message[0])
            }
          }
          //set fetchIncrement to 1 meaning fetching is complete
          setFetchIncrement(1)
        }
      })
      .catch(() => {
        setLoadingMessage("Error retriving data from server")
      })
    }
  }, [isLogged, fetchIncrement])

  if (isLogged) {
    //check if data is still loading
    if (fetchIncrement === 0 || projectData === undefined) {
      return <p>{loadingMessage}</p>
    } else if (
      projectData.length === 0 ||
      activeProject === null ||
      activeProject === undefined
    ) {
      //if there are no projects or no active project only return Projects menu
      return (
        <div className="App">
          <Projects
            fetchIncrement={{
              setter: setFetchIncrement,
              value: fetchIncrement,
            }}
            activeProject={{ setter: setActiveProject, value: activeProject }}
            isLogged={{ setter: setLogin, value: isLogged }}
            projectsState={{ setter: setProjectData, value: projectData }}
          />
        </div>
      )
    } else {
      //If there are return projects and menu screen
      return (
        <div className="App">
          <Projects
            fetchIncrement={{
              setter: setFetchIncrement,
              value: fetchIncrement,
            }}
            activeProject={{ setter: setActiveProject, value: activeProject }}
            isLogged={{ setter: setLogin, value: isLogged }}
            projectsState={{ setter: setProjectData, value: projectData }}
          />
          <Bugs
            bugArray={activeProject.bugs}
            isLogged={{ setter: setLogin, value: isLogged }}
            fetchIncrement={{
              setter: setFetchIncrement,
              value: fetchIncrement,
            }}
            activeProject={activeProject}
          />
          <AddBug
            activeProjectState={{
              setter: setActiveProject,
              value: activeProject,
            }}
            isLogged={{ setter: setLogin, value: isLogged }}
            incrementState={{
              setter: setFetchIncrement,
              value: fetchIncrement,
            }}
          />
        </div>
      )
    }
  } else {
    return (
      <div className="loginContainer">
        <LoginPage setter={setLogin} value={isLogged} />
      </div>
    )
  }
}
  
export default App
