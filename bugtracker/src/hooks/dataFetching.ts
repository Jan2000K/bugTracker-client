import axios from "axios";

export async function fetchAllProjects(){
    return await axios.get("http://localhost:5000/project/all",{withCredentials:true})
}

export async function checkLogin(){
    return await axios.get("http://localhost:5000/user/isLogged",{withCredentials:true})
}