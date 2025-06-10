import { Card, ProgressBar, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProjectCard({ item, setUpdateIndex, index, isSelected = false, onSelect = () => {} }) {
    return (
        <Card
            className={`h-100 shadow-sm ${isSelected ? 'selected-card' : ''}`}
            onClick={() => {
                if (setUpdateIndex) setUpdateIndex(index);
                onSelect();
            }}
        >
            <Link to={`/item/${item.no}`}>
                <Card.Img variant="top" src={item.imglink} />
            </Link>
            <Card.Body>
                <Card.Title
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onSelect();
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    {item.name}
                </Card.Title>
                {item.name === '텀블러 프로젝트' && (
                    <Badge bg="danger">Hot</Badge>
                )}
                <Card.Text style={{ textAlign: 'left' }}>{item.companyname}</Card.Text>
                <ProgressBar now={item.percent} label={`${item.percent}%`} />
            </Card.Body>
        </Card>
    );
}

export default ProjectCard;