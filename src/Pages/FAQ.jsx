import React from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight, FaShoppingBag } from "react-icons/fa";

const questions = [
  {
    question: "How do I add a dish to my cart?",
    answer: "Browse the menu, open a dish with “View details”, then choose “Add to Cart”. Your cart count updates immediately, and your selection stays saved on this device.",
  },
  {
    question: "Can I change quantities or remove items?",
    answer: "Yes. Open your cart to increase or decrease each dish quantity or remove an item. Your subtotal and item count update as you make changes.",
  },
  {
    question: "Will my cart still be here if I come back later?",
    answer: "Your cart is saved in this browser on this device, so it remains available after you navigate around or reload the page.",
  },
  {
    question: "How do I ask about a dish or get help?",
    answer: "Visit our Contact page to find our email and phone details, or fill out the message form to open a pre-filled email in your mail app.",
  },
  {
    question: "Does the “Order now” button submit a real order?",
    answer: "Not yet. This version is a frontend prototype: the button displays a confirmation but does not send an order to a restaurant or payment service.",
  },
];

const FAQ = () => (
  <main className="faq-page">
    <section className="faq-hero">
      <Container>
        <Row className="align-items-center g-4">
          <Col lg={8}>
            <span className="eyebrow">A few helpful answers</span>
            <h1 className="section-heading">Questions? We’ve got you.</h1>
            <p>Quick answers about browsing the menu, using your cart, and getting in touch.</p>
          </Col>
          <Col lg={4} className="text-lg-end">
            <span className="faq-hero-mark" aria-hidden="true"><FaShoppingBag /></span>
          </Col>
        </Row>
      </Container>
    </section>

    <section className="faq-content">
      <Container>
        <Row className="g-5">
          <Col lg={8}>
            <Accordion className="faq-accordion">
              {questions.map((item, index) => (
                <Accordion.Item eventKey={String(index)} key={item.question}>
                  <Accordion.Header>{item.question}</Accordion.Header>
                  <Accordion.Body>{item.answer}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
          <Col lg={4}>
            <aside className="faq-contact-card">
              <span className="faq-contact-icon"><FaArrowRight /></span>
              <h2>Still curious?</h2>
              <p>Our team would be happy to help you find an answer.</p>
              <Button as={Link} to="/contact" variant="primary">Contact our team</Button>
            </aside>
          </Col>
        </Row>
      </Container>
    </section>
  </main>
);

export default FAQ;
