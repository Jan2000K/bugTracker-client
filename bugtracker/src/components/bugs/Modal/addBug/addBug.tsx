import "./addBug.css";

import closeIcon from "../../../../assets/closeIcon.svg";
import { useState } from "react";
import axios from "axios";
export default function AddBug(props:{incrementState:reactStateProp<number>,activeProjectState:reactStateProp<project|null>}) {
  function closeModal() {
    
    const modalElement = document.querySelector(".addModal") as HTMLElement;
    modalElement.style.display = "none";
    resetFields()
  }
  const [nameError, setNameError] = useState("");

  function resetFields(){
    const inputElements = document.querySelectorAll(".addInput") as NodeListOf<HTMLInputElement>

    for(let i=0;i<inputElements.length;i++){
        inputElements[i].value=""
    }
    const selectElement = document.querySelector(".addSelect") as HTMLSelectElement

    selectElement.value ="Low"

    setNameError("")

  }

  async function saveAndClose() {
    const bugName = document.querySelector(".addBugName") as HTMLInputElement

    if(bugName.value.trim().length<1){
        setNameError("Please enter Bug Name!")
        return false
    }
    const severity  = document.querySelector(".addSelect") as HTMLSelectElement

    const noteInput = document.querySelector(".noteInput") as HTMLInputElement

    
    await axios.post("http://localhost:5000/bug",{
      id:0,
      name:bugName.value,
      status:"Open",
      severity:severity.value,
      note:noteInput.value,
      projectID:props.activeProjectState.value!.id
    },{withCredentials:true})
    .then(
      (res)=>{
        console.log(res)
        if(res.data.err){
          setNameError(res.data.message)
          return
        }
        else{
          resetFields()
          closeModal();
          props.incrementState.setter(0)

        }
      }
    )
    .catch(
      (err)=>{
        setNameError(err)
        return
      }
    )
    //api call

  }
  return (
    <div className="modal addModal">
      <div className="modalContent">
        <div className="addBugContainer">
          <h2>Add Bug</h2>
          <img src={closeIcon} onClick={closeModal} />
          <div className="inputContainer">
            {nameError===""?null:<p className="errorMsg">{nameError}</p>}
            <label>Bug name</label>
            <input type={"text"} className="addInput addBugName"/>
            <br />
            <label>Bug Severity</label>
            <select className="addSelect">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <br />
            <label>Note</label>
            <input type={"text"} className="addInput noteInput"/>
            <br />
            <button onClick={saveAndClose}>+ Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
