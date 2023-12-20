// SearchBar.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Form,
    Container,
    Row,
    Col,
    Table,
    Button
} from "reactstrap";
import axios from 'axios';
import useDashboard from "views/useDashboard";
import { A1_API_URL } from '../../libs/Constants';

const SearchBar = () => {

    const { getGptAnswerApi } = useDashboard();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemDetails, setItemDetails] = useState(null);
    const [content, setContent] = useState("");
    const [gptResult, setGptResult] = useState("");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [selectedOption, setSelectedOption] = useState("");

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
                setSearchData(response.data);
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

        const filteredResults = searchData.filter((item) =>
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

                setItemDetails(response.data.data);
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

    const handleSelectChange = (e) => {
        const selectedOption = e.target.value;

        if (selectedOption != "선택되지 않음") {
            setSelectedOption(selectedOption);
        } else {
            return;
        }
    };

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/searchResult?item=${itemDetails} + ${selectedOption}`);
    };

    return (
        <Col md="6">
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Input
                        placeholder="🏢 관심 기업을 입력해보세요"
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.4983 4.43944C12.2141 4.18685 11.7859 4.18685 11.5017 4.43944L2.50174 12.4394C2.19215 12.7146 2.16426 13.1887 2.43945 13.4983C2.71464 13.8079 3.18869 13.8357 3.49828 13.5606L12 6.00347L20.5017 13.5606C20.8113 13.8357 21.2854 13.8079 21.5606 13.4983C21.8358 13.1887 21.8079 12.7146 21.4983 12.4394L12.4983 4.43944ZM21.4983 19.4394L12.4983 11.4394C12.2141 11.1869 11.7859 11.1869 11.5017 11.4394L2.50174 19.4394C2.19215 19.7146 2.16426 20.1887 2.43945 20.4983C2.71464 20.8079 3.18869 20.8357 3.49828 20.5606L12 13.0035L20.5017 20.5606C20.8113 20.8357 21.2854 20.8079 21.5606 20.4983C21.8358 20.1887 21.8079 19.7146 21.4983 19.4394Z" fill="white" />
                </svg>
            </div>
            {filteredData.length === 0 ? (
                <p></p>
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
                            <td style={{ textAlign: "right" }}>
                                <select
                                    value={selectedOption}
                                    onChange={handleSelectChange}
                                    className="form-control mr-2"
                                    style={{ width: "50%", display: "inline" }}
                                >
                                    <option value="선택되지 않음">선택되지 않음</option>
                                    <option value="AICC">AICC</option>
                                    <option value="챗봇">챗봇</option>
                                    <option value="콜봇">콜봇</option>
                                    <option value="메시징서비스">메시징서비스</option>
                                </select>
                                {/* <Button color="warning">
                                    <Link to={`/searchResult?item=${itemDetails} + ${selectedOption}`} style={{ color: "black" }}> 검색 결과 확인</Link>
                                </Button> */}
                                <Button color="warning" onClick={handleClick}>
                                    <span style={{ color: "black" }}>검색 결과 확인</span>
                                </Button>
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
    );
};

export default SearchBar;
