
import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom'
import { API } from '../utilities/API';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AddEntryForm(props) {
    const [entryData, setEntryData] = useState({
        number: '',
        personal_description: "",
        personal_key_words: "",
        personal_related_entries: ""
    });
    const { user } = useOutletContext()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntryData({ ...entryData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data for the POST request
        const formattedData = {
            ...entryData,
            student_id: user.id,
            personal_description: [entryData.personal_description], // Add the user's id
            personal_key_words: entryData.personal_key_words.split(',').map(kw => kw.trim()),
            personal_related_entries: entryData.personal_related_entries.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num))
        };

        try {
            const token = localStorage.getItem("userToken");
            API.defaults.headers.common["Authorization"] = `Token ${token}`;

            const response = await API.post('dictionary/personal/', formattedData);
            console.log("Entry added:", response.data);
            props.onSuccess();
            setEntryData({ number: '', personal_description: '', personal_key_words: '', personal_related_entries: '' }); // Reset form after submission
        } catch (error) {
            console.error("Error adding entry:", error);
            console.log(formattedData)
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {/* Number input field */}
            <Form.Group className="mb-3">
                <Form.Label>Number</Form.Label>
                <Form.Control
                    type="number"
                    name="number"
                    value={entryData.number}
                    onChange={handleChange}
                    placeholder="Enter number"
                />
            </Form.Group>

            {/* Description textarea field */}
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="personal_description"
                    value={entryData.personal_description}
                    onChange={handleChange}
                    placeholder="Enter description"
                />
            </Form.Group>

            {/* Key Words input field */}
            <Form.Group className="mb-3">
                <Form.Label>Key Words</Form.Label>
                <Form.Control
                    type="text"
                    name="personal_key_words"
                    value={entryData.personal_key_words}
                    onChange={handleChange}
                    placeholder="Enter key words (comma-separated)"
                />
            </Form.Group>

            {/* Related Entries input field */}
            <Form.Group className="mb-3">
                <Form.Label>Related Entries</Form.Label>
                <Form.Control
                    type="text"
                    name="personal_related_entries"
                    value={entryData.personal_related_entries}
                    onChange={handleChange}
                    placeholder="Enter related entry numbers (comma-separated)"
                />
            </Form.Group>

            <Button variant="primary" type="submit">Add Entry</Button>
        </Form>
    );
}

export default AddEntryForm;


