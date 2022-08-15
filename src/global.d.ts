import React from "react"

declare global{

    interface reactStateProp<T>{
        value:T,
        setter:React.Dispatch<React.SetStateAction<T>>
    }


    interface activeAndAllProjectsReactState{
        activeProjectState:reactStateProp<project>
        allProjectsState:reactStateProp<project[]>
    }

    interface project{
        id:number,
        name:string,
        bugs:bug[],
        bugStats:bugStats
        activeProjectState?:reactStateProp<project>
    }

    interface projectCardProps{
        id:number,
        name:string,
        bugStats:bugStats
    }
    interface bug{
        id:number,
        name:string,
        status:bugStatus,
        severity:bugSeverity,
        note:string,
        bugState?:reactStateProp<bug>
    }

    interface bugStats{
        open:number,
        highPriority:number,
        mediumPriority:number,
        lowPriority:number
    }

    interface editBugProp{
        bugData:bug,
        modalState : reactStateProp<boolean>,
        fetchIncrement:reactStateProp<number>,
        isLogged:reactStateProp<boolean>
    }

    interface bugsDisplayProp{
        activeProject:project,
        bugArray:bug[],
        fetchIncrement:reactStateProp<number>,
        isLogged:reactStateProp<boolean>    
    }
    type bugStatus = "Open"  | "Testing" | "Closed"

    type bugSeverity = "Low" | "Medium" | "High"

    interface authContext<T>{
        state:reactStateProp<T>
    }

    interface apiResponse{
        err:boolean,
        message:string
    }
}

export default global