import React from "react";
import { Card, Badge } from "react-bootstrap";
import { FaClock, FaComment } from "react-icons/fa";
import { recipeCardData } from "../Data/recipecard"

function subCard() {
  return (
    <div className="recipe-list">
        {recipeCardData.map((item) => (
          <Card
            key={item.id}
            id={item.category === 'Bakery' ? 'bakery' : item.category === 'Vegetarian' ? 'vegetarian' : undefined}
            className="recipe-card"
          >
              <Card.Img src={item.image} alt={item.title} className="recipe-image" />
              <Card.Body className="recipe-card-body">
                <span className="recipe-card-kicker">A little kitchen inspiration</span>
                <Card.Title>
                  <span>{item.title}</span>
                  <Badge className="recipe-category-badge">{item.category}</Badge>
                </Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <div className="recipe-card-meta">
                  <span>
                    <FaClock className="me-2" />
                    {item.timerange}
                  </span>
                  <span>
                    <FaComment className="me-2" />
                    {item.comment} comments
                  </span>
                </div>
              </Card.Body>
          </Card>
        ))}
    </div>
  );
}

export default subCard;
