import { Card, ProgressBar, Badge } from 'react-bootstrap';
import {Link} from 'react-router-dom';

function ProjectCard({item,setUpdateIndex,index}) {
    return (
        <Card className="h-100 shadow-sm" onClick={() => setUpdateIndex(index)}>
            <Link to={`/item/${item.no}`}><Card.Img variant="top" src={item.imglink} /></Link>
            <Card.Body>
                <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}><Card.Title>{item.name}</Card.Title></Link>
                {item.name === '텀블러 프로젝트' &&
                    <Badge bg="danger" >Hot</Badge>
                }
                <Card.Text style={{ textAlign: 'left' }}>{item.companyname}</Card.Text>
                <ProgressBar now={item.percent} label={`${item.percent}%`} />
            </Card.Body>
        </Card>
    );
}

export default ProjectCard;