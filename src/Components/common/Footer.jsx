import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { Row, Container, Button, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <Container>
        <Row className='g-4'>
          <Col xs={12} md={5} lg={4}>
            <Link to='/' className='brand-lockup d-inline-flex text-decoration-none'>
              <img src={logo} alt="" />
              <span>Food</span>
            </Link>
            <p className='mt-3 mb-3'>Good food, thoughtfully made. Find your next favorite and enjoy it at home.</p>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" className="social-link" aria-label="Facebook"><FaFacebookF /></Button>
              <Button variant="outline-secondary" className="social-link" aria-label="Twitter"><FaTwitter /></Button>
              <Button variant="outline-secondary" className="social-link" aria-label="Instagram"><FaInstagram /></Button>
              <Button variant="outline-secondary" className="social-link" aria-label="Google"><FaGoogle /></Button>
            </div>
          </Col>

          <Col xs={6} md={3} lg={2}>
            <h5>Explore</h5>
            <div className="footer-links">
              <Link to='/'>Home</Link>
              <a href='/#products'>Menu</a>
              <Link to='/about'>About us</Link>
              <Link to='/contact'>Contact</Link>
              <Link to='/faq'>Help & FAQ</Link>
            </div>
          </Col>

          <Col xs={6} md={4} lg={2}>
            <h5>Information</h5>
            <div className="footer-links">
              <Link to='/cooperation'>Legal actions</Link>
              <Link to='/policy'>Privacy policy</Link>
            </div>
          </Col>

          <Col xs={12} lg={4}>
            <h5>Stay in the know</h5>
            <p className='mb-3'>Get occasional updates, new dishes, and early offers.</p>
            <Form className='newsletter-form'>
              <Form.Control type="email" placeholder="Your email address" aria-label="Your email address" />
              <Button variant="primary" type="submit">Subscribe</Button>
            </Form>
          </Col>
        </Row>

        <div className="footer-bottom d-flex flex-column flex-sm-row justify-content-between gap-2">
          <span>© {new Date().getFullYear()} King Food. All rights reserved.</span>
          <span>Made for good meals and better moments.</span>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
