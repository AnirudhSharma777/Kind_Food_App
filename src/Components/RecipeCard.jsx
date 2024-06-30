import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import { FaClock, FaCalendarDay, FaComment } from 'react-icons/fa';
import Aside from './Aside';


function RecipeCard() {
  return (
    <Card className="mb-3 container ">
      <Row className="">
        <Col md={9}>
          <Row>
            <Col md={3}>
              <Card.Img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" className="img-fluid rounded-start" alt="..." />
            </Col>
            <Col md={6}>
              <Card.Body>
                <Card.Title>
                  <Badge bg="success" className="me-2">Vegetarian</Badge>
                  Vegan Bowl With Avocado, Cabbage And Quinoa
                </Card.Title>
                <Card.Text>
                  Find aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Et harum quidem rerum
                  facilis est et expedita distinctio.
                </Card.Text>
                <div className="d-flex align-items-center">
                  <FaClock className="me-2" />
                  <Card.Text>17 min - 4-6 portions</Card.Text>
                </div>
                <div className="d-flex align-items-center">
                  <FaCalendarDay className="me-2" />
                  <Card.Text>Oct 9</Card.Text>
                  <FaComment className="me-2" />
                  <Card.Text>3</Card.Text>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Col>
        <Col>
         <Aside/>
        </Col>
      </Row>
    </Card>
  );
}

export default RecipeCard;