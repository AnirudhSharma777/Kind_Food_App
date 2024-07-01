import React from "react";
import { Container, ListGroup, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";

function Aside() {
  const recipes = [
    {
      image:
        "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFN3ZWV0JTIwQ3JlYW0lMjBDdXBjYWtlfGVufDB8fDB8fHww",
      title: "Sweet Cream Cupcake",
      author: "Amalie Mayer",
    },
    {
      image:
        "https://media.istockphoto.com/id/1371994396/photo/delicious-egg-muffins-with-green-onions-bacon-cheese-and-tomatoes-on-wooden-board-on-old.webp?b=1&s=170667a&w=0&k=20&c=aYsaeX8h0w8s_E_nA22Pz-v66LGIKR6u6MygrkkCOro=",
      title: "Egg Muffins",
      author: "Amalie Mayer",
    },
    {
      image:
        "https://media.istockphoto.com/id/1444282976/photo/the-concept-of-healthy-tasty-desserts-tropical-chia-pudding-with-mango-flavor-in-a-glass.webp?b=1&s=170667a&w=0&k=20&c=yg0mzf_Z2YpmqpO6XiAp8IsO8kD86_TAfFqxvEDEzM0=",
      title: "Mango Yogurt",
      author: "Amalie Mayer",
    },
  ];

  return (
    <aside className=" py-3">
      <Container>
        <ListGroup>
          <ListGroup.Item>
            <span className="me-2">
              <i className="bi bi-apple"></i>
            </span>
            Apple <span className="text-muted">(23)</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="me-2">
              <i className="bi bi-banana"></i>
            </span>
            Banana <span className="text-muted">(14)</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="me-2">
              <i className="bi bi-berry"></i>
            </span>
            Berries <span className="text-muted">(7)</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="me-2">
              <i className="bi bi-carrot"></i>
            </span>
            Cabbage <span className="text-muted">(19)</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="me-2">
              <i className="bi bi-lemon"></i>
            </span>
            Citrus <span className="text-muted">(28)</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="me-2">
              <i className="bi bi-corn"></i>
            </span>
            Corn <span className="text-muted">(8)</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="me-2">
              <i className="bi bi-cucumber"></i>
            </span>
            Cucumber <span className="text-muted">(25)</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="me-2">
              <i className="bi bi-egg"></i>
            </span>
            Egg <span className="text-muted">(14)</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="me-2">
              <i className="bi bi-flower"></i>
            </span>
            Herbs <span className="text-muted">(27)</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="me-2">
              <i className="bi bi-potato"></i>
            </span>
            Potato <span className="text-muted">(29)</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="me-2">
              <i className="bi bi-tomato"></i>
            </span>
            Tomatoes <span className="text-muted">(32)</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="me-2">
              <i className="bi bi-watermelon"></i>
            </span>
            Watermelon <span className="text-muted">(4)</span>
          </ListGroup.Item>
        </ListGroup>
        <h2 className="mt-3">Popular Recipes</h2>
        <Row xs={1} md={2} lg={3} className="g-3 d-flex flex-row">
          {recipes.map((recipe, index) => (
            <Col key={index} className="w-100">
              <Card className="d-flex flex-row">
                <Card.Img
                  variant="top"
                  src={recipe.image}
                  className="w-75 aside-img"
                  style={{ objectFit: "cover"}}
                />
                <Card.Body>
                  <Card.Title className="fs-6">{recipe.title}</Card.Title>
                  {/* <Card.Text>By {recipe.author}</Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <h2 className="mb-4 mt-5">Popular tags</h2>
        <Row className=" ">
          <Col xs={6} md={6} lg={3} className="d-flex flex-wrap w-100 gap-3">
            <Badge className=" mb-2">
              #bakery
            </Badge>

            <Badge className=" mb-2">
              #cookbook
            </Badge>

            <Badge  className="mb-2">
              #cuisine
            </Badge>
            <Badge  className=" mb-2">
              #asianfood
            </Badge>
       
            <Badge  className=" mb-2">
              #tips
            </Badge>
        
            <Badge  className=" mb-3">
              #recipe
            </Badge>
        
            <Badge className=" mb-3">
              #chef
            </Badge>
         
            <Badge  className=" mb-3">
              #vegetarian
            </Badge>
          </Col>
        </Row>
        <h2 className="mb-4 mt-4">Follow me</h2>
        <div className="social-media">
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
      </Container>
    </aside>
  );
}

export default Aside;
