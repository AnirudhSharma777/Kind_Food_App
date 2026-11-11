import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Aside from './Aside';
import SubCard from './subCard';

function RecipeCard() {
  return (
    <Container>
      <Row className='recipe-layout'>
        <Col md={9} className='mt-3'>
        <span className='eyebrow'>Fresh from the kitchen</span>
        <h2 className='section-heading fs-3'>Recipes & ideas</h2>
        <SubCard/>
        </Col>
        <Col md={3} className='mt-3'>
        <h2 className='recipe-sidebar-title'>Browse ingredients</h2>
        <Aside/>
        </Col>
      </Row>
    </Container>
  );
}

export default RecipeCard;