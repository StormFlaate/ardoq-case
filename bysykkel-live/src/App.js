import './App.css';
import React from 'react';
import styled from 'styled-components';
import Layout from "./components/Layout";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Map from "./components/map";



function App() {
  return (
    <Layout>
        <Row className="justify-content-md-center">
          <Col sm={10}>
            <Map id="1" lat="10" lng="10">

            </Map>
            </Col>
        </Row>
    </Layout>
  );
}

export default App;
