import closeIcon from "../../../assets/closeIcon.svg"
import "./editModal.css"
import { useState } from "react";
import {deleteProject,updateProject} from "../../../hooks/dataFetching"
export default function EditProjectModal(props:{projectObj:{id:number,name:string,bugs:bug[]},modalVisible:reactStateProp<boolean>,isLogged:reactStateProp<boolean>,fetchIncrement:reactStateProp<number>}){

    const [name, setName] = useState(props.projectObj.name);
    const [error, setError] = useState("");
    function closeModal(){
        props.modalVisible.setter(false)

    }
    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
        if (e.target.value.trim().length < 1 && error === "") {
          setError("Name cannot be empty!");
        } else if (error !== "") {
          setError("");
        }
      }
    
      async function closeAndDelete(){
        await deleteProject(props.projectObj.id)
        .then(
          (res)=>{
            if(res.data.err){
              setError(res.data.message)
            }
            else{
              props.modalVisible.setter(false)
              props.fetchIncrement.setter(0)
            }
          }
        )
        .catch(
          (err)=>{
            if(err.response.status===401){
               props.isLogged.setter(false)
            }
            else{
              setError("Error deleting project")
            }
          }
        )
      }
      async function closeAndUpdate(){
        await updateProject({name:name,projectID:props.projectObj.id})
        .then(
          (res)=>{
            console.log(res)
            if(res.data.err){
              setError(res.data.message)
            }
            else{
              props.modalVisible.setter(false)
              props.fetchIncrement.setter(0)
            }
          }
        )
        .catch(
          (err)=>{
            if(err.response.status===401){
              props.isLogged.setter(false)
            }
            else{
              setError("Error deleting project")
            }
          }
        )
      }
          
      
  return (
    <div className="modal editModal">
      <div className="modalProjectContent">
        <div className="editProjectContainer">
          <h2>Edit Project</h2>
          <img src={closeIcon} onClick={closeModal} />
          <div className="inputContainer">
            {error === "" ? null : <p className="errorMsg">{error}</p>}
            <br/>
            <label>Project Name</label><input type={"text"} value={name} onChange={handleNameChange} />
            <div className="buttonContainer">
              <button onClick={closeAndDelete} className="deleteButton">Delete</button>
              <button onClick={closeAndUpdate} className="updateButton">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
