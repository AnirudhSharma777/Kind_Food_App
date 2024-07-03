import React from 'react'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import author from '../../assets/main.jpg'

const Intro = () => {
  return (
    <Container className='p-5 mx-auto'>
      <Row className='gap-5 d-flex justify-content-center align-items-center flex-lg-row flex-md-column flex-sm-column'>
        <Col className='d-flex justify-content-center align-items-center'>
          <Image src={author} roundedCircle className='Intro shadow' />
        </Col>
        <Col className='d-flex flex-column gap-3 justify-content-center align-items-center text-center'>
          <h1 className='text-primary fs-4'>Hi! I am Sam</h1>
          <p>Amateur chef and creator of this blog</p>
          <p>Lorem, ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, pariatur.</p>
          <Button className='shadow'>
            Get to Know me better
          </Button>
        </Col>
      </Row>
    </Container>

  )
}

export default Intro