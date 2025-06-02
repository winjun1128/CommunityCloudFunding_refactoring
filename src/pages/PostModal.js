import { useState } from 'react';
import { useEffect } from 'react';
import {Row,Col,Button} from 'react-bootstrap';
import './PostModal.css';
function PostModal({ show, onClose, commentAr,setCommentAr,id,date,title,content}) {
    const[getCmt,setGetCmt]=useState('');
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

     const handleAddCommentAr = (newCmt) =>{
        setCommentAr([newCmt,...commentAr]);
    }

    return (
        <div className="postmodal-backdrop" onClick={onClose}>
            <div
                className="postmodal-content"
                onClick={(event) => event.stopPropagation()} // 내부 클릭 무시
            >


                <Row>
                    <Col md={12}><h1>{title}</h1></Col>
                </Row>
                <hr />
                <Row>
                    <Col md={12}><h2>{content}</h2></Col>
                </Row>
                <hr />
                {
                    commentAr.map((item,index)=>{
                        return(
                            <>
                                <Row>
                                    <Col md={2}><h6>[{item.id}]</h6></Col>
                                    <Col md={2}><span style={{fontSize:'0.7rem'}}>({item.date})</span></Col>
                                    <Col md={8}><h6>{item.comment}</h6></Col>
                                </Row>
                                <hr/>
                            </>
                        )
                    })
                }
                <Row>
                    <Col md={2}><h6>[{id}]</h6></Col>
                    <Col md={2}><span style={{fontSize:'0.7rem'}}>({date})</span></Col>
                    <Col md={6}><input type="text" onChange={(event) => setGetCmt(event.target.value)} /></Col>
                    <Col md={2}><Button onClick={()=>{
                        const temp={id:id,date:date,comment:getCmt};
                        handleAddCommentAr(temp);
                    }}>달기</Button></Col>
                </Row>
                <hr />
                <Row>
                    <div className='cancelareapostmodal'>
                        <Col md={12}><Button variant='secondary' onClick={onClose}>취소</Button></Col>
                    </div>
                </Row>
            </div>
        </div>
    );
}
export default PostModal;