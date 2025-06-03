import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function DeliveryModal({ show, closeModal, title, list, defaultValue }) {
    const [selectedItem, setSelectedItem] = useState(defaultValue || list[0]);

    const handleSave = () => {
        console.log(`${title} 선택됨:`, selectedItem);
        closeModal();
    };

    return (
        <Modal show={show} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {list.map((item, index) => (
                        <Form.Check
                            key={index}
                            type="radio"
                            label={item}
                            name="selectGroup"
                            value={item}
                            checked={selectedItem === item}
                            onChange={(e) => setSelectedItem(e.target.value)}
                            className="mb-2"
                        />
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>취소</Button>
                <Button variant="primary" onClick={handleSave}>저장</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeliveryModal;