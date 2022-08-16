import "./editBug.css"

import closeIcon from "../../../../assets/closeIcon.svg"
import React, { ChangeEvent, useState } from "react"
import { deleteBug, patchBug } from "../../../../hooks/dataFetching"
export default function EditBug(editBugProp: editBugProp) {
  function closeModal() {
    editBugProp.modalState.setter(false)
  }

  async function closeAndUpdate() {
    patchBug({
      id: editBugProp.bugData.id,
      name: name,
      status: status,
      severity: severity,
      note: note,
    })
      .then((res) => {
        if (res.data.err) {
          setError(res.data.message)
        } else {
          editBugProp.modalState.setter(false)
          //set the increment State to 0 indicating that a refresh of data must be made
          editBugProp.fetchIncrement.setter(0)
        }
      })
      .catch((err) => {
        //if the response status code is 401 it means that there is no authorization
        if (err.response.status === 401) {
          editBugProp.isLogged.setter(false)
        } else {
          setError("Error updating data")
        }
      })
  }

  async function closeAndDelete() {
    deleteBug(editBugProp.bugData.id)
      .then((res) => {
        if (res.data.err) {
          setError(res.data.message)
        } else {
          editBugProp.modalState.setter(false)
          //set the increment State to 0 indicating that a refresh of data must be made
          editBugProp.fetchIncrement.setter(0)
        }
      })
      .catch((err) => {
        //if the response status code is 401 it means that there is no authorization
        if (err.response.status === 401) {
          editBugProp.isLogged.setter(false)
        } else {
          setError("Error Deleting bug")
        }
      })
  }

  const [severity, setSeverity] = useState(editBugProp.bugData.severity)

  const [status, setStatus] = useState(editBugProp.bugData.status)

  const [name, setName] = useState(editBugProp.bugData.name)

  const [note, setNote] = useState(editBugProp.bugData.note)

  const [error, setError] = useState("")

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
    if (e.target.value.trim().length < 1 && error === "") {
      setError("Name cannot be empty!")
    } else if (error !== "") {
      setError("")
    }
  }

  function handleStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    setStatus(e.target.value as bugStatus)
  }

  function handleSeverityChange(e: ChangeEvent<HTMLSelectElement>) {
    setSeverity(e.target.value as bugSeverity)
  }

  function handleNoteChange(e: ChangeEvent<HTMLInputElement>) {
    setNote(e.target.value)
  }

  return (
    <div className="modal editModal">
      <div className="modalContent">
        <div className="editBugContainer">
          <h2>Edit Bug</h2>
          <img src={closeIcon} alt="closeIcon" onClick={closeModal} />
          <div className="inputContainer">
            {error === "" ? null : <p className="errorMsg">{error}</p>}
            <label>Bug Name</label>
            <input type={"text"} value={name} onChange={handleNameChange} />
            <br />
            <label>Bug Status</label>
            <select value={status} onChange={handleStatusChange}>
              <option>Open</option>
              <option>Testing</option>
              <option>Closed</option>
            </select>
            <br />
            <label>Bug Severity</label>
            <select value={severity} onChange={handleSeverityChange}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <br />
            <label>Note</label>
            <input type={"text"} value={note} onChange={handleNoteChange} />
            <br />
            <div className="buttonContainer">
              <button onClick={closeAndDelete} className="deleteButton">
                Delete
              </button>
              <button onClick={closeAndUpdate} className="updateButton">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
