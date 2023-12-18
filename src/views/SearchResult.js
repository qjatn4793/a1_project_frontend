import React from "react";
import NotificationAlert from "react-notification-alert";
import ReactWordcloud from 'react-wordcloud';


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
                        <Col md={6} xs={12} id="left-col">
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
                        <Col md={6} xs={12} id="right-col">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">주요 뉴스 기사</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Alert color="primary">
                                        <Row className="d-flex align-items-center">
                                            <span>
                                                <b>농협</b>경제지주, 김장나눔 9000포기 전달
                                            </span>
                                            <Col md={3} xs={12} className="ml-auto">
                                                <Button
                                                    color="primary"
                                                    block
                                                    onClick={() => golink("http://www.edaily.co.kr/news/newspath.asp?newsid=03483366635836224")}
                                                >
                                                    기사 보러가기
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Alert>
                                    <Alert color="info">
                                        <Row className="d-flex align-items-center">
                                            <span>
                                                <b>농협</b>, 럼피스킨 확산 방지 '깨끗한 농장 가꾸기 캠페인'
                                            </span>
                                            <Col md={3} xs={12} className="ml-auto">
                                                <Button
                                                    color="info"
                                                    block
                                                    onClick={() => golink("https://www.yna.co.kr/view/AKR20231207109700062?input=1195m")}
                                                >
                                                    기사 보러가기
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Alert>
                                    <Alert color="success">
                                        <Row className="d-flex align-items-center">
                                            <span>
                                                한수원-NH<b>농협</b>금융지주, 탄소중립 경제 구축
                                            </span>
                                            <Col md={3} xs={12} className="ml-auto">
                                                <Button
                                                    color="success"
                                                    block
                                                    onClick={() => golink("https://zdnet.co.kr/view/?no=20231207130557")}
                                                >
                                                    기사 보러가기
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Alert>
                                    <Alert color="warning">
                                        <Row className="d-flex align-items-center">
                                            <span>
                                                <b>농협</b> 강원본부, 럼피스킨 확산 방지 ‘깨끗한 축산농장 가꾸기’ 캠페인
                                            </span>
                                            <Col md={3} xs={12} className="ml-auto">
                                                <Button
                                                    color="warning"
                                                    block
                                                    onClick={() => golink("https://www.news1.kr/articles/5254422")}
                                                >
                                                    기사 보러가기
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Alert>
                                    <Alert color="primary">
                                        <Row className="d-flex align-items-center">
                                            <span>
                                                <b>농협</b> 강원본부, 럼피스킨 확산 방지 ‘깨끗한 축산농장 가꾸기’ 캠페인
                                            </span>
                                            <Col md={3} xs={12} className="ml-auto">
                                                <Button
                                                    color="primary"
                                                    block
                                                    onClick={() => golink("https://www.news1.kr/articles/5254422")}
                                                >
                                                    기사 보러가기
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Alert>
                                    <Alert color="info">
                                        <Row className="d-flex align-items-center">
                                            <span>
                                                <b>농협</b> 강원본부, 럼피스킨 확산 방지 ‘깨끗한 축산농장 가꾸기’ 캠페인
                                            </span>
                                            <Col md={3} xs={12} className="ml-auto">
                                                <Button
                                                    color="info"
                                                    block
                                                    onClick={() => golink("https://www.news1.kr/articles/5254422")}
                                                >
                                                    기사 보러가기
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Alert>
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
