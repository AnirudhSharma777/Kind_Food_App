import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Aside from './Aside';
import SubCard from './subCard';

function RecipeCard() {
  return (
    <Container>
      <Row>
        <Col md={9} className='mt-3'>
        <h2>Posts</h2>
        <SubCard/>
        </Col>
        <Col md={3} className='mt-3'>
        <h2>Ingredients</h2>
        <Aside/>
        </Col>
      </Row>
    </Container>
  );
}

export default RecipeCard;