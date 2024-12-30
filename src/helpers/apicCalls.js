import axios from "axios";

// axios.defaults.baseURL = "";

export const ReadAll = async() => {
    try {
        const response = await axios.get("https://pdf-backend-enuboh4vf-higashi04s-projects.vercel.app/acomodadores/get");
        return response.data;
    } catch (error) {
        console.log(error)
    }
}