import { useState,useEffect } from 'react';
import {Row,Col,Button} from "react-bootstrap";
import './EditModal.css';
import { useProducts } from '../data/ProductContext';
function EditModal({ show, onClose,product}) {
    const {products,setProducts} = useProducts();   //이제 products 배열 사용 가능
    //  { no: 1, imglink: "/basketball1.jpeg", name: '농구공1', companyname: '농구공회사1', startdate: '2025-05-28', enddate: '2025-06-11', percent: 50, price: 10000, recruitmoney: 20000, category: 'food', count: 0, carousellink:['','',''],intro:'',picturelink:'',videolink:'' }

    const[getName,setGetName] = useState('');
    const[getCompanyName,setGetCompanyName] = useState('');
    const[getImgLink,setGetImgLink] = useState('');
    const[getCategory,setGetCategory] = useState('');
    const[getPrice,setGetPrice] = useState(0);
    const[getRecruitMoney,setGetRecruitMoney] = useState(0);
    const[getStartDate,setGetStartDate] = useState('');
    const[getEndDate,setGetEndDate] = useState('');
    const[getCarouselLink,setGetCarouselLink] = useState('');
    const[getIntro,setGetIntro] = useState('');
    const[getPictureLink,setGetPictureLink] = useState('');
    const[getVideoLink,setGetVideoLink] = useState('');


    useEffect(() => {
        if (product) {
            setGetName(product.name);
            setGetCompanyName(product.companyname);
            setGetImgLink(product.imglink);
            setGetCategory(product.category);
            setGetPrice(product.price);
            setGetRecruitMoney(product.recruitmoney);
            setGetStartDate(product.startdate);
            setGetEndDate(product.enddate);
            setGetCarouselLink(product.carousellink);
            setGetIntro(product.intro);
            setGetPictureLink(product.picturelink);
            setGetVideoLink(product.videolink);
        }
    }, [product]);



    //모달 열릴떄 바디 스크롤 막기
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'auto';
        }
        //컴포넌트가 언마운트될떄 원래대로
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show]);

    if (!show) return null;

    return (
        <div className="editmodal-backdrop" onClick={onClose}>
            <div
                className="editmodal-content"
                onClick={(event) => event.stopPropagation()} // 내부 클릭 무시
            >
                <Row>
                    <Col md={6}><h2>제품명</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) => setGetName(event.target.value)} value={getName} /></Col>
                </Row>
                <hr />

                <Row>
                    <Col md={6}><h2>회사명</h2></Col>
                   <Col md={6}><input type="text" onChange={(event) => setGetCompanyName(event.target.value)} value={getCompanyName} /></Col>
                </Row>
                <hr />

                <Row>
                    <Col md={6}><h2>이미지링크</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) => setGetImgLink(event.target.value)} value={getImgLink} /></Col>
                </Row>
                <hr />

                <Row>
                    <Col md={6}><h2>카테고리</h2></Col>
                    <Col md={6}><select value={getCategory} onChange={(event) => setGetCategory(event.target.value)}>
                                    <option>리빙</option>
                                    <option>푸드</option>
                                </select>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><h2>가격</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) => setGetPrice(event.target.value)} value={getPrice} /></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><h2>모집금액</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) => setGetRecruitMoney(event.target.value)} value={getRecruitMoney} /></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><h2>모집시작일</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) => setGetStartDate(event.target.value)} value={getStartDate} /></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><h2>모집마감일</h2></Col>
                   <Col md={6}><input type="text" onChange={(event) => setGetEndDate(event.target.value)} value={getEndDate} /></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><h2>캐러셀사진1링크</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) =>{
                            const updated = [...getCarouselLink];
                            updated[0] = event.target.value;
                            setGetCarouselLink(updated);
                        }} value={getCarouselLink[0]}></input></Col>
                </Row>
                <hr />
                 <Row>
                    <Col md={6}><h2>캐러셀사진2링크</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) =>{
                            const updated = [...getCarouselLink];
                            updated[1] = event.target.value;
                            setGetCarouselLink(updated);
                        }} value={getCarouselLink[1]}></input></Col>
                </Row>
                <hr />
                 <Row>
                    <Col md={6}><h2>캐러셀사진3링크</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) =>{
                            const updated = [...getCarouselLink];
                            updated[2] = event.target.value;
                            setGetCarouselLink(updated);
                        }} value={getCarouselLink[2]}></input></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><h2>내용</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) => setGetIntro(event.target.value)} value={getIntro} /></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><h2>사진링크</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) => setGetPictureLink(event.target.value)} value={getPictureLink} /></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><h2>영상링크</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) => setGetVideoLink(event.target.value)} value={getVideoLink} /></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><Button onClick={() => {
                        const updatedProduct = products.map(item =>
                                item.no === product.no
                                    ? { ...item, name: getName, companyname: getCompanyName, imglink: getImgLink, category:getCategory, price: getPrice, recruitmoney: getRecruitMoney, startdate: getStartDate, enddate: getEndDate, carousellink: getCarouselLink, intro: getIntro, picturelink: getPictureLink, videolink: getPictureLink }
                                    : item
                            );
                        setProducts(updatedProduct);
                        alert('수정완료!!');
                        onClose();
                    }}>수정하기</Button></Col>
                    <Col md={6}><Button variant="secondary" onClick={onClose}>취소</Button></Col>
                </Row>
            </div>
        </div>
    );
}
export default EditModal;