import { Button } from 'react-bootstrap';
import { useProducts } from '../data/ProductContext';
import EditModal from '../pages/EditModal';
import { useState,useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProjectCard from './ProjectCard';
import './MyProject.css';
import CheckDeleteAlertModal from '../pages/CheckDeleteAlertModal';
import AlertModal from '../pages/AlertModal';

function MyProject() {
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [goDelproduct, setGoDelProduct] = useState([]);
    const [showCheckDeleteAlertModal, setShowCheckDeleteAlertModal] = useState(false);

    const { products, setProducts } = useProducts();
    const sellproducts = products.filter(item => item.seller === localStorage.getItem('id'));

    const [showEditModal, setShowEditModal] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(0);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null); // ✅ 추가

    const handleDelete = () => {
        setProducts(goDelproduct);
        setShowAlertModal(true);  // ✅ 알림 띄움
    };

    useEffect(() => {
        if (selectedCardIndex !== null) {
            setUpdateIndex(selectedCardIndex);
        }
    }, [selectedCardIndex]);



    return (
        <div className="myproject-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>{localStorage.getItem('id')}님의 프로젝트</h2>
                {sellproducts.length > 0 && (
                    <div>
                        <Button variant="primary" style={{ marginRight: '10px' }} onClick={() => setShowEditModal(true)}>수정</Button>
                        <Button variant="danger" onClick={() => {
                            const delproduct = products.filter(item => item.no !== sellproducts[updateIndex].no);
                            setGoDelProduct(delproduct);
                            setShowCheckDeleteAlertModal(true);
                            //setProducts(delproduct);
                        }}>삭제</Button>
                    </div>
                )}
            </div>

            <EditModal show={showEditModal} onClose={() => setShowEditModal(false)} product={sellproducts[updateIndex]} />

            {sellproducts.length === 0 ? (
                <div style={{
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#777"
                }}>
                    <p style={{ fontSize: "18px", marginBottom: "10px" }}>등록된 프로젝트가 없습니다.</p>
                    <p style={{ fontSize: "14px" }}>프로젝트를 등록해보세요.</p>
                </div>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {sellproducts.map((item, index) => (
                        <Col key={index}>
                            <ProjectCard
                                item={item}
                                setUpdateIndex={setUpdateIndex}
                                index={index}
                                isSelected={selectedCardIndex === index}
                                onSelect={() => setSelectedCardIndex(index)}
                            />
                        </Col>
                    ))}
                </Row>
            )}
            <AlertModal show={showAlertModal} handleClose={() => setShowAlertModal(false)} content="삭제 완료" opt={2}></AlertModal>
            <CheckDeleteAlertModal show={showCheckDeleteAlertModal} handleClose={() => setShowCheckDeleteAlertModal(false)} content="삭제 하시겠습니까?" opt={1} onDeleteProduct={handleDelete} onDeletePost={null} ></CheckDeleteAlertModal>
        </div>
    );
}

export default MyProject;