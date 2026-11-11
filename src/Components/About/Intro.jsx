import React from 'react'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import author from '../../assets/main.jpg'

const Intro = () => {
  return (
    <Container className='about-intro'>
      <Row className='founder-card align-items-center g-4'>
        <Col xs={12} md={5} className='founder-photo-col'>
          <div className='founder-photo-wrap'>
            <Image src={author} alt='Sam, founder of King Food, cooking at home' className='founder-photo' />
            <span className='founder-photo-note'>A little more joy at every table</span>
          </div>
        </Col>
        <Col xs={12} md={7} className='founder-copy'>
          <span className='eyebrow'>A note from our founder</span>
          <h2 className='section-heading'>Hi, I’m Sam</h2>
          <p className='founder-lead'>Home cook, food lover, and founder of King Food.</p>
          <p className='founder-story'>Every great food story starts around a table. We created King Food to make it easier to share a comforting, delicious meal with the people you love.</p>
          <Button as={Link} to='/contact' className='founder-button'>Get to know us</Button>
        </Col>
      </Row>
    </Container>

  )
}

export default Intro