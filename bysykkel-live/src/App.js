import React from 'react';
import Layout from "./components/Layout";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Map from "./components/map";



function App() {
  return (
    <Layout>
        <Row className="justify-content-md-center">
          <Col sm={12}>
              <Map/>
          </Col>
        </Row>
    </Layout>
  );
}

export default App;
