import { Row, Col, Button } from 'react-bootstrap';
import ProjectCard from "./ProjectCard";
import tumbler from '../images/tumbler.jpg';
import standingDesk from '../images/standingDesk.jpg';
import earPhone from '../images/earPhone.jpg';
import { useProducts } from '../data/ProductContext';
import {useState} from 'react';
import {useNavigate } from 'react-router-dom';
import './Spon.css'

const projects = [
    { title: '텀블러 프로젝트', description: '친환경 텀블러 제작', progress: 70, img: tumbler },
    { title: '스탠딩 데스크', description: '건강을 위한 책상', progress: 40, img: standingDesk },
    { title: '펀딩 이어폰', description: '노이즈 캔슬링 지원', progress: 90, img: earPhone },
];

function Spon() {
    const navigate = useNavigate();
    const [updateIndex, setUpdateIndex] = useState(0);
    const { products, setProducts } = useProducts(); //이제 products 배열 사용 가능
    const consumerproducts = products.filter(item => item.consumer.includes(localStorage.getItem('id')));
    return (
        <div className='Spon-container'>
            <h2 className="mb-4">{localStorage.getItem('id')}님이 후원한 프로젝트</h2>
            {consumerproducts.length === 0 ? (
                <div style={{
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#777"
                }}>
                    <p style={{ fontSize: "18px", marginBottom: "10px" }}>후원한 프로젝트가 없습니다.</p>
                    <p style={{ fontSize: "14px" }}><Button onClick={() => navigate('/list')}>후원 하러가기</Button></p>
                </div>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {consumerproducts.map((item, index) => (
                        <Col key={index}>
                            <ProjectCard item={item} setUpdateIndex={setUpdateIndex} index={index} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default Spon;