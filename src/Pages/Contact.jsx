import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaArrowRight, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import cooking from "../assets/main.jpg";

const Contact = () => {
  const sendMessage = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const subject = encodeURIComponent(`A message from ${name}`);
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:support@fooddeliveryapp.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <Container>
          <Row className="align-items-center g-4 g-lg-5">
            <Col lg={6} className="contact-copy">
              <span className="eyebrow">We’re just a message away</span>
              <h1 className="section-heading">Let’s make something good happen.</h1>
              <p className="contact-lead">Need a hand with an order, have a question, or simply want to say hello? Our team would love to hear from you.</p>
              <a className="contact-hero-link" href="#send-message">
                Send us a message <FaArrowRight aria-hidden="true" />
              </a>
              <div className="contact-note">
                <span className="contact-note-mark">✦</span>
                <span>Real people, ready to help with your next great meal.</span>
              </div>
            </Col>
            <Col lg={6}>
              <div className="contact-art">
                <img src={cooking} alt="A cook preparing a meal in a bright kitchen" />
                <div className="contact-art-caption">
                  <span className="contact-art-icon"><MdAttachEmail /></span>
                  <span><strong>Here for you</strong><small>Questions, feedback, or a quick hello</small></span>
                </div>
                <span className="contact-art-spark contact-art-spark-one">✦</span>
                <span className="contact-art-spark contact-art-spark-two">✳</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="contact-details-section">
        <Container>
          <div className="text-center contact-section-heading">
            <span className="eyebrow">Pick what works for you</span>
            <h2 className="section-heading">Say hello your way</h2>
          </div>
          <Row className="g-3">
            <Col md={4}>
              <a className="contact-method-card" href="mailto:support@fooddeliveryapp.com">
                <span className="contact-method-icon"><MdAttachEmail /></span>
                <span className="contact-method-label">Email us</span>
                <strong>support@fooddeliveryapp.com</strong>
                <span className="contact-method-action">Write an email <FaArrowRight aria-hidden="true" /></span>
              </a>
            </Col>
            <Col md={4}>
              <a className="contact-method-card" href="tel:123-456-7890">
                <span className="contact-method-icon"><FaPhoneAlt /></span>
                <span className="contact-method-label">Give us a call</span>
                <strong>123-456-7890</strong>
                <span className="contact-method-action">Call our team <FaArrowRight aria-hidden="true" /></span>
              </a>
            </Col>
            <Col md={4}>
              <div className="contact-method-card contact-location-card">
                <span className="contact-method-icon"><FaMapMarkerAlt /></span>
                <span className="contact-method-label">Find us</span>
                <strong>123 Main St, Anytown</strong>
                <span className="contact-method-action">India 12345</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="contact-form-section" id="send-message">
        <Container>
          <Row className="justify-content-center">
            <Col lg={9}>
              <div className="contact-form-panel">
                <div className="contact-form-intro">
                  <span className="eyebrow">Drop us a line</span>
                  <h2 className="section-heading">How can we help?</h2>
                  <p>Leave us a note and we’ll open a ready-to-send email in your mail app.</p>
                </div>
                <Form onSubmit={sendMessage}>
                  <Row className="g-3">
                    <Col sm={6}>
                      <Form.Group controlId="contact-name">
                        <Form.Label>Your name</Form.Label>
                        <Form.Control name="name" type="text" placeholder="How should we address you?" autoComplete="name" required />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="contact-email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group controlId="contact-message">
                        <Form.Label>Your message</Form.Label>
                        <Form.Control name="message" as="textarea" rows={4} placeholder="Tell us what’s on your mind..." required />
                      </Form.Group>
                    </Col>
                    <Col xs={12} className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
                      <Button type="submit" variant="primary">Continue to email <FaArrowRight className="ms-2" aria-hidden="true" /></Button>
                      <span className="contact-form-hint">Your message is sent from your own email app.</span>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Contact;
