import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import './EditModal.css';
import { useProducts } from '../data/ProductContext';
import AlertModal from './AlertModal';

function EditModal({ show, onClose, product }) {
  const [showAlertModal,setShowAlertModal] = useState(false);
  const { products, setProducts } = useProducts();

  const [getName, setGetName] = useState('');
  const [getCompanyName, setGetCompanyName] = useState('');
  const [getImgLink, setGetImgLink] = useState('');
  const [getCategory, setGetCategory] = useState('');
  const [getPrice, setGetPrice] = useState(0);
  const [getRecruitMoney, setGetRecruitMoney] = useState(0);
  const [getStartDate, setGetStartDate] = useState('');
  const [getEndDate, setGetEndDate] = useState('');
  const [getCarouselLink, setGetCarouselLink] = useState(['', '', '']);
  const [getIntro, setGetIntro] = useState('');
  const [getPictureLink, setGetPictureLink] = useState('');
  const [getVideoLink, setGetVideoLink] = useState('');

  const today = new Date();

  const endDate = new Date(getEndDate);
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  if (!show) return null;

  const handleCarouselChange = (index, value) => {
    const updated = [...getCarouselLink];
    updated[index] = value;
    setGetCarouselLink(updated);
  };

  const handleUpdate = () => {
    const updatedProduct = products.map((item) =>
      item.no === product.no
        ? {
            ...item,
            name: getName,
            companyname: getCompanyName,
            imglink: getImgLink,
            category: getCategory,
            price: getPrice,
            recruitmoney: getRecruitMoney,
            startdate: getStartDate,
            enddate: getEndDate,
            carousellink: getCarouselLink,
            intro: getIntro,
            picturelink: getPictureLink,
            videolink: getVideoLink,
            state: diffDays <= 0 ? '마감' : '진행중'
          }
        : item
    );
    setProducts(updatedProduct);
    setShowAlertModal(true);
  };

  return (
    <div className="editmodal-backdrop" onClick={onClose}>
      <div className="editmodal-content" onClick={(e) => e.stopPropagation()}>
        <h4 className="mb-4 text-center">상품 수정</h4>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>제품명</Form.Label>
            <Form.Control value={getName} onChange={(e) => setGetName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>회사명</Form.Label>
            <Form.Control value={getCompanyName} onChange={(e) => setGetCompanyName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>대표 이미지 링크</Form.Label>
            <Form.Control value={getImgLink} onChange={(e) => setGetImgLink(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>카테고리</Form.Label>
            <Form.Select value={getCategory} onChange={(e) => setGetCategory(e.target.value)}>
              <option value="living">리빙</option>
              <option value="food">푸드</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>가격</Form.Label>
            <Form.Control type="number" value={getPrice} onChange={(e) => setGetPrice(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>모집 금액</Form.Label>
            <Form.Control type="number" value={getRecruitMoney} onChange={(e) => setGetRecruitMoney(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>모집 시작일</Form.Label>
            <Form.Control type="date" value={getStartDate} onChange={(e) => setGetStartDate(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>모집 마감일</Form.Label>
            <Form.Control type="date" value={getEndDate} onChange={(e) => setGetEndDate(e.target.value)} />
          </Form.Group>

          {[0, 1, 2].map((i) => (
            <Form.Group className="mb-3" key={i}>
              <Form.Label>캐러셀 이미지 링크 {i + 1}</Form.Label>
              <Form.Control
                type="text"
                value={getCarouselLink[i] || ''}
                onChange={(e) => handleCarouselChange(i, e.target.value)}
              />
            </Form.Group>
          ))}

          <Form.Group className="mb-3">
            <Form.Label>소개글</Form.Label>
            <Form.Control value={getIntro} onChange={(e) => setGetIntro(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>상세 이미지 링크</Form.Label>
            <Form.Control value={getPictureLink} onChange={(e) => setGetPictureLink(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>영상 링크</Form.Label>
            <Form.Control value={getVideoLink} onChange={(e) => setGetVideoLink(e.target.value)} />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="primary" onClick={handleUpdate}>수정하기</Button>
            <Button variant="secondary" onClick={onClose}>취소</Button>
          </div>
        </Form>
      </div>
      <AlertModal show={showAlertModal} handleClose={()=>setShowAlertModal(false)} content="수정 완료" opt={2}></AlertModal>
    </div>
  );
}

export default EditModal;
