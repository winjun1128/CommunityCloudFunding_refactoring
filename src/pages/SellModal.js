import { useState,useEffect } from 'react';
import {Row,Col,Button} from "react-bootstrap";
import './SellModal.css';
import { useProducts } from '../data/ProductContext';
function SellModal({ show, onClose}) {
    const {products,setProducts} = useProducts();   //이제 products 배열 사용 가능
    //  { no: 1, imglink: "/basketball1.jpeg", name: '농구공1', companyname: '농구공회사1', startdate: '2025-05-28', enddate: '2025-06-11', percent: 50, price: 10000, recruitmoney: 20000, category: 'food', count: 0, carousellink:['','',''],intro:'',picturelink:'',videolink:'' }
    const [sellImgLink,setSellImgLink] = useState('');
    const [sellCompanyName,setSellCompanyName] = useState('');
    const [sellName, setSellName] = useState(0);
    const [sellCategory, setSellCategory] = useState('food');
    const [sellPrice, setSellPrice] = useState(0);
    const [sellRecruitMoney, setSellRecruitMoney] = useState(0);
    const [sellStartDate, setSellStartDate] = useState('');
    const [sellEndDate, setSellEndDate] = useState('');
    const [sellCarouselLink, setSellCarouselLink] = useState(['','','']);
    const [sellIntro, setSellIntro] = useState('');
    const [sellPictureLink, setSellPictureLink] = useState('');
    const [sellVideoLink, setSellVideoLink] = useState('');



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
        <div className="sellmodal-backdrop" onClick={onClose}>
            <div
                className="sellmodal-content"
                onClick={(event) => event.stopPropagation()} // 내부 클릭 무시
            >
                <Row>
                    <Col md={6}><h2>제품명</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) => setSellName(event.target.value)}></input></Col>
                </Row>
                <hr />

                <Row>
                    <Col md={6}><h2>회사명</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) => setSellCompanyName(event.target.value)}></input></Col>
                </Row>
                <hr />

                <Row>
                    <Col md={6}><h2>이미지링크</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) => setSellImgLink(event.target.value)}></input></Col>
                </Row>
                <hr />

                <Row>
                    <Col md={6}><h2>카테고리</h2></Col>
                    <Col md={6}><select value={sellCategory} onChange={(event) => setSellCategory(event.target.value)}>
                                    <option value="living">리빙</option>
                                    <option value="food">푸드</option>
                                </select>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><h2>가격</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) => setSellPrice(event.target.value)}></input></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><h2>모집금액</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) => setSellRecruitMoney(event.target.value)}></input></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><h2>모집시작일</h2></Col>
                    <Col md={6}><input type="date" onChange={(event) => setSellStartDate(event.target.value)} ></input></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><h2>모집마감일</h2></Col>
                    <Col md={6}><input type="date" onChange={(event) => setSellEndDate(event.target.value)} ></input></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><h2>캐러셀사진1링크</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) =>{
                            const updated = [...sellCarouselLink];
                            updated[0] = event.target.value;
                            setSellCarouselLink(updated);
                        }}></input></Col>
                </Row>
                <hr />
                 <Row>
                    <Col md={6}><h2>캐러셀사진2링크</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) =>{
                            const updated = [...sellCarouselLink];
                            updated[1] = event.target.value;
                            setSellCarouselLink(updated);
                        }}></input></Col>
                </Row>
                <hr />
                 <Row>
                    <Col md={6}><h2>캐러셀사진3링크</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) =>{
                            const updated = [...sellCarouselLink];
                            updated[2] = event.target.value;
                            setSellCarouselLink(updated);
                        }}></input></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><h2>내용</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) => setSellIntro(event.target.value)}></input></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><h2>사진링크</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) => setSellPictureLink(event.target.value)}></input></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><h2>영상링크</h2></Col>
                    <Col md={6}><input type="text" onChange={(event) => setSellVideoLink(event.target.value)}></input></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={6}><Button onClick={() => {
                        const temps = [...products];
                        const temp={no:products.length+1,imglink:sellImgLink,companyname:sellCompanyName, name:sellName,category:sellCategory,price:sellPrice,gainmoney:0,recruitmoney:sellRecruitMoney,startdate:sellStartDate,enddate:sellEndDate,carousellink:sellCarouselLink,intro:sellIntro,picturelink:sellPictureLink,videolink:sellVideoLink,percent:0,count:0,heart:[''],consumer:[''],seller:localStorage.getItem('id')};
                        temps.push(temp);
                        setProducts(temps);
                        alert('등록완료!!');
                        onClose();
                    }}>등록하기</Button></Col>
                    <Col md={6}><Button variant="secondary" onClick={onClose}>취소</Button></Col>
                </Row>
            </div>
        </div>
    );
}
export default SellModal;