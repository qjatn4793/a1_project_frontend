import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import NotificationAlert from "react-notification-alert";
import ReactWordcloud from 'react-wordcloud';
import { useLocation } from 'react-router-dom';
import { A1_API_URL } from '../libs/Constants';


// reactstrap components
import {
    Button,
    Alert,
    Card,
    CardTitle,
    CardBody,
    CardHeader,
    Row,
    Col,
    CardText,
} from "reactstrap";

const WordCloudComponent = ({ words }) => {
    const options = {
        rotations: 0, // 각 단어당 회전 수
        rotationAngles: [0, 90], // 가능한 회전 각도 (도 단위)
        fontSizes: [60, 60], // 폰트 크기 범위
        scale: 'linear', // 폰트 크기의 스케일링 방법 ('linear', 'sqrt', 또는 'log')
        spiral: 'rectangular', // 나선형의 형태 ('archimedean' 또는 'rectangular')
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <ReactWordcloud words={words} options={options} />
        </div>
    );
};

const words = [
    { text: 'React', value: 10 },
    { text: 'JavaScript', value: 8 },
    { text: 'Node.js', value: 7 },
    { text: 'HTML', value: 6 },
    { text: 'CSS', value: 5 },
    { text: 'TypeScript', value: 4 },
    { text: 'Redux', value: 3 },
    { text: 'Webpack', value: 2 },
    { text: 'Babel', value: 1 },
    { text: 'Express.js', value: 9 },
];


// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import SearchBar from 'components/SearchBar/SearchBar';

function SearchResult() {

    const [newsData, setNewsData] = useState([]);
    const [item, setItem] = useState(null); // item을 상태로 추가
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const newItem = urlParams.get("item");
        setItem(newItem); // 상태 업데이트

        if (newItem) {
            axios
                .get(A1_API_URL + `/api/searchResult?item=${newItem}`)
                .then((response) => {
                    setNewsData(response.data.items);
                })
                .catch((error) => {
                    console.error("Axios 오류:", error);
                });
        }
    }, [location]);

    const notificationAlert = React.useRef();
    const golink = (url) => {
        window.location.href = url;
    };
    const notify = (place) => {
        var color = Math.floor(Math.random() * 5 + 1);
        var type;
        switch (color) {
            case 1:
                type = "primary";
                break;
            case 2:
                type = "success";
                break;
            case 3:
                type = "danger";
                break;
            case 4:
                type = "warning";
                break;
            case 5:
                type = "info";
                break;
            default:
                break;
        }
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    <div>
                        Welcome to <b>Now UI Dashboard React</b> - a beautiful freebie for
                        every web developer.
                    </div>
                </div>
            ),
            type: type,
            icon: "now-ui-icons ui-1_bell-53",
            autoDismiss: 7,
        };
        notificationAlert.current.notificationAlert(options);
    };

    function formatPubDate(pubDate) {
        const date = new Date(pubDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const navigate = useNavigate();

    return (
        <>
            <div className="main-panel">
                <PanelHeader style={{ background: "#ffffff" }}
                    content={
                        <Row>
                            {/* <a href="#" onClick={() => navigate('/')} className="title ml-5" style={{color : "black", paddingTop : "15px", marginBottom : "15px"}}><h3><b style={{color : "#fa7a50"}}>A1</b></h3></a> */}
                            <a href="#" onClick={() => navigate('/a1_bot/dashboard')} className="title ml-5" style={{ color: "black", paddingTop: "15px", marginBottom: "15px" }}><h3><b style={{ color: "#fa7a50" }}>A1</b></h3></a>
                            <div style={{ paddingTop: "12px", width: "70%" }}>
                                <SearchBar></SearchBar>
                            </div>
                        </Row>
                    }
                />
                <div className="header text-center" style={{ backgroundColor: "#ffffff" }}>
                    <h4 className="title" style={{ color: "black", borderTop: "1px solid #C1C1C1", paddingTop: "15px", paddingBottom: "15px", marginTop: "0px" }}><b style={{ color: "#fa7a50" }}>{item}</b> 검색결과</h4>
                </div>
                <div className="content">
                    <NotificationAlert ref={notificationAlert} />
                    <Row>
                        <Col md={6} xs={12}>
                            <Card style={{ borderRadius: "25px" }}>
                                <CardHeader>
                                    <CardTitle><b>핵심 키워드</b></CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <WordCloudComponent words={words} />
                                </CardBody>
                            </Card>
                            <Card style={{ borderRadius: "25px" }}>
                                <CardHeader>
                                    <CardTitle><b>키워드 트랜드 변화</b></CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col md={4} xs={12}>
                                            <Card style={{ borderRadius: "25px" }}>
                                                <CardHeader>
                                                    <CardTitle style={{ color: "#FF5C00" }}><b>6개월 전</b></CardTitle>
                                                </CardHeader>
                                                <CardBody>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                        <b style={{ color: "black" }}>1. 생성형 AI</b>
                                                        <b style={{ color: "gray" }}>343건</b>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                        <b style={{ color: "black" }}>2. GPT 4.0</b>
                                                        <b style={{ color: "gray" }}>121건</b>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                        <b style={{ color: "black" }}>3. LLM</b>
                                                        <b style={{ color: "gray" }}>96건</b>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                        <b style={{ color: "black" }}>4. 언어처리기술</b>
                                                        <b style={{ color: "gray" }}>32건</b>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                        <b style={{ color: "black" }}>5. AI 솔루션</b>
                                                        <b style={{ color: "gray" }}>11건</b>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col md={4} xs={12}>
                                            <Card style={{ borderRadius: "25px" }}>
                                                <CardHeader>
                                                    <CardTitle style={{ color: "#FF5C00" }}><b>3개월 전</b></CardTitle>
                                                </CardHeader>
                                                <CardBody>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                        <b style={{ color: "black" }}>1. 생성형 AI</b>
                                                        <b style={{ color: "gray" }}>443건</b>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                        <b style={{ color: "black" }}>2. GPT 4.0</b>
                                                        <b style={{ color: "gray" }}>221건</b>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                        <b style={{ color: "black" }}>3. LLM</b>
                                                        <b style={{ color: "gray" }}>125건</b>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                        <b style={{ color: "black" }}>4. 언어처리기술</b>
                                                        <b style={{ color: "gray" }}>42건</b>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                        <b style={{ color: "black" }}>5. AI 솔루션</b>
                                                        <b style={{ color: "gray" }}>21건</b>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col md={4} xs={12}>
                                            <Card style={{ borderRadius: "25px" }}>
                                                <CardHeader>
                                                    <CardTitle style={{ color: "#FF5C00" }}><b>오늘</b></CardTitle>
                                                </CardHeader>
                                                <CardBody>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                        <b style={{ color: "black" }}>1. 생성형 AI</b>
                                                        <b style={{ color: "gray" }}>493건</b>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                        <b style={{ color: "black" }}>2. GPT 4.0</b>
                                                        <b style={{ color: "gray" }}>276건</b>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                        <b style={{ color: "black" }}>3. LLM</b>
                                                        <b style={{ color: "gray" }}>149건</b>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                        <b style={{ color: "black" }}>4. 언어처리기술</b>
                                                        <b style={{ color: "gray" }}>56건</b>
                                                    </div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                        <b style={{ color: "black" }}>5. AI 솔루션</b>
                                                        <b style={{ color: "gray" }}>38건</b>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={6} xs={12}>
                            <Card style={{ borderRadius: "25px" }}>
                                <CardHeader>
                                    <CardTitle><b>주요 뉴스 기사</b></CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        {newsData.map((news, index) => (
                                            <Col md={6} xs={12} key={index}>
                                                <Alert
                                                    style={{
                                                        border: "solid 1px #e2e3e5",
                                                        backgroundColor: "white",
                                                        borderRadius: "16px",
                                                    }}
                                                >
                                                    <div onClick={() => golink(news.link)}>
                                                        <p style={{ color: "black", margin: "0", cursor: 'pointer' }} dangerouslySetInnerHTML={{ __html: news.title }} />
                                                    </div>
                                                    <br></br>
                                                    <div className="text-muted" style={{ textAlign: "right" }}>{formatPubDate(news.pubDate)}</div>
                                                </Alert>
                                            </Col>
                                        ))}
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}

export default SearchResult;
