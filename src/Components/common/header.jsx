import React from 'react'
import { Navbar, Nav, Button, Container, NavDropdown } from 'react-bootstrap';
import logo from '../../assets/logo.png'
import Signup from '../../Pages/Signup'
import Login from '../../Pages/Login'
import { FaShoppingCart } from "react-icons/fa"
import { MDBBadge } from 'mdb-react-ui-kit';
import { useSelector} from 'react-redux';

export const Header = () => {

    const {cart} = useSelector((state) => state);

    return (
        <Navbar className='' expand="lg">
            <Container fluid className='d-flex  justify-content-lg-between align-item-center'>
                <Navbar.Brand href='/'>
                    <div className='d-flex align-item-end'>
                        <img className='image' src={logo} alt="" />
                        <h1 className='text-primary'>Food</h1>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id='basic-navbar-nav' >
                    <Nav className="ms-auto gap-lg-4 justify-content-md-end mt-2">
                        <Nav.Link href={"/"}>Home</Nav.Link>
                        <Nav.Link href='/about'>About</Nav.Link>
                        <NavDropdown title="Categories" id='basic-nav-dropdown' >
                            <NavDropdown.Item href="#action/3.1">Healthy</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Dessarts
                            </NavDropdown.Item>

                            <NavDropdown.Item href="#action/3.3">Sea Food</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Breads</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Vegetrains
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Soups</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href='/contact'>Contact</Nav.Link>
                        <NavDropdown.Divider />

                        
                        <div className='d-flex gap-3 me-3'>
                        <Nav.Link eventKey="link-event-key" href='/carts'>
                            <div>
                                <FaShoppingCart className='fs-4 mb-2' />
                                <MDBBadge color='primary'  className='position-absolute translate-middle z-3'>
                                    {cart.length}
                                </MDBBadge>
                            </div>
                        </Nav.Link>
                            <Signup />
                            <Login />
                        </div>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

