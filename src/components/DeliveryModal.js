import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import AlertModal from '../pages/AlertModal';

function DeliveryModal({ show, closeModal, title, list, defaultValue }) {
    const [showAlertModal,setShowAlertModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(defaultValue || list[0]);

    const handleSave = () => {
        // console.log(`${title} 선택됨:`, selectedItem);
        // closeModal();
        setShowAlertModal(true);
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

          <AlertModal show={showAlertModal} handleClose={() => {
            setShowAlertModal(false);
            closeModal();
        }} content="저장 되었습니다." opt={2}></AlertModal>

        </Modal>
    );
}

export default DeliveryModal;