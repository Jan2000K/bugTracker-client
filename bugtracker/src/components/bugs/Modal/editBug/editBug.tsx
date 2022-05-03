import "./editBug.css";

import closeIcon from "../../../../assets/closeIcon.svg";
import React, { ChangeEvent, useEffect, useState } from "react";
export default function EditBug(editBugProp:editBugProp) {
  
  function closeModal(){
    editBugProp.modalState.setter(false)
  }

  function closeAndSave(){
    //apicall

    editBugProp.modalState.setter(false)
  }
  
  const [severity, setSeverity] = useState(editBugProp.bugData.severity);

  const [status, setStatus] = useState(editBugProp.bugData.status);

  const [name, setName] = useState(editBugProp.bugData.name);

  const [note, setNote] = useState(editBugProp.bugData.note);

  const [nameError, setNameError] = useState("");



  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    if (e.target.value.trim().length < 1 && nameError === "") {
      setNameError("Name cannot be empty!");
    } else if (nameError !== "") {
      setNameError("");
    }
  }

  function handleSatusChange(e: ChangeEvent<HTMLSelectElement>) {
    setStatus(e.target.value as bugStatus);
  }

  function handleSeverityChange(e: ChangeEvent<HTMLSelectElement>) {
    setSeverity(e.target.value as bugSeverity);
  }

  function handleNoteChange(e: ChangeEvent<HTMLInputElement>) {
    setNote(e.target.value);
  }

  return (
    <div className="modal editModal">
      <div className="modalContent">
        <div className="editBugContainer">
          <h2>Edit Bug</h2>
          <img src={closeIcon} onClick={closeModal} />
          <div className="inputContainer">
            {nameError === "" ? null : <p className="errorMsg">{nameError}</p>}
            <label>Bug Name</label><input type={"text"} value={name} onChange={handleNameChange} />
            <br />
            <label>Bug Status</label>
            <select value={status} onChange={handleSatusChange}>
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
            <label>Note</label><input type={"text"} value={note} onChange={handleNoteChange} />
            <br />
            <button onClick={closeAndSave}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
  
}
