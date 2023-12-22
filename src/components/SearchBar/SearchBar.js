// SearchBar.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Form,
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
        axios.post(A1_API_URL + `/fileUpload/searchItem`, formData)
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
        // 파일 형식을 확인하기 위한 확장자 목록
        const fileExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'jpg', 'png', 'gif'];

        // itemDetails에서 확장자 추출
        const extension = itemDetails.split('.').pop().toLowerCase();

        // 파일 형식인지 확인
        if (fileExtensions.includes(extension)) {
            // 파일 형식인 경우
            navigate(`/a1_bot/searchFileResult?item=${itemDetails} + ${selectedOption}`);
        } else {
            // 파일 형식이 아닌 경우
            navigate(`/a1_bot/searchResult?item=${itemDetails} + ${selectedOption}`);
        }
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
                                {/* <i className="now-ui-icons ui-1_zoom-bold" /> */}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" fill="#FF5C00" />
                                </svg>
                            </label>
                        </InputGroupText>
                        <InputGroupText style={{ backgroundColor: 'white' }}>
                            <label htmlFor="fileInput" style={{ margin: 0, cursor: 'pointer' }}>
                                {/* <i className="now-ui-icons files_single-copy-04" /> */}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V9C3 8.45 3.19583 7.97917 3.5875 7.5875C3.97917 7.19583 4.45 7 5 7H7V5C7 4.45 7.19583 3.97917 7.5875 3.5875C7.97917 3.19583 8.45 3 9 3H15C15.55 3 16.0208 3.19583 16.4125 3.5875C16.8042 3.97917 17 4.45 17 5V11H19C19.55 11 20.0208 11.1958 20.4125 11.5875C20.8042 11.9792 21 12.45 21 13V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H13V17H11V21H5ZM5 19H7V17H5V19ZM5 15H7V13H5V15ZM5 11H7V9H5V11ZM9 15H11V13H9V15ZM9 11H11V9H9V11ZM9 7H11V5H9V7ZM13 15H15V13H13V15ZM13 11H15V9H13V11ZM13 7H15V5H13V7ZM17 19H19V17H17V19ZM17 15H19V13H17V15Z" fill="#AAAAAA" />
                                </svg>
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
                                    <option value="선택되지 않음">미선택</option>
                                    <option value="AICC">AICC</option>
                                    <option value="챗봇">챗봇</option>
                                    <option value="콜봇">콜봇</option>
                                    <option value="메시징서비스">메시징서비스</option>
                                </select>
                                <Button color="warning" onClick={handleClick} style={{padding : "10px 0px 10px 0px"}}>
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
