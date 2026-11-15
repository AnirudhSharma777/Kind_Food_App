import React from "react";
import { Badge, Button, Card, ListGroup } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle, FaLeaf } from "react-icons/fa";

const ingredients = [
  ["Apple", "23"],
  ["Banana", "9"],
  ["Berries", "50"],
  ["Cabbage", "19"],
  ["Citrus", "29"],
  ["Corn", "18"],
  ["Cucumber", "25"],
  ["Egg", "14"],
  ["Herbs", "27"],
  ["Potato", "29"],
  ["Tomatoes", "32"],
  ["Watermelon", "9"],
];

const tags = ["bakery", "cookbook", "cuisine", "asianfood", "tips", "recipe", "chef", "vegetarian"];

const featuredRecipe = {
  image: "https://media.istockphoto.com/id/1444282976/photo/the-concept-of-healthy-tasty-desserts-tropical-chia-pudding-with-mango-flavor-in-a-glass.webp?b=1&s=170667a&w=0&k=20&c=yg0mzf_Z2YpmqpO6XiAp8IsO8kD86_TAfFqxvEDEzM0=",
  title: "Mango Yogurt",
  author: "Amalie Mayer",
};

function Aside() {
  return (
    <aside className="recipe-sidebar">
      <div className="ingredient-heading">
        <span className="ingredient-heading-icon"><FaLeaf aria-hidden="true" /></span>
        <div>
          <h2 className="recipe-sidebar-title">Browse ingredients</h2>
          <p>Find a little inspiration in everyday favorites.</p>
        </div>
      </div>

      <ListGroup className="ingredient-list">
        {ingredients.map(([name, count]) => (
          <ListGroup.Item key={name}>
            <span>{name}</span>
            <Badge>{count}</Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <section className="sidebar-featured">
        <h3 className="recipe-sidebar-title">Popular recipe</h3>
        <Card className="featured-recipe-card">
          <Card.Img src={featuredRecipe.image} alt={featuredRecipe.title} />
          <Card.Body>
            <span>Reader favorite</span>
            <Card.Title>{featuredRecipe.title}</Card.Title>
            <Card.Text>By {featuredRecipe.author}</Card.Text>
          </Card.Body>
        </Card>
      </section>

      <section className="sidebar-tags">
        <h3 className="recipe-sidebar-title">Popular tags</h3>
        <div className="recipe-tags">
          {tags.map((tag) => <Badge key={tag}>#{tag}</Badge>)}
        </div>
      </section>

      <section className="sidebar-social">
        <h3 className="recipe-sidebar-title">Follow us</h3>
        <div className="social-media">
          <Button variant="outline-primary" aria-label="Facebook"><FaFacebookF /></Button>
          <Button variant="outline-info" aria-label="Twitter"><FaTwitter /></Button>
          <Button variant="outline-danger" aria-label="Instagram"><FaInstagram /></Button>
          <Button variant="outline-secondary" aria-label="Google"><FaGoogle /></Button>
        </div>
      </section>
    </aside>
  );
}

export default Aside;
