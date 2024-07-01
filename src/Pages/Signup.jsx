import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, CardBody } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from 'react-icons/fa';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API to sign up user
    console.log('Sign up form submitted:', {
      firstName,
      lastName,
      email,
      phone,
      password,
    });
  };

  return (
    <Container fluid className="py-5 bg">
      <Row className="justify-content-center bg-transparent">
        <Col md={4} lg={5} sm={4}>
          
          <Card className='bg-transparent back'>
            <CardBody>
                <h2 className="text-center mb-4">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstName" className='mb-3'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Enter first name"
              />
            </Form.Group>

            <Form.Group controlId="lastName" className='mb-3'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Enter last name"
              />
            </Form.Group>

            <Form.Group controlId="email" className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group controlId="phone" className='mb-3'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Enter phone number"
              />
            </Form.Group>

            <Form.Group controlId="password" className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
              />
            </Form.Group>

            <Button type="submit" variant="primary" block >
                  Sign Up
                </Button>
              </Form>
              <div className="text-center mt-4 ">
                <p className="text-muted">
                  Already have an account? <a href="#">Sign In</a>
                </p>
               
                <div className="social-media mt-2">
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
  );
}

export default Signup