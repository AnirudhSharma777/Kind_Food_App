import React, { useState } from 'react';
import { Form, Button, Modal, ModalBody } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from 'react-icons/fa';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import  {SignIn} from '../Services/operation/authApi'
import {setLoginData} from '../Redux/slices/authSlice'
import toast from 'react-hot-toast';

function Login({ open, onOpen, onClose, onSwitchToSignup }) {

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
    dispatch(setLoginData(formData))
    SignIn(formData).then(() =>{
      toast.success('login successfully');
      onClose();
      navigate('/');
    }).catch((error) =>{
      toast.error(error.response.data.message);
    })
  }



  return (
    <>
    <Button onClick={onOpen} variant="outline-primary" size="sm">Sign in</Button>
    <Modal
      show={open} onHide={onClose}
      aria-labelledby="sign-in-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="sign-in-title">Welcome back</Modal.Title>
      </Modal.Header>
      <ModalBody>
            <p className="text-muted mb-4">Sign in to continue to your account.</p>
            <Form onSubmit={handleOnSubmit}>
              <Form.Group className="mb-3" controlId="sign-in-email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    name='email'
                    onChange={handleOnChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="sign-in-password">
                  <Form.Label>Password</Form.Label>
                  <div className="password-field">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    name="password"
                    onChange={handleOnChange}
                  />
                  <button type="button" className="password-toggle" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((prev) => !prev)}>
                  {
                    !showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) :
                      (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                      )
                  }
                  </button>
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
                <Button type="submit" variant="primary" className="w-100">
                  Sign In
                </Button>
              </Form>
              <div className="text-center mt-4">
                <p className="text-muted">
                  Don't have an account? 
                  {/* <Link to={<Signup/>}>
                  SignUp
                  </Link> */}
                  <button type="button" className="btn btn-link p-0 align-baseline" onClick={onSwitchToSignup}>Sign up</button>
                </p>
                <p className="text-muted">
                  Forgot your password? <button type="button" className="btn btn-link p-0 align-baseline">Reset password</button>
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
      </Modal>
      </>
  );
}

export default Login