import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
// import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { FaPhoneAlt ,FaAddressBook} from "react-icons/fa";

const Contact = () => {
  return (
    <Container fluid>
       
      <Row className=" d-flex">
        <Col className="col-6 ">
        <img src="https://img.freepik.com/free-vector/food-delivery-service-abstract-concept-illustration-online-food-order-24-7-service-pizza-sushi-online-menu-payment-options-no-contact-delivery-download-app_335657-3507.jpg?t=st=1719923224~exp=1719926824~hmac=43f5ef400b255655f9b41269744a785045222a9da13c60eba8339e2cc3ab6010&w=740" alt="" width={700} img-fluid />
        </Col>
        <Col className="col-6 mt-5 ">
          <Card className="shadow">
            <CardBody>
              <CardTitle>Contact Us</CardTitle>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <MdAttachEmail/>
                  <strong>Email:</strong>
                  <a href="mailto:support@fooddeliveryapp.com">
                    support@fooddeliveryapp.com
                  </a>
                </ListGroupItem>
                <ListGroupItem>
                  <FaPhoneAlt/>
                  <strong>Phone:</strong>
                  <a href="tel:123-456-7890">123-456-7890</a>
                </ListGroupItem>
                <ListGroupItem>
                  <FaAddressBook/>
                  <strong>Address:</strong>
                  <p>123 Main St, Anytown, India 12345</p>
                </ListGroupItem>
              </ListGroup>
              <Button variant="primary" href="#">
                Get in Touch
              </Button>
            </CardBody>
          </Card>
          <div className="w-75 mt-5">
            <p> <strong>24/7 Services</strong> </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima laboriosam voluptatem temporibus commodi, expedita ad. Sapiente fuga minima eligendi sint eius obcaecati perspiciatis voluptate mollitia tempora dolor, odio dignissimos nostrum!</p>
          </div>
          <div className="w-75 mt-5">
            <p> <strong>24/7 Services</strong> </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima laboriosam voluptatem temporibus commodi, expedita ad. Sapiente fuga minima eligendi sint eius obcaecati perspiciatis voluptate mollitia tempora dolor, odio dignissimos nostrum!</p>
          </div>
        </Col>

      </Row>
      
    </Container>
  );
};

export default Contact;