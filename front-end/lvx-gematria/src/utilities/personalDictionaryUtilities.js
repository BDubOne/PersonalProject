import { API } from './API';

export const AddPersonalEntry = async (entryData) => {
    try {
        const token = localStorage.getItem("userToken");
        API.defaults.headers.common["Authorization"] = `Token ${token}`;

        const response = await API.post('dictionary/personal/', entryData);
        console.log("Entry added:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding entry:", error);
        throw error;
    }
};

export const UpdatePersonalEntry = async (updatedEntryData) => {
    try {
        const token = localStorage.getItem("userToken");
        API.defaults.headers.common["Authorization"] = `Token ${token}`;

        const response = await API.put(`dictionary/personal/${number}/`, updatedEntryData);
        console.log("Entry updated:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating entry:", error);
        throw error;
    }
};

export const DeletePersonalEntry = async (number) => {
    try {
        const token = localStorage.getItem("userToken");
        API.defaults.headers.common["Authorization"] = `Token ${token}`;

        await API.delete(`dictionary/personal/${number}/`);
        console.log("Entry deleted");
    } catch (error) {
        console.error("Error deleting entry:", error);
        throw error;
    }
};
