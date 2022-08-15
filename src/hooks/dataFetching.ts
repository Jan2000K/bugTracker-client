import axios from "axios"

export const baseURL = "https://bt.janezsite.com/api"

export async function fetchAllProjects() {
  return await axios.get(`${baseURL}/project/all`, { withCredentials: true })
}

export async function postNewProject(proj: {
  id: number
  name: string
  bugs: []
}) {
  return  await axios.post(`${baseURL}/project`, proj, {
    withCredentials: true,
  })
}

export async function deleteProject(projectID: number) {
  return await axios.delete(`${baseURL}/project?ids=${projectID}`, {
    withCredentials: true,
  })
}

export async function updateProject(project: {
  projectID: number
  name: string
}) {
  return await axios.patch(`${baseURL}/project/updateName`, project, {
    withCredentials: true,
  })
}
export async function checkLogin() {
  return await axios.get(`${baseURL}/user/isLogged`, { withCredentials: true })
}

export async function patchBug(newBugData: {
  id: number
  name: string
  status: bugStatus
  severity: bugSeverity
  note: string | null
}) {
  return await axios.patch(`${baseURL}/bug`, newBugData, {
    withCredentials: true,
  })
}

export async function deleteBug(bugID: number) {
  return await axios.delete(`${baseURL}/bug?ids=${bugID}`, {
    withCredentials: true,
  })
}
