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

    useEffect(() => {
        const fetchEntry = async () => {
            const token = localStorage.getItem("userToken");
            API.defaults.headers.common["Authorization"] = `Token ${token}`;
            
            try {
                const response = await API.get(`dictionary/personal/${entryNumber}/`);
                setEntryData({
                    personal_description: response.data.personal_description.join(', '),
                    personal_key_words: response.data.personal_key_words.join(', '),
                    personal_related_entries_display: response.data.personal_related_entries_display.join(', ')
                });
            } catch (error) {
                console.error('Error fetching entry:', error);
            }
        };

        fetchEntry();
    }, [entryNumber]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEntryData({ ...entryData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formattedData = {
            number: entryNumber, // Assuming entryNumber is passed as a prop
            personal_description: entryData.personal_description.split(',').map(desc => desc.trim()).filter(desc => desc),
            personal_key_words: entryData.personal_key_words.split(',').map(kw => kw.trim()).filter(kw => kw),
            personal_related_entries: entryData.personal_related_entries.split(',').map(re => parseInt(re.trim())).filter(re => !isNaN(re))
        };
    
        try {
            const token = localStorage.getItem("userToken");
            API.defaults.headers.common["Authorization"] = `Token ${token}`;
    
            const response = await API.put(`dictionary/personal/${entryNumber}/`, formattedData);
            console.log("Entry updated:", response.data);
            onUpdate(); // Callback to refresh the list or handle post-update actions
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
                    value={entryData.personal_key_words}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Related Entries</Form.Label>
                <Form.Control
                    type="text"
                    name="personal_related_entries"
                    value={entryData.personal_related_entries}
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
