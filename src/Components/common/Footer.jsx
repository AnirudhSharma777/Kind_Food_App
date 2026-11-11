import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { Row, Container, Button, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-topline" aria-hidden="true" />
      <Container className="footer-container">
        <Row className='footer-main g-4'>
          <Col xs={12} md={5} lg={4} className="footer-brand-column">
            <Link to='/' className='brand-lockup d-inline-flex text-decoration-none'>
              <img src={logo} alt="" />
              <span>Food</span>
            </Link>
            <p className='footer-brand-copy'>Good food, thoughtfully made. Find your next favorite and enjoy it at home.</p>
            <div className="footer-socials" aria-label="Social media">
              <Button variant="outline-secondary" className="social-link" aria-label="Facebook"><FaFacebookF /></Button>
              <Button variant="outline-secondary" className="social-link" aria-label="Twitter"><FaTwitter /></Button>
              <Button variant="outline-secondary" className="social-link" aria-label="Instagram"><FaInstagram /></Button>
              <Button variant="outline-secondary" className="social-link" aria-label="Google"><FaGoogle /></Button>
            </div>
          </Col>

          <Col xs={6} md={3} lg={2} className="footer-nav-column">
            <h2>Explore</h2>
            <nav className="footer-links" aria-label="Explore">
              <Link to='/'>Home</Link>
              <a href='/#products'>Menu</a>
              <Link to='/about'>About us</Link>
              <Link to='/contact'>Contact</Link>
              <Link to='/faq'>Help & FAQ</Link>
            </nav>
          </Col>

          <Col xs={6} md={4} lg={2} className="footer-nav-column">
            <h2>Information</h2>
            <nav className="footer-links" aria-label="Information">
              <Link to='/cooperation'>Legal actions</Link>
              <Link to='/policy'>Privacy policy</Link>
            </nav>
          </Col>

          <Col xs={12} lg={4} className="footer-newsletter-column">
            <div className="footer-newsletter">
              <span className="footer-newsletter-kicker">A little goodness in your inbox</span>
              <h2>Stay in the know</h2>
              <p>Get occasional updates, new dishes, and early offers.</p>
              <Form className='newsletter-form'>
                <Form.Control type="email" placeholder="Your email address" aria-label="Your email address" />
                <Button variant="primary" type="submit">Subscribe</Button>
              </Form>
            </div>
          </Col>
        </Row>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} King Food. All rights reserved.</span>
          <span>Made for good meals and better moments.</span>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
