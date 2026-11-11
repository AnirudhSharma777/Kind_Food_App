import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import food from "../../assets/foodmain.png";

const AboutCta = () => (
  <section className="about-cta">
    <Container>
      <div className="about-cta-panel">
        <div className="about-cta-copy">
          <span className="eyebrow">Your table is waiting</span>
          <h2>Make room for something delicious.</h2>
          <p>Find a new favorite, revisit a classic, and bring a little more joy to your next meal.</p>
          <div className="d-flex flex-wrap gap-2">
            <Button as={Link} to="/#products" variant="light">Explore the menu</Button>
            <Button as={Link} to="/contact" variant="outline-light">Say hello</Button>
          </div>
        </div>
        <div className="about-cta-art">
          <img src={food} alt="A colorful spread of freshly prepared food" />
          <span aria-hidden="true">Good food. Good company.</span>
        </div>
      </div>
    </Container>
  </section>
);

export default AboutCta;
