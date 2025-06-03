import {Button} from 'react-bootstrap';
import { useProducts } from '../data/ProductContext';
import EditModal from '../pages/EditModal';
import {useState} from 'react';
import {Row,Col} from 'react-bootstrap';
import ProjectCard from './ProjectCard';
function MyProject() {
    const { products, setProducts } = useProducts(); //이제 products 배열 사용 가능
    const sellproducts = products.filter(item => item.seller === localStorage.getItem('id'));
    const [showEditModal, setShowEditModal] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(0);
    return (
        <div>
            <h1>내 프로젝트 페이지</h1>
            {/* 판매자 상품 수정 및 삭제하기 */}
            <Row xs={1} md={2} lg={3} className="g-4">
                {sellproducts.map((item) => (
                    <Col><ProjectCard item={item} /></Col>
                ))}
            </Row>
                    <Button onClick={() => setShowEditModal(true)}>수정</Button>
                    <Button onClick={() => {
                        // const delpost = posts.filter(item=>item.no!==post.no);
                        const delproduct = products.filter(item => item.no !== sellproducts[updateIndex].no);
                        setProducts(delproduct);
                    }}>삭제</Button>
                    <EditModal show={showEditModal} onClose={() => setShowEditModal(false)} product={sellproducts[updateIndex]}></EditModal>
        </div>
    );
}

export default MyProject;