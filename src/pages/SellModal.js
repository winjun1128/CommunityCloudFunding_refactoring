import { useState, useEffect } from 'react';
import { Row, Col, Button, Form } from "react-bootstrap";
import './SellModal.css';
import { useProducts } from '../data/ProductContext';
import AlertModal from './AlertModal';

function SellModal({ show, onClose }) {
    

    const[showAlertModal,setShowAlertModal] = useState(false);

    const { products, setProducts } = useProducts();
    const [sellImgLink, setSellImgLink] = useState('');
    const [sellCompanyName, setSellCompanyName] = useState('');
    const [sellName, setSellName] = useState('');
    const [sellCategory, setSellCategory] = useState('food');
    const [sellPrice, setSellPrice] = useState(0);
    const [sellRecruitMoney, setSellRecruitMoney] = useState(0);
    const [sellStartDate, setSellStartDate] = useState('');
    const [sellEndDate, setSellEndDate] = useState('');
    const [sellCarouselLink, setSellCarouselLink] = useState(['', '', '']);
    const [sellIntro, setSellIntro] = useState('');
    const [sellPictureLink, setSellPictureLink] = useState('');
    const [sellVideoLink, setSellVideoLink] = useState('');

    const today = new Date();

    const endDate = new Date(sellEndDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    useEffect(() => {
        document.body.style.overflow = show ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show]);

    if (!show) return null;

    const updateCarousel = (index, value) => {
        const updated = [...sellCarouselLink];
        updated[index] = value;
        setSellCarouselLink(updated);
    };

    const handleRegister = () => {
        const temp = {
            no: products.length + 1,
            imglink: sellImgLink,
            companyname: sellCompanyName,
            name: sellName,
            category: sellCategory,
            price: Number(sellPrice),
            gainmoney: 0,
            recruitmoney: Number(sellRecruitMoney),
            startdate: sellStartDate,
            enddate: sellEndDate,
            carousellink: sellCarouselLink,
            intro: sellIntro,
            picturelink: sellPictureLink,
            videolink: sellVideoLink,
            percent: 0,
            count: 0,
            heart: [''],
            consumer: [''],
            seller: localStorage.getItem('id'),
            state: diffDays <= 0 ? '마감' : '진행중'
        };
        setProducts([...products, temp]);
        setShowAlertModal(true);
    };

    return (
        <div className="sellmodal-backdrop" onClick={onClose}>
            <div className="sellmodal-content" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-center mb-4">상품 등록</h3>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>제품명</Form.Label>
                        <Form.Control type="text" onChange={(e) => setSellName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>회사명</Form.Label>
                        <Form.Control type="text" onChange={(e) => setSellCompanyName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>대표 이미지 링크</Form.Label>
                        <Form.Control type="text" onChange={(e) => setSellImgLink(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>카테고리</Form.Label>
                        <Form.Select value={sellCategory} onChange={(e) => setSellCategory(e.target.value)}>
                            <option value="living">리빙</option>
                            <option value="food">푸드</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>가격</Form.Label>
                        <Form.Control type="number" onChange={(e) => setSellPrice(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>모집 금액</Form.Label>
                        <Form.Control type="number" onChange={(e) => setSellRecruitMoney(e.target.value)} />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Label>모집 시작일</Form.Label>
                                <Form.Control type="date" onChange={(e) => setSellStartDate(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>모집 마감일</Form.Label>
                                <Form.Control type="date" onChange={(e) => setSellEndDate(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>

                    {[0, 1, 2].map((i) => (
                        <Form.Group className="mb-3" key={i}>
                            <Form.Label>캐러셀 이미지 링크 {i + 1}</Form.Label>
                            <Form.Control type="text" onChange={(e) => updateCarousel(i, e.target.value)} />
                        </Form.Group>
                    ))}

                    <Form.Group className="mb-3">
                        <Form.Label>상품 소개</Form.Label>
                        <Form.Control as="textarea" rows={2} onChange={(e) => setSellIntro(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>상세 이미지 링크</Form.Label>
                        <Form.Control type="text" onChange={(e) => setSellPictureLink(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>영상 링크</Form.Label>
                        <Form.Control type="text" onChange={(e) => setSellVideoLink(e.target.value)} />
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="primary" onClick={handleRegister}>등록하기</Button>
                        <Button variant="secondary" onClick={onClose}>취소</Button>
                    </div>
                </Form>
            </div>
            <AlertModal show={showAlertModal} handleClose={()=>setShowAlertModal(false)} content="등록 완료" opt={2}></AlertModal>
        </div>
    );
}

export default SellModal;
