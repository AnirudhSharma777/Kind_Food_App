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
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { SignUp } from '../Services/operation/authApi';
import { toast } from 'react-hot-toast';
import { setSignupData } from '../Redux/slices/authSlice';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
    handleClose();
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
    <Container>

      <Button onClick={handleShow} variant="outline-primary" className='shadow'>Signup</Button>
      <Modal
        show={show} onHide={handleClose}
        className='back' closeButton
      >
        <Modal.Header closeButton>
          <h2 >Sign Up</h2>
        </Modal.Header>
        <Row className="justify-content-center">
          <Col>
            <ModalBody>

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

                <Form.Group controlId="password" className="mb-3 ">
                  <Form.Label>Password</Form.Label>
                  <div className='d-flex gap-2'>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    value={password}
                    name='password'
                    onChange={handleOnChange}
                    placeholder="Enter password"
                  />
                  <div onClick={() => setShowPassword((prev) => !prev)} style={{position:'absolute', right:'30px',  }}>

                    {
                      !showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                      ) :
                        (
                          <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )
                    }

                  </div>
                  </div>
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <div className='d-flex gap-2'>
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    name='confirmPassword'
                    onChange={handleOnChange}
                    placeholder="Enter password"
                  />
                  <div onClick={() => setShowConfirmPassword((prev) => !prev)} style={{position:'absolute', right:'30px',  }}>

                    {
                      !showConfirmPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                      ) :
                        (
                          <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )
                    }

                  </div>
                  </div>
                </Form.Group>
                <Button type="submit" variant="primary" block >
                  Sign Up
                </Button>
              </Form>
              <div className="text-center mt-4 ">
                <p className="text-muted">
                  Already have an account?
                  {/* <Link to={<Login/>}>
                  SignUp
                  </Link> */}
                  <a href="#">Login</a>
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