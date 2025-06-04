import { useProducts } from "../data/ProductContext";
import { Row, Col } from 'react-bootstrap'
import ProjectCard from "./ProjectCard";
import { useState } from 'react';
import './Wishlist.css';

function Wishlist() {
    const [updateIndex, setUpdateIndex] = useState(0);
    const { products, setProducts } = useProducts();
    const heartproducts = products.filter(item => item.heart.includes(localStorage.getItem('id')));

    return (
        <div className="wishlist-container">
            <h2 className='mb-4'>{localStorage.getItem('id')}님의 위시리스트</h2>

            {heartproducts.length === 0 ? (
                <div style={{
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#777"
                }}>
                    <p style={{ fontSize: "18px", marginBottom: "10px" }}>위시리스트에 등록된 상품이 없습니다.</p>
                    <p style={{ fontSize: "14px" }}>관심 상품을 등록하고 편하게 확인해보세요.</p>
                </div>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {heartproducts.map((item, index) => (
                        <Col key={index}>
                            <ProjectCard item={item} setUpdateIndex={setUpdateIndex} index={index} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default Wishlist;
