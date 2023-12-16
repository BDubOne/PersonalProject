
import { API } from "./API";

export const handleAddOrUpdateEntry = async (number, selectedItems, userToken)=> {
    // Endpoint for checking if the entry exists
    const checkEndpoint = `dictionary/personal/${number}/`;
    // Endpoint for updating an entry
    const updateEndpoint = `dictionary/personal/${number}/`;
    // Endpoint for adding a new entry
    const addEndpoint = 'dictionary/personal/';

    try {
        API.defaults.headers.common["Authorization"] = `Token ${userToken}`;

        // Check if the entry exists
        const checkResponse = await API.get(checkEndpoint);

        if (checkResponse.status === 200) {
            // Entry exists, update it
            const updateData = {
                number: number,
                personal_description: selectedItems.descriptions,
                personal_key_words: selectedItems.keyWords
                // Include any other fields as needed
            };
            await API.put(updateEndpoint, updateData);
            console.log('Entry updated successfully');
        } else {
            // Entry does not exist, add a new entry
            const addData = {
                number: number,
                personal_description: selectedItems.descriptions,
                personal_key_words: selectedItems.keyWords
                // Include any other fields as needed
            };
            await API.post(addEndpoint, addData);
            console.log('New entry added successfully');
        }
    } catch (error) {
        console.error('Error in add/update entry:', error);
    }
}

