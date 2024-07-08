import React from 'react'
import { Navbar, Nav, Container, NavDropdown,Button } from 'react-bootstrap';
import logo from '../../assets/logo.png'
import Signup from '../../Pages/Signup'
import Login from '../../Pages/Login'
import { FaShoppingCart } from "react-icons/fa"
import { MDBBadge } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { logout } from '../../Services/operation/authApi';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const Header = () => {

    const navigate = useNavigate();
    const {cart} = useSelector((state) => state.cart);
    const scrolHandler = (elmRef) => {
        console.log(elmRef.current);
        window.scrollTo({ top: elmRef.current.offsetTop, behavior: 'smooth' });
    };

    const { token } = useSelector((state) => state.auth);

    const handleOnLogout = () => {
        logout(navigate).then(() =>{
            toast.success('LogOut successfully')
        }).catch((e) =>{
            toast.error('LogOut failed');
        })
    }
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
                            <NavDropdown.Item href="#healthy" onClick={() => scrolHandler()}>Healthy</NavDropdown.Item>
                            <NavDropdown.Item href="#dessarts" onClick={() => scrolHandler()}>
                                Dessarts
                            </NavDropdown.Item>

                            <NavDropdown.Item href="#seafood" onClick={() => scrolHandler()}>Sea Food</NavDropdown.Item>
                            <NavDropdown.Item href="#bakery" onClick={() => scrolHandler()}>Bakery</NavDropdown.Item>
                            <NavDropdown.Item href="#vegitarians" onClick={() => scrolHandler()}>
                                Vegitarians
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#soups" onClick={() => scrolHandler()}>Soups</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href='/contact'>Contact</Nav.Link>
                        <NavDropdown.Divider />


                        <div className='d-flex gap-3 me-3'>
                            <Nav.Link eventKey="link-event-key" href='/carts'>
                                <div>
                                    <FaShoppingCart className='fs-4 mb-2' />
                                    <MDBBadge color='primary' className='position-absolute translate-middle z-3'>
                                        {cart?.length}
                                    </MDBBadge>
                                </div>
                            </Nav.Link>
                            {
                                token === null && (
                                    <>
                                        <Signup />
                                        <Login />
                                    </>
                                )
                            }
                             {
                                token !== null && (
                                    <div className='d-flex gap-2'>
                                        <Button href='/dashboard' className='shadow mb-3'>Dashboard</Button>
                                        {/* <Button className='shadow' onClick={handleOnLogout}>LogOut</Button> */}
                                    </div>
                            )
                            }
                        </div>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

