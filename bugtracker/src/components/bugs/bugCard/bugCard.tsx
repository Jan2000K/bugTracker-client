import { useState } from "react"
import EditBug from "../Modal/editBug/editBug"
import "./bugCard.css"

export default function BugCard(props: {
  bugData: bug
  bugState: reactStateProp<bug>
  fetchIncrementState: reactStateProp<number>
  isLogged: reactStateProp<boolean>
}) {
  function openEditModal() {
    setModalOpen(true)
  }

  const [modalOpened, setModalOpen] = useState(false)
  return (
    <div className="columnNames bugContainer">
      <ul>
        <li className="bugTitle" onClick={openEditModal}>
          {props.bugData.name}
        </li>
        <li>{props.bugData.status}</li>
        <li>{props.bugData.severity}</li>
        <li>{props.bugData.note}</li>
      </ul>
      {modalOpened ? (
        <EditBug
          bugData={{ ...props.bugData }}
          fetchIncrement={props.fetchIncrementState}
          modalState={{ setter: setModalOpen, value: modalOpened }}
          isLogged={props.isLogged}
        />
      ) : null}
    </div>
  )
}
