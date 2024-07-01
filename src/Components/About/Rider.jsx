import React from 'react'
import leftSide from '../../assets/bikeRider.jpg'
import rightSide from '../../assets/bikeRider2.jpeg'
import { Row, Col, Container } from 'react-bootstrap'
const Rider = () => {
    return (
        <Container>
            <Row className='d-flex justify-content-between about-main  '>
                <Col md={3} className='d-flex align-self-start' >
                    <img src={leftSide} alt="rider" width={300} />
                </Col>
                <Col md={4} className='d-flex flex-column align-self-center '>
                    <h1 className='text-primary'>Our goals. Our mission.</h1>
                    <h5>To Deliver Food With In Time</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores fugit in, aspernatur harum nesciunt illum. Ratione magni tempore nam quis ad a nostrum, vitae error ducimus dolorem, accusantium, asperiores odio?</p>
                </Col>
                <Col md={3} className='d-flex align-self-end'>
                    <img src={rightSide} alt="rider" />
                </Col>
            </Row>
        </Container>
    )
}

export default Rider