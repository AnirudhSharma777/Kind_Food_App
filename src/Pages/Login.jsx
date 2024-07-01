import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, CardBody } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
   <div className='bg'>
     <Container fluid>
      <Row className="d-flex justify-content-center align-items-center vh-100">
        <Col xs={12} md={4} lg={4} >
          <Card className='bg-transparent border-0 back' style={{color:'#f3a904'}}>
            <CardBody>
              <h2 className="text-center mb-4">Sign In</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                </Form.Group>
                <Button type="submit" variant="primary" block>
                  Sign In
                </Button>
              </Form>
              <div className="text-center mt-4">
                <p className="text-muted">
                  Don't have an account? <a href="#">Sign up</a>
                </p>
                <p className="text-muted">
                  Forgot your password? <a href="#">Reset password</a>
                </p>
                <div className="social-media">
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
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
   </div>
  );
}

export default Login