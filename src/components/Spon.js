import { Row, Col } from 'react-bootstrap';
import ProjectCard from "./ProjectCard";
import tumbler from '../images/tumbler.jpg';
import standingDesk from '../images/standingDesk.jpg';
import earPhone from '../images/earPhone.jpg';

const projects = [
    { title: '텀블러 프로젝트', description: '친환경 텀블러 제작', progress: 70, img: tumbler },
    { title: '스탠딩 데스크', description: '건강을 위한 책상', progress: 40, img: standingDesk },
    { title: '펀딩 이어폰', description: '노이즈 캔슬링 지원', progress: 90, img: earPhone },
];

function Spon() {
    return (
        <>
            <h3 className="mb-4">후원한 프로젝트</h3>
            <Row xs={1} md={2} lg={3} className="g-4">
                {projects.map((project, index) => (
                    <Col key={index}><ProjectCard project={project} /></Col>
                ))}
            </Row>
        </>
    );
}

export default Spon;