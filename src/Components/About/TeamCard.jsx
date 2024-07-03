import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { AboutUsData } from "../../Data/AboutUs";

function TeamCard() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="container mt-5 mb-5 d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-primary text-center mt-5">Our Amazing Team</h1>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="d-flex justify-content-center align-items-center img3 mt-5"
      >
        {AboutUsData.map((item, id) => {
          return (
            <Carousel.Item>
              <img
                className=" img3"
                src={item.image}
                alt="First slide"
              />
              <Carousel.Caption >
            <h3>{item.developerName}</h3>
            <strong>{item.designation}</strong>
            <p>
              {item.discription}
            </p>
          </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default TeamCard;


