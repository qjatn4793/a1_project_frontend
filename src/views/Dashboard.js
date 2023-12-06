import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table,
  Button,
  Form,
} from "reactstrap";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [yourData, setYourData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);

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
  
  useEffect(() => {
    if (selectedItem) {
      fetchItemDetails(selectedItem);
    }
  }, [selectedItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <>
      <div className="content d-flex justify-content-center align-items-center">
        <div>
          <h1 className="d-flex justify-content-center align-items-center">A1</h1>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="no-border" style={{ width: '500px' }}>
              <Input
                placeholder="Search..."
                style={{ backgroundColor: 'white' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                <tr key={index} onClick={() => handleResultClick(item)}>
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
