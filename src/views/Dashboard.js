import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import useDashboard from './useDashboard';
import { A1_API_URL } from '../libs/Constants';
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table,
  Form,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

function Dashboard() {
  const { getGptAnswerApi } = useDashboard();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [yourData, setYourData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
  const [content, setContent] = useState("");
  const [gptResult, setGptResult] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      fetchItemDetails(selectedItem);
    }
  }, [selectedItem]);

  // searchTerm이 변경될 때 itemDetails 초기화
  useEffect(() => {
    setItemDetails(null);
    setFilteredData([]);
    handleSearch();
  }, [searchTerm]);

  const fetchData = () => {
    axios.get(A1_API_URL + `/api/search`)
      .then((response) => {
        setYourData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchItemDetails = (selectedItem) => {
    axios.get(A1_API_URL + `/api/searchItem?item=${selectedItem}`)
      .then((response) => {
        setItemDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  };

  // chatGpt 검색
  const getGptAnswer = async () => {
    const res = await getGptAnswerApi({ content: content });
    setGptResult(res);
  };

  const handleSearch = () => {
    // 검색어가 비어 있으면 검색을 수행하지 않음
    if (searchTerm.trim() === "") {
      setFilteredData([]);
      return;
    }

    fetchData();

    const filteredResults = yourData.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(filteredResults);
  };

  const handleResultClick = (item) => {
    setSelectedItem(item);
  };

  const handleFileUpload = (file) => {
    // 파일 업로드 로직을 수행
    setUploadedFile(file);

    // 서버에 파일 업로드를 위한 FormData 생성
    const formData = new FormData();
    formData.append('file', file);

    // 서버에 POST 요청 보내기
    axios.post(A1_API_URL + `/api/searchItem`, formData)
      .then((response) => {
        console.log('서버 응답:', response.data);

        setItemDetails(response.data);
      })
      .catch((error) => {
        console.error('서버 업로드 오류:', error);
      });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    e.target.style.backgroundColor = 'white';
    handleFileUpload(droppedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = '#f0f0f0';
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = 'white';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  return (
    <Container style={{ marginTop: '15%' }}>
      <Row className="justify-content-center align-items-center">
        <Col md="6">
          <a href="/" style={{color:'white'}} className="d-flex justify-content-center align-items-center">
            <h1><b>Assistance 1step</b></h1>
          </a>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="no-border">
              <Input
                placeholder="🏢 검색 또는 파일을 여기로 업로드하세요..."
                style={{ backgroundColor: 'white' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={(e) => e.preventDefault()}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText
                  style={{ backgroundColor: 'white' }}
                  onClick={handleSearch}
                >
                  <label style={{ margin: 0, cursor: 'pointer' }}>
                    <i className="now-ui-icons ui-1_zoom-bold" />
                  </label>
                </InputGroupText>
                <InputGroupText style={{ backgroundColor: 'white' }}>
                  <label htmlFor="fileInput" style={{ margin: 0, cursor: 'pointer' }}>
                    <i className="now-ui-icons files_single-copy-04" />
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    accept=".txt,.pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          {filteredData.length === 0 ? (
            <p>검색 결과가 없습니다.</p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Results</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr style={{ cursor: 'pointer' }} key={index} onClick={() => handleResultClick(item)}>
                    <td>{item}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {itemDetails && (
            <Table>
              <thead>
                <tr>
                  <th>Item Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>results : {itemDetails}</td>
                  <td style={{textAlign : "right"}}>
                    <Link to={`/searchResult?item=${itemDetails}`} style={{color : "black"}}>검색 결과 확인</Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
          
          {/* <InputGroup>
            <Input
              placeholder="챗 지피티..."
              onChange={(e) => setContent(e.target.value)}
              style={{ backgroundColor: 'white' }}
              value={content}
            />
            <Button
              onClick={getGptAnswer}
            >
              검색
            </Button>
          </InputGroup>
          <Input type="textarea" name="text" id="exampleText" value={gptResult || ""} /> */}
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
