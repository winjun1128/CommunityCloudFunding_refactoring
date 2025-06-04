import { Button } from 'react-bootstrap';
import { useProducts } from '../data/ProductContext';
import EditModal from '../pages/EditModal';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProjectCard from './ProjectCard';
import './MyProject.css';

function MyProject() {
    const { products, setProducts } = useProducts();
    const sellproducts = products.filter(item => item.seller === localStorage.getItem('id'));
    const [showEditModal, setShowEditModal] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(0);

    return (
        <div className="myproject-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>{localStorage.getItem('id')}님의 프로젝트</h2>
                {sellproducts.length > 0 && (
                    <div>
                        <Button variant="primary" style={{ marginRight: '10px' }} onClick={() => setShowEditModal(true)}>수정</Button>
                        <Button variant="danger" onClick={() => {
                            const delproduct = products.filter(item => item.no !== sellproducts[updateIndex].no);
                            setProducts(delproduct);
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
                            <ProjectCard item={item} setUpdateIndex={setUpdateIndex} index={index} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default MyProject;