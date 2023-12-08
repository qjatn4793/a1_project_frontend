import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table,
  Form
} from "reactstrap";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [yourData, setYourData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);
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
  }, [searchTerm]);

  const fetchData = () => {
    axios.get("http://localhost:8080/api/search")
      .then((response) => {
        setYourData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchItemDetails = (selectedItem) => {
    axios.get(`http://localhost:8080/api/searchItem?item=${selectedItem}`)
      .then((response) => {
        setItemDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
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
    axios.post('http://localhost:8080/api/searchItem', formData)
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

  return (
    <>
      <div className="content d-flex justify-content-center align-items-center">
        <div>
          <a href="/" className="d-flex justify-content-center align-items-center">
            <h1>A1</h1>
          </a>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="no-border" style={{ width: '500px' }}>
              <Input
                placeholder="검색 또는 파일을 여기로 드래그하세요..."
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
                  style={{ backgroundColor: 'white', cursor: 'pointer' }}
                  onClick={handleSearch}
                >
                  <i
                    className="now-ui-icons ui-1_zoom-bold"
                    style={{ transition: 'color 0.3s' }}
                  />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Form>
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
          {itemDetails && (
            <Table>
              <thead>
                <tr>
                  <th>Item Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{itemDetails}</td>
                  <td><Link to="/searchResult">확인</Link></td>
                </tr>
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
