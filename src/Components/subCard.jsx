import React from "react";
import { Card, Badge, Row, Col, Container } from "react-bootstrap";
import { FaClock, FaCalendarDay, FaComment } from "react-icons/fa";
import { recipeCardData } from "../Data/recipecard"

function subCard() {
  return (
    <Container>
      <Row className="">
        {recipeCardData.map((item) => (
          <Card
            key={item.id}
            className="mt-3 container-fluid d-flex flex-lg-row flex-xxl-row flex-sm-column "
          >
            <Col md={3}>
              <Card.Img src={item.image} alt="..." className="mt-3 mb-3" />
            </Col>
            <Col md={6}>
              <Card.Body>
                <Card.Title>
                  <Badge bg="success" className="me-2">
                    {item.category}
                  </Badge>
                  {item.title}
                </Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <div>
                  <div className="d-flex align-items-center">
                    <FaClock className="me-2" />
                    <Card.Text>{item.timerange}</Card.Text>
                  </div>
                  <div className="d-flex align-items-center ">
                    <FaCalendarDay className="me-2" />
                    <Card.Text className="mt-2">{item.date}</Card.Text>
                    <div className="d-flex align-items-center ms-4">
                      <FaComment className="me-2" />
                      <Card.Text>{item.comment}</Card.Text>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Col>
          </Card>
        ))}
      </Row>
    </Container>
  );
}

export default subCard;
