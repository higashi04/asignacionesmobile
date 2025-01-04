import axios from "axios";

// axios.defaults.baseURL = "";

export const ReadAll = async() => {
    try {
        const response = await axios.get("https://pdf-backend-enuboh4vf-higashi04s-projects.vercel.app/acomodadores/get");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const CreateAcomodador = async(name) => {
    try {
        const response = await axios.post("https://pdf-backend-enuboh4vf-higashi04s-projects.vercel.app/acomodadores/create", {name});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const UpdateAcomodador = async(id, name) => {
    try {
        const data = {
            id,
            name
        }
        const response = await axios.put(`https://pdf-backend-enuboh4vf-higashi04s-projects.vercel.app/acomodadores/update`, {data: data});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const DeleteAcomodador = async(id) => {
    try {
        const response = await axios.delete(`https://pdf-backend-enuboh4vf-higashi04s-projects.vercel.app/acomodadores/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}