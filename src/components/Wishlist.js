import { useProducts } from "../data/ProductContext";
import {Row, Col } from 'react-bootstrap'
import ProjectCard from "./ProjectCard";
import {useState} from 'react';
function Wishlist() {
    const [updateIndex, setUpdateIndex] = useState(0);
    const { products, setProducts } = useProducts();
    const heartproducts = products.filter(item => item.heart.includes(localStorage.getItem('id')));
    return (
        <div>
            <h1>위시리스트</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {heartproducts.map((item,index) => (
                    <Col><ProjectCard item={item} setUpdateIndex={setUpdateIndex} index={index} /></Col>
                ))}
            </Row>
        </div>
    );
}

export default Wishlist;