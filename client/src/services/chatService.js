import API from "../utils/api"

export const askAI = async(message)=>{

    const res = await API.post("/api/chat",{
        message
    })

    return res.data
}