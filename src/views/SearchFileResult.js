import React, { useEffect, useState } from 'react';
import axios from "axios";
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

    const handleFileDown = async () => {
        try {
            const response = await axios.get(A1_API_URL + `/file/downloadFile`, {
                responseType: 'blob',
            });

            if (!response.data || response.data.size === 0) {
                console.error('Empty response data');
                return;
            }

            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = '템플릿초안.pptx';
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('파일 다운로드 중 오류 발생', error);
        }
    };

    return (
        <>
            <div className="main-panel">
                <PanelHeader style={{ background: "#ffffff" }}
                    content={
                        <Row>
                            <a href="/a1_bot/dashboard" className="title ml-5" style={{ color: "black", paddingTop: "20px", marginBottom: "15px" }}><h3><b style={{ color: "#fa7a50" }}>A1</b></h3></a>
                            <div style={{ paddingTop: "12px", width: "90%" }}>
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
                        <Col md={6} xs={12} className='d-flex align-items-stretch'>
                            <Card style={{ borderRadius: "25px" }}>
                                <CardHeader>
                                    <CardTitle><b>분석 내용</b></CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <WordCloudComponent words={words} />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={6} xs={12}>
                            <Card style={{ borderRadius: "25px" }}>
                                <CardHeader>
                                    <CardTitle className="d-flex justify-content-between align-items-center">
                                        <b>요구사항 추출</b>
                                        <Button color="warning" style={{ margin: 0 }} onClick={handleFileDown}>
                                            <span>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 15.575C11.8667 15.575 11.7417 15.5542 11.625 15.5125C11.5083 15.4708 11.4 15.4 11.3 15.3L7.7 11.7C7.5 11.5 7.40417 11.2667 7.4125 11C7.42083 10.7333 7.51667 10.5 7.7 10.3C7.9 10.1 8.1375 9.99583 8.4125 9.9875C8.6875 9.97917 8.925 10.075 9.125 10.275L11 12.15V5C11 4.71667 11.0958 4.47917 11.2875 4.2875C11.4792 4.09583 11.7167 4 12 4C12.2833 4 12.5208 4.09583 12.7125 4.2875C12.9042 4.47917 13 4.71667 13 5V12.15L14.875 10.275C15.075 10.075 15.3125 9.97917 15.5875 9.9875C15.8625 9.99583 16.1 10.1 16.3 10.3C16.4833 10.5 16.5792 10.7333 16.5875 11C16.5958 11.2667 16.5 11.5 16.3 11.7L12.7 15.3C12.6 15.4 12.4917 15.4708 12.375 15.5125C12.2583 15.5542 12.1333 15.575 12 15.575ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V16C4 15.7167 4.09583 15.4792 4.2875 15.2875C4.47917 15.0958 4.71667 15 5 15C5.28333 15 5.52083 15.0958 5.7125 15.2875C5.90417 15.4792 6 15.7167 6 16V18H18V16C18 15.7167 18.0958 15.4792 18.2875 15.2875C18.4792 15.0958 18.7167 15 19 15C19.2833 15 19.5208 15.0958 19.7125 15.2875C19.9042 15.4792 20 15.7167 20 16V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="#FF5C00" />
                                                </svg>
                                                PPTX 로 다운로드
                                            </span>
                                        </Button>
                                    </CardTitle>
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
