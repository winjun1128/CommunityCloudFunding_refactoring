import { Card, ProgressBar, Badge } from 'react-bootstrap';

function ProjectCard(props) {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={props.project.img} />
            <Card.Body>
                <Card.Title>{props.project.title}</Card.Title>
                {props.project.title === '텀블러 프로젝트' &&
                    <Badge bg="danger" >Hot</Badge>
                }
                <Card.Text>{props.project.description}</Card.Text>
                <ProgressBar now={props.project.progress} label={`${props.project.progress}%`} />
            </Card.Body>
        </Card>
    );
}

export default ProjectCard;