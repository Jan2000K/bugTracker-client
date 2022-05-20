
import BugCard from "./bugCard/bugCard"
import "./bugs.css"

import { useEffect, useState } from "react"

export default function Bugs(bugsProp:bugsDisplayProp){

    function openModal(){
        const modal = document.querySelector(".addModal") as HTMLElement
        modal.style.display="block"
    }


    const [selectedBug,setSelectedBug] = useState<bug>({id:-1,name:"placeholder",note:"",severity:"High",status:"Closed"})
    return(
        <div className="bugsContainer">
            <div className="bugHeader">
                <h2>{bugsProp.activeProject.name} Bugs</h2>
                <button onClick={openModal}>+ Add bug</button>
            </div>
            <div className="bugStats">
                <div className="statContainer openBugs">
                    <p>{bugsProp.activeProject.bugStats.open} <br/>
                    Open Bugs</p>
                </div>
                <div className="statContainer highPriority">
                    <p>{bugsProp.activeProject.bugStats.highPriority} <br/>
                    High Priority</p>
                </div>
                <div className="statContainer meduimPriority">
                   <p>{bugsProp.activeProject.bugStats.mediumPriority} <br/>
                   Medium Priority</p>
                </div>

                <div className="statContainer lowPriority">
                  <p>{bugsProp.activeProject.bugStats.lowPriority} <br/>
                  Low Priority</p>
                </div>
            </div>

            <div className="columnNames">
                <ul>
                    <li>Bug</li>
                    <li>Status</li>
                    <li>Severity</li>
                    <li>Note</li>
                </ul>
            </div>
            {bugsProp.bugArray.map(
                (bug)=>{
                    return(<BugCard  bugData={{id:bug.id,name:bug.name,note:bug.note,severity:bug.severity,status:bug.status}} bugState={{value:selectedBug,setter:setSelectedBug}} fetchIncrementState={bugsProp.fetchIncrement} isLogged={bugsProp.isLogged} key={bug.id}  />)
                }
            )}

           

        

        </div>
    )
}