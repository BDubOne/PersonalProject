import React, { useState } from 'react';
import { API } from '../utilities/API'; 

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function TranslateComponent() {
    const [text, setText] = useState('');
    const [originLang, setOriginLang] = useState('en'); // default to English
    const [destLang, setDestLang] = useState('es'); // default to Spanish
    const [translation, setTranslation] = useState('');


    const languages = {
        "en": "English",
        "es": "Spanish",
        "he": "Hebrew",
        "la": "Latin",
        "el": "Greek",
        "sa": "Sanskrit"
      
    };

    const handleTranslate = async () => {
        try {
            const response = await API.post('/translate/', {
                text: text,
                target_language: destLang
            });
            if (response.data) {
                setTranslation(response.data.translated_text);
            }
        } catch (error) {
            console.error('Error during translation:', error);
        }
    };

    return (
        <Container className="mt-5"> {/* Add top margin */}
        <Row className="justify-content-center"> {/* Center content horizontally */}
            <Col md={6}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Text to Translate</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            value={text} 
                            onChange={e => setText(e.target.value)}
                            rows={3}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Target Language</Form.Label>
                        <Form.Select value={destLang} onChange={e => setDestLang(e.target.value)}>
                            {Object.entries(languages).map(([code, name]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <div className="text-center">
                        <Button onClick={handleTranslate} variant="primary">Translate</Button>
                    </div>
                </Form>

                {translation && (
                    <div className="mt-4 text-center">
                        <strong>Translation:</strong> {translation}
                    </div>
                )}
            </Col>
        </Row>
    </Container>
    );
}

export default TranslateComponent;
