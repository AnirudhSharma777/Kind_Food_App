import { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  ModalBody,
} from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API to sign up user
    console.log("Sign up form submitted:", {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword
    });
  };

  return (
    <Container>
      <Button onClick={handleShow} variant="outline-primary">Signup</Button>
      <Modal
        show={show} onHide={handleClose}
        className='back'closeButton
      >
        <Modal.Header closeButton>
        <h2 >Sign Up</h2>
        </Modal.Header>
      <Row className="justify-content-center">
        <Col>
            <ModalBody>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstName" className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder="Enter first name"
                  />
                </Form.Group>

                

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group controlId="phone" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Enter phone number"
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                  />
                </Form.Group>

                <Form.Group controlId="Confirmpassword" className="mb-3">
                  <Form.Label>ConfirmPassword</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Enter Confirm password"
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
            </ModalBody>
        </Col>
      </Row>

      </Modal>
    </Container>
  );
}

export default Example;