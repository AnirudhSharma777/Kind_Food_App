import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { Row, Container, Button, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer border-top ">
      <Container fluid className='bg-light'>
        <Row className='mb-4'>
          <Col className="col-12 col-md-4 mt-3 p-2" >
            <div className="container-fluid d-flex align-items-center">
              <Link to={'/'} className='d-flex justify-content-center align-items-center'>
              <img src={logo} alt="" srcset="" width={50} />
              <h2 className='text-primary mt-2 text-decoration-none'>FOOD</h2>
              </Link>
            </div>
            <p style={{ margin: '20px' }} className='fs-5'>Follow</p>
            
              <div className="social-media ms-4">
                <Button variant="outline-primary" className="me-2">
                  <FaFacebookF />
                </Button>
                <Button variant="outline-info" className="me-2">
                  <FaTwitter />
                </Button>


                <Button variant="outline-danger" className="me-2">
                  <FaInstagram />
                </Button>
                <Button variant="outline-secondary">
                  <FaGoogle />
                </Button>
              </div>
            
          </Col>

          <Col className="col-12 col-md-3 d-flex gap-5 mt-3 ms-2 p-2" >
            <div>
              <h5 style={{ color: '#1585fd' }}>Pages</h5>
              <div className="d-flex flex-column">
              <a href='#products'>Products</a>
                <Link to={"/about"}>About Us</Link>
                <Link to={"/contact"}>Contacts
                </Link> </div>
            </div>

            <div> <h5 style={{ color: '#1585fd' }}>Terms & Condition</h5>
              <div className="d-flex flex-column">
                <Link to={"/cooperation"}>Leagal Actions</Link>
                <Link to={"/policy"}>Policy</Link>
              </div>

            </div>
          </Col>

          <Col className="col-12 col-md-4 mt-3 p-2 gap-3">
            <p className='fs-4'>Subscribe and never miss a post!</p>
            <div class="input-group mb-3">
              <Form className='d-flex mb-2 gap-2'>
                <Form.Control type="text" placeholder="Your email..." />
                <Button variant="primary" className='text-white rounded'>Subscribe</Button>
              </Form>

              <p className='p-1'>*Subscribe to our newsletter to receive early discount offer, updates and new product info.</p>
            </div>
          </Col>
        </Row>

        <Row>
          <div className="lastItem">
            <p>&#169; All rights reserved. Made ❤️ By Anirudh & Bhumika</p>

          </div>
        </Row>
      </Container>
    </div>
  )
}

export default Footer