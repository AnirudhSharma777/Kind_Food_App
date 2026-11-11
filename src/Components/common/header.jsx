import React, { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import logo from '../../assets/logo.png'
import Signup from '../../Pages/Signup'
import Login from '../../Pages/Login'
import { FaBars, FaShoppingBag, FaTimes } from "react-icons/fa"
import { MDBBadge } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Header = () => {
    const [activeAuthModal, setActiveAuthModal] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const {totalItems} = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const closeMenu = () => setExpanded(false);

    return (
        <Navbar className='site-header' expand="lg" expanded={expanded} onToggle={setExpanded}>
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    <div className='brand-lockup d-flex'>
                        <img src={logo} alt="" />
                        <span>Food</span>
                    </div>
                </Navbar.Brand>
                <div className='mobile-header-actions'>
                    <Nav.Link as={Link} to='/carts' className='mobile-cart-link' aria-label={`Cart, ${totalItems || 0} items`} onClick={() => setExpanded(false)}>
                        <FaShoppingBag aria-hidden='true' />
                        <MDBBadge color='primary' className='cart-count'>{totalItems || 0}</MDBBadge>
                    </Nav.Link>
                    <Button
                        type='button'
                        className='mobile-menu-toggle'
                        aria-controls='basic-navbar-nav'
                        aria-expanded={expanded}
                        aria-label={expanded ? 'Close menu' : 'Open menu'}
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? <FaTimes aria-hidden='true' /> : <FaBars aria-hidden='true' />}
                    </Button>
                </div>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <div className='mobile-nav-heading'>
                        <span>Explore King Food</span>
                        <small>Find something delicious for today.</small>
                    </div>
                    <Nav className="ms-auto" onSelect={closeMenu}>
                        <Nav.Link as={Link} to="/" onClick={closeMenu}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/#products" onClick={closeMenu}>Menu</Nav.Link>
                        <NavDropdown title="Categories" id='basic-nav-dropdown'>
                            <NavDropdown.Item href="/#healthy" onClick={closeMenu}>Healthy</NavDropdown.Item>
                            <NavDropdown.Item href="/#desserts" onClick={closeMenu}>
                                Desserts
                            </NavDropdown.Item>

                            <NavDropdown.Item href="/#sea-food" onClick={closeMenu}>Sea Food</NavDropdown.Item>
                            <NavDropdown.Item href="/#bakery" onClick={closeMenu}>Bakery</NavDropdown.Item>
                            <NavDropdown.Item href="/#vegetarian" onClick={closeMenu}>
                                Vegetarian
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/#soups" onClick={closeMenu}>Soups</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to='/contact' onClick={closeMenu}>Contact</Nav.Link>
                        <Nav.Link as={Link} to='/faq' onClick={closeMenu}>FAQ</Nav.Link>
                        <div className='site-actions d-flex'>
                            <Nav.Link as={Link} to='/carts' className='desktop-cart-link' aria-label={`Cart, ${totalItems || 0} items`}>
                                <FaShoppingBag className='cart-icon' />
                                <MDBBadge color='primary' className='cart-count'>
                                    {totalItems || 0}
                                </MDBBadge>
                            </Nav.Link>
                            {
                                token === null && (
                                    <>
                                        <Signup
                                            open={activeAuthModal === 'signup'}
                                            onOpen={() => { closeMenu(); setActiveAuthModal('signup'); }}
                                            onClose={() => setActiveAuthModal(null)}
                                            onSwitchToLogin={() => setActiveAuthModal('login')}
                                        />
                                        <Login
                                            open={activeAuthModal === 'login'}
                                            onOpen={() => { closeMenu(); setActiveAuthModal('login'); }}
                                            onClose={() => setActiveAuthModal(null)}
                                            onSwitchToSignup={() => setActiveAuthModal('signup')}
                                        />
                                    </>
                                )
                            }
                             {
                                token !== null && (
                                    <div className='d-flex gap-2'>
                                         <Button as={Link} to='/dashboard'>Dashboard</Button>
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
