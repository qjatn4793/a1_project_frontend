import React from "react";
import { useNavigate } from 'react-router-dom';
import SearchBar from "components/SearchBar/SearchBar";
import {
  Container,
  Row
} from "reactstrap";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Container style={{ marginTop: '15%' }}>
      <Row className="justify-content-center align-items-center">
        <a href="#" onClick={() => navigate('/a1_bot/dashboard')} style={{ color: 'white' }} className="d-flex justify-content-center align-items-center">
        {/* <a href="#" onClick={() => navigate('/')} style={{ color: 'white' }} className="d-flex justify-content-center align-items-center"> */}
          <h1><b>A</b><b style={{ opacity: '0.7' }}>ssistance</b> <b>1</b><b style={{ opacity: '0.7' }}>step</b></h1>
        </a>
      </Row>
      <Row className="justify-content-center align-items-center">
        <SearchBar></SearchBar>
      </Row>
      <p className="text-center">관심 기업을 입력하거나 RFP 파일을 드래그 해보세요!</p>
    </Container>
  );
}

export default Dashboard;
