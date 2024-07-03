import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal, ModalBody } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from 'react-icons/fa';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import  {login} from '../Services/operation/authApi'

function Login() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {email, password } = formData;
  
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name] : e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email,password, navigate));
  }

  return (
    <Container >
      <Button onClick={handleShow} variant="outline-primary" >SignIn</Button>
      <Modal
       show={show} onHide={handleClose}
        className='back' closeButton
      >
        <Modal.Header closeButton>
          <h2 >Sign In</h2>
        </Modal.Header>
        <Row className="justify-content-center">
          <Col>
            <ModalBody>
              <Form onSubmit={handleOnSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    name='email'
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    name="password"
                    onChange={handleOnChange}
                  />
                  <div >
                  {
                    showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) :
                      (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                      )
                  }
                  </div>
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
                  Don't have an account? 
                  {/* <Link to={<Signup/>}>
                  SignUp
                  </Link> */}
                  <a href="#">Signup</a>
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
            </ModalBody>
          </Col>
        </Row>

      </Modal>
    </Container>
  );
}

export default Login