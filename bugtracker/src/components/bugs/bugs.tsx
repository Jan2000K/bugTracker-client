import BugCard from "./bugCard/bugCard"
import "./bugs.css"

import { useState } from "react"

export default function Bugs(bugsProp: bugsDisplayProp) {
  function openModal() {
    const modal = document.querySelector(".addModal") as HTMLElement
    modal.style.display = "block"
  }

  const sortedArray = bugsProp.bugArray.sort((a, b) => {
    if (a.status === "Open" && b.status === "Open") {
      if (a.severity === "High" && b.severity === "High") {
        return 0
      } else if (a.severity === "High" && b.severity !== "High") {
        return -1
      } else if (b.severity === "High" && a.severity !== "High") {
        return 1
      } else if (a.severity === "Medium" && b.severity === "Low") {
        return -1
      } else if (b.severity === "Medium" && a.severity === "Low") {
        return 1
      } else if (a.severity === "Medium" && b.severity === "Medium") {
        return 0
      } else if (a.severity === "Low" && b.severity === "Low") {
        return 0
      } else {
        return 0
      }
    } else if (a.status === "Open" && b.status !== "Open") {
      return -1
    } else if (b.status === "Open" && a.status !== "Open") {
      return 1
    } else if (a.status === "Testing" && b.status === "Testing") {
      if (a.severity === "High" && b.severity === "High") {
        return 0
      } else if (a.severity === "High" && b.severity !== "High") {
        return -1
      } else if (b.severity === "High" && a.severity !== "High") {
        return 1
      } else if (a.severity === "Medium" && b.severity === "Low") {
        return -1
      } else if (b.severity === "Medium" && a.severity === "Low") {
        return 1
      } else if (a.severity === "Medium" && b.severity === "Medium") {
        return 0
      } else if (a.severity === "Low" && b.severity === "Low") {
        return 0
      } else {
        return 0
      }
    } else if (a.status === "Testing" && b.status === "Closed") {
      return -1
    } else if (b.status === "Testing" && a.status === "Closed") {
      return 1
    } else if (a.status === "Closed" && b.status === "Closed") {
      if (a.severity === "High" && b.severity === "High") {
        return 0
      } else if (a.severity === "High" && b.severity !== "High") {
        return -1
      } else if (b.severity === "High" && a.severity !== "High") {
        return 1
      } else if (a.severity === "Medium" && b.severity === "Low") {
        return -1
      } else if (b.severity === "Medium" && a.severity === "Low") {
        return 1
      } else if (a.severity === "Medium" && b.severity === "Medium") {
        return 0
      } else if (a.severity === "Low" && b.severity === "Low") {
        return 0
      } else {
        return 0
      }
    } else {
      return 0
    }
  })

  const [selectedBug, setSelectedBug] = useState<bug>({
    id: -1,
    name: "placeholder",
    note: "",
    severity: "High",
    status: "Closed",
  })
  return (
    <div className="bugsContainer">
      <div className="bugHeader">
        <h2>{bugsProp.activeProject.name} Bugs</h2>
        <button onClick={openModal}>+ Add bug</button>
      </div>
      <div className="bugStats">
        <div className="statContainer openBugs">
          <p>
            {bugsProp.activeProject.bugStats.open} <br />
            Open Bugs
          </p>
        </div>
        <div className="statContainer highPriority">
          <p>
            {bugsProp.activeProject.bugStats.highPriority} <br />
            High Priority
          </p>
        </div>
        <div className="statContainer meduimPriority">
          <p>
            {bugsProp.activeProject.bugStats.mediumPriority} <br />
            Medium Priority
          </p>
        </div>

        <div className="statContainer lowPriority">
          <p>
            {bugsProp.activeProject.bugStats.lowPriority} <br />
            Low Priority
          </p>
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
      {sortedArray.map((bug) => {
        return (
          <BugCard
            bugData={{
              id: bug.id,
              name: bug.name,
              note: bug.note,
              severity: bug.severity,
              status: bug.status,
            }}
            bugState={{ value: selectedBug, setter: setSelectedBug }}
            fetchIncrementState={bugsProp.fetchIncrement}
            isLogged={bugsProp.isLogged}
            key={bug.id}
          />
        )
      })}
    </div>
  )
}
