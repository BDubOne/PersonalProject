import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom'
import { API } from '../utilities/API';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UpdateEntryForm({ entryNumber, onUpdate }) {
    const [entryData, setEntryData] = useState({
        personal_description: [],
        personal_key_words: [],
        personal_related_entries: []
    });
    const {user} = useOutletContext()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "personal_related_entries") {
            const rEArrayValue = value.split(',').map(item => item.trim());
            setEntryData({ ...entryData, [name]: rEArrayValue });
        } else if(name ==="personal_key_words") {
            const kWArrayValue = value.split(',').map(item => item.trim());
            setEntryData({ ...entryData, [name]: kWArrayValue });
        } else {
            setEntryData({ ...entryData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const personalDescription = entryData.personal_description.length > 0 ? entryData.personal_description : [];
        const personalKeyWords = entryData.personal_key_words.length > 0 ? entryData.personal_key_words : [];    
        const personalRelatedEntries = entryData.personal_related_entries.length > 0 
        ? entryData.personal_related_entries.map(Number) 
        : [];

        const formattedData = {
            number: entryNumber,
            personal_description: personalDescription,
            personal_key_words: personalKeyWords,
            personal_related_entries: personalRelatedEntries
        };
    
        try {
            const token = localStorage.getItem("userToken");
            API.defaults.headers.common["Authorization"] = `Token ${token}`;
    
            const response = await API.put(`dictionary/personal/${entryNumber}/`, formattedData);
            console.log("Entry updated:", response.data);
            onUpdate(); 
            window.location.reload()
        } catch (error) {
            console.error('Error updating entry:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="personal_description"
                    value={entryData.personal_description}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Key Words</Form.Label>
                <Form.Control
                    type="text"
                    name="personal_key_words"
                    value={entryData.personal_key_words.join(', ')}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Related Entries</Form.Label>
                <Form.Control
                    type="text"
                    name="personal_related_entries"
                    value={entryData.personal_related_entries.join(', ')}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Update Entry
            </Button>
        </Form>
    );
}

export default UpdateEntryForm;
