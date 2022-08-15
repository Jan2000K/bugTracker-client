import "./loginPage.css"
import userIcon from "../../assets/user.svg"
import { useState } from "react"
import axios from "axios"
import { baseURL } from "../../hooks/dataFetching"

export default function LoginPage(loginState: reactStateProp<boolean>) {
  const setLogin = loginState.setter
  const [errorMsg, setErrorMsg] = useState("")
  async function handleSubmit() {
    const username = document.querySelector(".userInput") as HTMLInputElement
    const password = document.querySelector(
      ".passwordInput"
    ) as HTMLInputElement
    if (username.value.length < 1) {
      setErrorMsg("Please enter your username")
      return
    } else if (password.value.length < 1) {
      setErrorMsg("Please enter your password")
      return
    } else {
      axios
        .post(
          `${baseURL}/user/login`,
          {
            username: username.value,
            password: password.value,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.err === true) {
            setErrorMsg(res.data.message)
          } else {
            setLogin(true)
          }
        })
        .catch(() => {
          setErrorMsg("Error logging in")
        })
    }
  }
  return (
    <div className="formContainer">
      <img src={userIcon} alt="userIcon" />
      {errorMsg === "" ? null : <p className="errorMsg">{errorMsg}</p>}
      <input
        type="text"
        placeholder="Enter Username"
        name="username"
        className="userInput"
        required
      />
      <input
        type="password"
        placeholder="Enter Password"
        name="password"
        className="passwordInput"
        required
      />
      <button type="submit" onClick={handleSubmit}>
        LOGIN
      </button>
    </div>
  )
}
