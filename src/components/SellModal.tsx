import { useState, useEffect, ChangeEvent } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import './SellModal.css';
import { useProducts } from '../data/ProductContext';
import AlertModal from './AlertModal';

// ===== 타입 =====
type Category =
  | 'all'
  | 'food'
  | 'living'
  | 'area'
  | 'book'
  | 'learning'
  | 'environment'
  | 'pet'
  | 'travel'
  | 'beauty';

type State = '진행중' | '마감';

export interface Product {
  no: number;
  imglink: string;
  companyname: string;
  name: string;
  category: Category;
  price: number;
  gainmoney: number;
  recruitmoney: number;
  startdate: string; // YYYY-MM-DD
  enddate: string;   // YYYY-MM-DD
  carousellink: string[]; // 이미지 3장
  intro: string;
  picturelink: string;
  videolink: string;
  percent: number;   // 0~100
  count: number;
  heart: string[];   // user ids
  consumer: string[];// user ids
  seller: string | null;
  state: State;
}

interface UseProducts {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

type SellModalProps = {
  show: boolean;
  onClose: () => void;
};

const SellModal: React.FC<SellModalProps> = ({ show, onClose }) => {
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>('등록 완료');

  const { products, setProducts } = useProducts() as UseProducts;

  // 폼 상태
  const [sellImgLink, setSellImgLink] = useState<string>('');
  const [sellCompanyName, setSellCompanyName] = useState<string>('');
  const [sellName, setSellName] = useState<string>('');
  const [sellCategory, setSellCategory] = useState<Category>('food');
  const [sellPrice, setSellPrice] = useState<number>(0);
  const [sellRecruitMoney, setSellRecruitMoney] = useState<number>(0);
  const [sellStartDate, setSellStartDate] = useState<string>('');
  const [sellEndDate, setSellEndDate] = useState<string>('');
  const [sellCarouselLink, setSellCarouselLink] = useState<[string, string, string]>(['', '', '']);
  const [sellIntro, setSellIntro] = useState<string>('');
  const [sellPictureLink, setSellPictureLink] = useState<string>('');
  const [sellVideoLink, setSellVideoLink] = useState<string>('');

  // 스크롤 락
  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  if (!show) return null;

  const prefix = (path: string) =>
    path && !/^https?:\/\//.test(path) ? `${process.env.PUBLIC_URL}${path}` : path;

  const updateCarousel = (index: 0 | 1 | 2, value: string) => {
    const updated = [...sellCarouselLink] as [string, string, string];
    updated[index] = value;
    setSellCarouselLink(updated);
  };

  const parseNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const computeState = (endDateStr: string): State => {
    const today = new Date();
    const end = new Date(endDateStr);
    if (Number.isNaN(end.getTime())) return '진행중';
    return end.getTime() - today.getTime() <= 0 ? '마감' : '진행중';
  };

  const validate = (): string | null => {
    if (!sellName.trim() || !sellCompanyName.trim()) return '제품명과 회사명을 입력하세요.';
    if (!sellImgLink.trim()) return '대표 이미지 링크를 입력하세요.';
    if (!sellStartDate || !sellEndDate) return '모집 시작일과 마감일을 선택하세요.';
    const s = new Date(sellStartDate);
    const e = new Date(sellEndDate);
    if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return '날짜 형식이 올바르지 않습니다.';
    if (s.getTime() > e.getTime()) return '마감일은 시작일 이후여야 합니다.';
    if (sellPrice <= 0) return '가격은 0보다 커야 합니다.';
    if (sellRecruitMoney <= 0) return '모집 금액은 0보다 커야 합니다.';
    return null;
  };

  const handleRegister = () => {
    const error = validate();
    if (error) {
      setAlertMsg(error);
      setShowAlertModal(true);
      return;
    }

    const state = computeState(sellEndDate);

    const product: Product = {
      no: products.length + 1,
      imglink: prefix(sellImgLink),
      companyname: sellCompanyName.trim(),
      name: sellName.trim(),
      category: sellCategory,
      price: sellPrice,
      gainmoney: 0,
      recruitmoney: sellRecruitMoney,
      startdate: sellStartDate,
      enddate: sellEndDate,
      carousellink: sellCarouselLink.map(prefix),
      intro: sellIntro,
      picturelink: prefix(sellPictureLink),
      videolink: prefix(sellVideoLink),
      percent: 0,
      count: 0,
      heart: [],
      consumer: [],
      seller: localStorage.getItem('id'),
      state,
    };

    setProducts((prev) => [...prev, product]);

    setAlertMsg('등록 완료');
    setShowAlertModal(true);

    // 폼 초기화 (원하면 유지하도록 바꿔도 됨)
    setSellImgLink('');
    setSellCompanyName('');
    setSellName('');
    setSellCategory('food');
    setSellPrice(0);
    setSellRecruitMoney(0);
    setSellStartDate('');
    setSellEndDate('');
    setSellCarouselLink(['', '', '']);
    setSellIntro('');
    setSellPictureLink('');
    setSellVideoLink('');
  };

  return (
    <div className="sellmodal-backdrop" onClick={onClose}>
      <div className="sellmodal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-center mb-4">상품 등록</h3>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>제품명</Form.Label>
            <Form.Control
              type="text"
              value={sellName}
              onChange={(e) => setSellName(e.target.value)}
              aria-label="제품명"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>회사명</Form.Label>
            <Form.Control
              type="text"
              value={sellCompanyName}
              onChange={(e) => setSellCompanyName(e.target.value)}
              aria-label="회사명"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>대표 이미지 링크</Form.Label>
            <Form.Control
              type="text"
              value={sellImgLink}
              onChange={(e) => setSellImgLink(e.target.value)}
              placeholder="/images/xxx.jpg 또는 https://..."
              aria-label="대표 이미지 링크"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>카테고리</Form.Label>
            <Form.Select
              value={sellCategory}
              onChange={(e) => setSellCategory(e.target.value as Category)}
              aria-label="카테고리"
            >
              <option value="living">리빙</option>
              <option value="food">푸드</option>
              <option value="area">지역</option>
              <option value="book">서적</option>
              <option value="learning">교육</option>
              <option value="environment">환경</option>
              <option value="pet">펫</option>
              <option value="travel">여행</option>
              <option value="beauty">뷰티</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>가격</Form.Label>
            <Form.Control
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(parseNumber(e))}
              min={0}
              aria-label="가격"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>모집 금액</Form.Label>
            <Form.Control
              type="number"
              value={sellRecruitMoney}
              onChange={(e) => setSellRecruitMoney(parseNumber(e))}
              min={0}
              aria-label="모집 금액"
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>모집 시작일</Form.Label>
                <Form.Control
                  type="date"
                  value={sellStartDate}
                  onChange={(e) => setSellStartDate(e.target.value)}
                  aria-label="모집 시작일"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>모집 마감일</Form.Label>
                <Form.Control
                  type="date"
                  value={sellEndDate}
                  onChange={(e) => setSellEndDate(e.target.value)}
                  aria-label="모집 마감일"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>파일</Form.Label>
            <Form.Control type="file" onChange={() => void 0} />
          </Form.Group>

          {[0, 1, 2].map((i) => (
            <Form.Group className="mb-3" key={i}>
              <Form.Label>캐러셀 이미지 링크 {i + 1}</Form.Label>
              <Form.Control
                type="text"
                value={sellCarouselLink[i]}
                onChange={(e) => updateCarousel(i as 0 | 1 | 2, e.target.value)}
                placeholder="/images/xxx.jpg 또는 https://..."
                aria-label={`캐러셀 이미지 링크 ${i + 1}`}
              />
            </Form.Group>
          ))}

          <Form.Group className="mb-3">
            <Form.Label>상품 소개</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={sellIntro}
              onChange={(e) => setSellIntro(e.target.value)}
              aria-label="상품 소개"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>상세 이미지 링크</Form.Label>
            <Form.Control
              type="text"
              value={sellPictureLink}
              onChange={(e) => setSellPictureLink(e.target.value)}
              placeholder="/images/xxx.jpg 또는 https://..."
              aria-label="상세 이미지 링크"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>영상 링크</Form.Label>
            <Form.Control
              type="text"
              value={sellVideoLink}
              onChange={(e) => setSellVideoLink(e.target.value)}
              placeholder="/videos/xxx.mp4 또는 https://..."
              aria-label="영상 링크"
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="primary" type="submit">
              등록하기
            </Button>
            <Button variant="secondary" type="button" onClick={onClose}>
              취소
            </Button>
          </div>
        </Form>
      </div>

      <AlertModal
        show={showAlertModal}
        handleClose={() => setShowAlertModal(false)}
        content={alertMsg}
        opt={alertMsg === '등록 완료' ? 2 : 1}
      />
    </div>
  );
};

export default SellModal;
