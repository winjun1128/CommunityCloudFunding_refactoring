import { useState,useEffect } from "react";
import { Button,Row,Col } from "react-bootstrap";
import './PayModal.css';
import { useProducts } from '../data/ProductContext';
function PayModal({show,onClose,itemindex}){
  const {products,setProducts} = useProducts(); //이제 products 배열 사용 가능
  const itemprice = products[itemindex].price;
  const [buyItemPrice,setBuyItemPrice] = useState(itemprice);
  const [buyItemCount,setBuyItemCount] = useState(1);
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');

 

  //모달 열릴떄 바디 스크롤 막기
  useEffect(()=>{
      if(show){
        document.body.style.overflow = 'hidden';
      }
      else{
        document.body.style.overflow = 'auto';
      }
      //컴포넌트가 언마운트될떄 원래대로
      return()=>{
        document.body.style.overflow='auto';
      };
    },[show]);

    if (!show) return null;

  return(
    <div className="paymodal-backdrop" onClick={onClose}>
      <div
        className="paymodal-content"
        onClick={(event) => event.stopPropagation()} // 내부 클릭 무시
      >
        <Row>
          <Col md={6}><h1>제품명</h1></Col>
          <Col md={6}><h1>{products[itemindex].name}</h1></Col>
        </Row>
        <hr />
        <Row>
          <Col md={3}><h1>갯수</h1></Col>
          <Col md={3}><Button onClick={()=>{
            // 비동기라 카운트 전에 가격계산됨
            // setBuyItemCount(buyItemCount + 1);
            // setBuyItemPrice(buyItemCount * itemprice);
            const newCount = buyItemCount + 1;
            setBuyItemCount(newCount);
            setBuyItemPrice(newCount*itemprice);
          }} variant="dark">+</Button></Col>
          <Col md={3}><span>{buyItemCount}</span></Col>
          <Col md={3}><Button onClick={()=>{
            if(buyItemCount>1){
               const newCount = buyItemCount - 1;
               setBuyItemCount(newCount);
               setBuyItemPrice(newCount*itemprice);
            }
          }} variant="dark">-</Button></Col>
        </Row>
        <hr />
        <Row>
          <Col md={6}><h1>주소</h1></Col>
          <Col md={6}><input type="text"/></Col>
        </Row>
        <hr />
        <Row>
          <Col md={6}><h1>금액</h1></Col>
          <Col md={6}><span>{buyItemPrice}</span></Col>
        </Row>
        <hr />
        <Row>
          <Col md={6}><h1>모집시작일</h1></Col>
          <Col md={6}><span>{products[itemindex].startdate}</span></Col>
        </Row>
        <hr />
        <Row>
          <Col md={6}><h1>모집마감일</h1></Col>
          <Col md={6}><span>{products[itemindex].enddate}</span></Col>
        </Row>
        <hr />
        <Row>
          <Col md={6}><h1>달성율</h1></Col>
          <Col md={6}><span>{products[itemindex].percent}</span></Col>
        </Row>
        <hr />
        <Row>
          <Col md={6}><Button onClick={()=>{
            let temp = [...products];
            temp[itemindex].count+=buyItemCount;
            temp[itemindex].gainmoney+=buyItemCount*temp[itemindex].price;
            temp[itemindex].consumer.push(localStorage.getItem('id'));
            temp[itemindex].percent = (temp[itemindex].gainmoney/temp[itemindex].recruitmoney)*100;
            setProducts(temp);     
            alert('결제완료!!');
            onClose();
          }}>결제하기</Button></Col>
          <Col md={6}><Button variant="secondary" onClick={onClose}>취소</Button></Col>
        </Row>
      </div>
    </div>
  );
}
export default PayModal;