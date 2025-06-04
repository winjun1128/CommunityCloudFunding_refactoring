import { Row, Col } from 'react-bootstrap';
import ProjectCard from "./ProjectCard";
import tumbler from '../images/tumbler.jpg';
import standingDesk from '../images/standingDesk.jpg';
import earPhone from '../images/earPhone.jpg';
import { useProducts } from '../data/ProductContext';
import {useState} from 'react';

const projects = [
    { title: '텀블러 프로젝트', description: '친환경 텀블러 제작', progress: 70, img: tumbler },
    { title: '스탠딩 데스크', description: '건강을 위한 책상', progress: 40, img: standingDesk },
    { title: '펀딩 이어폰', description: '노이즈 캔슬링 지원', progress: 90, img: earPhone },
];

function Spon() {
    const [updateIndex, setUpdateIndex] = useState(0);
    const { products, setProducts } = useProducts(); //이제 products 배열 사용 가능
    const consumerproducts = products.filter(item => item.consumer.includes(localStorage.getItem('id')));
    return (
        <>
            <h3 className="mb-4">후원한 프로젝트</h3>
            <Row xs={1} md={2} lg={3} className="g-4">
                {consumerproducts.map((item,index) => (
                    <Col><ProjectCard item={item} setUpdateIndex={setUpdateIndex} index={index} /></Col>
                ))}
            </Row>
        </>
    );
}

export default Spon;