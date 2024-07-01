import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import author from '../../assets/main.jpg'
const Intro = () => {
  return (
    <Container fluid className='mt-5 mx-auto  bg-white d-flex align-items-center ' style={{height:'600px'}}>
        <Row>
            <Col lg={6}>
            <img src={author} alt="img" className='rounded ms-4' width={450} height={430} />
            </Col>
            <Col lg={6} className='gap-3 d-flex align-self-start flex-column  mt-4'>
            <h1>Hi! I am Sam</h1>
            <p>Amateur chef and creator of this blog</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus repellendus, voluptates qui dicta reiciendis harum id consequuntur aliquam aperiam quos. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, suscipit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, pariatur.</p>
            <Button className='bg-primary text-white w-50'>
                Get to Know me better
            </Button>
            </Col>
        </Row>
    </Container>
  )
}

export default Intro