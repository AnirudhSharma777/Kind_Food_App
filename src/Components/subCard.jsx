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
            id={item.category === 'Bakery' ? 'bakery' : item.category === 'Vegetarian' ? 'vegetarian' : undefined}
            className="recipe-card container-fluid d-flex flex-lg-row flex-column"
          >
            <Col md={4} lg={3}>
              <Card.Img src={item.image} alt={item.title} className="recipe-image" />
            </Col>
            <Col md={8} lg={9}>
              <Card.Body>
                <Card.Title>
                  <Badge className="rating-badge me-2">
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
