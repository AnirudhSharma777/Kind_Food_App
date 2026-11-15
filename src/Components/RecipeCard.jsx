import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Aside from './Aside';
import SubCard from './subCard';

function RecipeCard() {
  return (
    <Container className='recipe-container'>
      <Row className='recipe-layout'>
        <Col lg={8} className='recipe-main-column'>
          <div className='recipe-section-heading'>
            <span className='eyebrow'>Fresh from the kitchen</span>
            <h2 className='section-heading'>Recipes & ideas</h2>
            <p>Simple inspiration for something lovely to make and share.</p>
          </div>
          <SubCard />
        </Col>
        <Col lg={4} className='recipe-sidebar-column'>
          <Aside />
        </Col>
      </Row>
    </Container>
  );
}

export default RecipeCard;