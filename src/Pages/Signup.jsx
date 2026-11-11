import { useState } from 'react';
import {
  Form,
  Button,
  Modal,
  ModalBody,
} from "react-bootstrap";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { SignUp } from '../Services/operation/authApi';
import { toast } from 'react-hot-toast';
import { setSignupData } from '../Redux/slices/authSlice';

function Signup({ open, onOpen, onClose, onSwitchToLogin }) {


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }


  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
    }

    console.log("formdata -> ",signupData);
    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    SignUp(formData,navigate);
    onClose();
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  }
  
  // console.log(formData);
  return (
    <>
      <Button onClick={onOpen} variant="outline-primary" size="sm">Sign up</Button>
      <Modal
        show={open} onHide={onClose}
        aria-labelledby="sign-up-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="sign-up-title">Create your account</Modal.Title>
        </Modal.Header>
        <ModalBody>
              <p className="text-muted mb-4">A few details and you’ll be ready to order.</p>
              <Form onSubmit={handleOnSubmit}>
                <Form.Group controlId="firstName" className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    name='firstName'
                    onChange={handleOnChange}
                    placeholder="Enter first name"
                  />
                </Form.Group>
                <Form.Group controlId='lastName' className='mb-3'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    name='lastName'
                    onChange={handleOnChange}
                    placeholder="Enter last name"
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    name='email'
                    onChange={handleOnChange}
                    placeholder="Enter email"
                  />
                </Form.Group>

                {/* <Form.Group controlId="phone" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    value={phoneNumber}
                    name='phoneNumber'
                    onChange={handleOnChange}
                    placeholder="Enter phone number"
                  />
                </Form.Group> */}

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <div className='password-field'>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={password}
                    name='password'
                    onChange={handleOnChange}
                    placeholder="Enter password"
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

                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <div className='password-field'>
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    name='confirmPassword'
                    onChange={handleOnChange}
                    placeholder="Enter password"
                  />
                  <button type="button" className="password-toggle" aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"} onClick={() => setShowConfirmPassword((prev) => !prev)}>

                    {
                      !showConfirmPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                      ) :
                        (
                          <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )
                    }

                  </button>
                  </div>
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">
                  Sign Up
                </Button>
              </Form>
              <div className="text-center mt-4 ">
                <p className="text-muted">
                  Already have an account?
                  {/* <Link to={<Login/>}>
                  SignUp
                  </Link> */}
                  <button type="button" className="btn btn-link p-0 align-baseline" onClick={onSwitchToLogin}>Sign in</button>
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
      </Modal>
    </>
  );
}

export default Signup;