import { Card, ProgressBar, Badge } from 'react-bootstrap';

function ProjectCard({item}) {
    return (
        <Card className="h-100 shadow-sm">
            <Card.Img variant="top" src={item.imglink} />
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                {item.name === '텀블러 프로젝트' &&
                    <Badge bg="danger" >Hot</Badge>
                }
                <Card.Text>{item.companyname}</Card.Text>
                <ProgressBar now={item.percent} label={`${item.percent}%`} />
            </Card.Body>
        </Card>
    );
}

export default ProjectCard;