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
import { FaPhoneAlt, FaAddressBook } from "react-icons/fa";

const Contact = () => {
  return (
    <Container fluid>

      <Row className=" d-flex flex-sm-column justify-content-center ">
        <Col className="col-12 d-flex flex-md-column flex-lg-row flex-column justify-content-center">
          <img src="https://img.freepik.com/free-vector/food-delivery-service-abstract-concept-illustration-online-food-order-24-7-service-pizza-sushi-online-menu-payment-options-no-contact-delivery-download-app_335657-3507.jpg?t=st=1719923224~exp=1719926824~hmac=43f5ef400b255655f9b41269744a785045222a9da13c60eba8339e2cc3ab6010&w=740" alt="" width={700} className="img-fluid" />
          <div className="d-flex flex-column mt-5 justify-content-center align-items-center">
            <div className="w-75 mt-5">
              <p> <strong>24/7 Services</strong> </p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima laboriosam voluptatem temporibus commodi, expedita ad. Sapiente fuga minima eligendi sint eius obcaecati perspiciatis voluptate mollitia tempora dolor, odio dignissimos nostrum!</p>
            </div>
            <div className="w-75 mt-5">
              <p> <strong>24/7 Services</strong> </p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima laboriosam voluptatem temporibus commodi, expedita ad. Sapiente fuga minima eligendi sint eius obcaecati perspiciatis voluptate mollitia tempora dolor, odio dignissimos nostrum!</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className=" w-100 col-6 mt-5 mb-5 d-flex justify-content-center align-items-center">
          <Card className="shadow w-75">
            <CardBody>
              <CardTitle>Contact Us</CardTitle>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <MdAttachEmail />
                  <strong>Email:</strong>
                  <a href="mailto:support@fooddeliveryapp.com">
                    support@fooddeliveryapp.com
                  </a>
                </ListGroupItem>
                <ListGroupItem>
                  <FaPhoneAlt />
                  <strong>Phone:</strong>
                  <a href="tel:123-456-7890">123-456-7890</a>
                </ListGroupItem>
                <ListGroupItem>
                  <FaAddressBook />
                  <strong>Address:</strong>
                  <p>123 Main St, Anytown, India 12345</p>
                </ListGroupItem>
              </ListGroup>
              <Button variant="primary" href="#">
                Get in Touch
              </Button>
            </CardBody>
          </Card>

        </Col>
      </Row>

    </Container>
  );
};

export default Contact;