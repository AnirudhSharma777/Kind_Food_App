import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import CardDetails from './CardDetails';


export default function ProductCard(props) {
  const { item, category } = props;
  return (
    <Card className="product-card">
      <div className="product-image-frame">
        <Card.Img src={item.image.trim()} alt={item.heading} className="product-image" />
        {category && <span className="product-category">{category}</span>}
        <Badge className="rating-badge">{item.rating}</Badge>
      </div>
      <Card.Body>
        <Card.Title>{item.heading}</Card.Title>
        <Card.Text className="product-description">{item.description}</Card.Text>
        <div className="product-card-footer">
          <div className="product-price">
            <span>Price</span>
            <strong>{item.price}</strong>
          </div>
          <span className="product-time">{item.time}</span>
        </div>
        <CardDetails props={item} category={category} />
      </Card.Body>
    </Card>
  );
}