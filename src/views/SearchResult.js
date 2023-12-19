import React, { useEffect, useState } from 'react';
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import ReactWordcloud from 'react-wordcloud';
import { useParams } from 'react-router-dom';
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

function SearchResult() {

    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        // 현재 URL에서 item 값을 추출합니다.
        const urlParams = new URLSearchParams(window.location.search);
        const item = urlParams.get("item");
    
        if (item) {
            // 추출한 item 값을 사용하여 Axios로 요청을 보냅니다.
            axios
                .get(A1_API_URL + `/api/searchResult?item=${item}`)
                .then((response) => {
                    // 데이터 처리 로직
                    console.log(response.data);
    
                    // response.data.items를 사용하여 뉴스 데이터 배열을 가져옵니다.
                    const newsDataArray = response.data.items;
    
                    // 배열 형태로 데이터를 설정합니다.
                    setNewsData(newsDataArray);
                })
                .catch((error) => {
                    console.error("Axios 오류:", error);
                });
        }
    }, []);

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
    return (
        <>
            <div className="main-panel">
                <PanelHeader
                    content={
                        <div className="header text-center">
                            <h2 className="title">searchResult</h2>
                        </div>
                    }
                />
                <div className="content">
                    <NotificationAlert ref={notificationAlert} />
                    <Row>
                        <Col md={6} xs={12}>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">핵심 키워드</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <WordCloudComponent words={words} />
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <div className="places-buttons">
                                        <Row>
                                            <Col md={6} className="ml-auto mr-auto text-center">
                                                <CardTitle tag="h4">
                                                    최신 시장 동향
                                                </CardTitle>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={8} xs={12} className="ml-auto mr-auto">
                                                <Row>
                                                    <Col md={4} xs={12}>
                                                        <Button
                                                            color="primary"
                                                            block
                                                            onClick={() => notify("tl")}
                                                        >
                                                            Top Left
                                                        </Button>
                                                    </Col>
                                                    <Col md={4} xs={12}>
                                                        <Button
                                                            color="primary"
                                                            block
                                                            onClick={() => notify("tc")}
                                                        >
                                                            Top Center
                                                        </Button>
                                                    </Col>
                                                    <Col md={4} xs={12}>
                                                        <Button
                                                            color="primary"
                                                            block
                                                            onClick={() => notify("tr")}
                                                        >
                                                            Top Right
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={8} xs={12} className="ml-auto mr-auto">
                                                <Row>
                                                    <Col md={4} xs={12}>
                                                        <Button
                                                            color="primary"
                                                            block
                                                            onClick={() => notify("bl")}
                                                        >
                                                            Bottom Left
                                                        </Button>
                                                    </Col>
                                                    <Col md={4} xs={12}>
                                                        <Button
                                                            color="primary"
                                                            block
                                                            onClick={() => notify("bc")}
                                                        >
                                                            Bottom Center
                                                        </Button>
                                                    </Col>
                                                    <Col md={4} xs={12}>
                                                        <Button
                                                            color="primary"
                                                            block
                                                            onClick={() => notify("br")}
                                                        >
                                                            Bottom Right
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={6} xs={12}>
                        <Card>
                    <CardHeader>
                        <CardTitle tag="h4">주요 뉴스 기사</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {newsData.map((news, index) => {
                            const colors = ["primary", "success", "info", "warning", "danger"];
                            const colorIndex = index % colors.length;

                            return (
                                <Alert
                                    key={index}
                                    color={colors[colorIndex]}
                                >
                                    <Row className="d-flex align-items-center">
                                        <span>
                                            <b dangerouslySetInnerHTML={{ __html: news.title }} />
                                        </span>
                                        <Col md={3} xs={12} className="ml-auto">
                                            <Button
                                                color={colors[colorIndex]}
                                                block
                                                onClick={() => golink(news.link)}
                                            >
                                                기사 보러가기
                                            </Button>
                                        </Col>
                                    </Row>
                                </Alert>
                            );
                        })}
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
