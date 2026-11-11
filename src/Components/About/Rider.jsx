import React from 'react'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import cooking from '../../assets/main.jpg'
import delivery from '../../assets/bikeRider.jpg'

const Rider = () => {
    return (
        <section className='about-hero'>
            <Container>
                <Row className='align-items-center g-4'>
                    <Col md={6} lg={5} className='order-2 order-md-1'>
                        <span className='eyebrow'>A little about King Food</span>
                        <h1>Good food should feel like coming home.</h1>
                        <p className='about-hero-copy mt-3'>We bring the comfort of a thoughtfully made meal to your everyday. Fresh ideas from our kitchen, delivered with a little extra care.</p>
                        <div className='d-flex flex-wrap gap-2 mt-4'>
                            <Button as={Link} to='/#products' variant='primary'>Explore the menu</Button>
                            <Button as={Link} to='/contact' variant='outline-light'>Talk to our team</Button>
                        </div>
                        <div className='about-trust-row mt-4'>
                            <span className='about-trust-mark'>✦</span>
                            <span>Thoughtful ingredients <b>·</b> Friendly delivery</span>
                        </div>
                    </Col>
                    <Col md={6} lg={{ span: 6, offset: 1 }} className='order-1 order-md-2'>
                        <div className='about-gallery'>
                            <img src={cooking} alt='A home cook preparing a fresh meal' className='about-rider about-gallery-primary' />
                            <div className='about-image-note'>
                                <span className='about-note-icon'>✦</span>
                                <span><strong>Made with care</strong><small>From our kitchen to your table</small></span>
                            </div>
                            <img src={delivery} alt='A King Food delivery rider' className='about-rider about-gallery-secondary' />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Rider