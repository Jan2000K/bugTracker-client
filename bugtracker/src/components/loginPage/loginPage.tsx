import "./loginPage.css"
import userIcon from "../../assets/user.svg"
export default function LoginPage(){
    return(
            <div className="formContainer">
                <img src={userIcon} />   
                <input type="text" placeholder="Enter Username" name="username" className="userInput" required />  
                <input type="password" placeholder="Enter Password" name="password" className="passwordInput" required / >  
                <button type="submit">LOGIN</button>   
            </div>   
    )


}