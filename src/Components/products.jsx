import React from 'react'
import { Container, Row,Col } from 'react-bootstrap'
import img1 from '../assets/Apple.png'
import img2 from '../assets/dessart.webp'
import img3 from '../assets/Avocado.webp'
import img4 from '../assets/bakery.webp'
import img5 from '../assets/seafood.webp'
import img6 from '../assets/soups.png'
import RecipeCard from './RecipeCard'


const products = () => {


    const category = [
        {
            id: 1,
            title: "Healthy",
            image: img1 ,
            link:'#healthy'
        },
        {
            id: 2,
            title: "Desserts",
            image: img2,
            link:'#desserts'
        },
        {
            id: 3,
            title: "Vegetarian",
            image: img3,
            link:'#vegetarian'
        },
        {
            id: 4,
            title: "Bakery",
            image: img4,
            link:'#bakery'
        },
        {
            id: 5,
            title: 'Seafood',
            image: img5,
            link:'#sea-food'
        },
        {
            id: 6,
            title: "Soups",
            image: img6,
            link:'#soups'
        },
    ]
    return (
        <div >
            <Container className='promo-categories'>
                <Row>
                    <div className='text-center mb-4'>
                        <span className='eyebrow'>Find your favorite</span>
                        <h2 className="section-heading">Popular categories</h2>
                    </div>
                    <Col className="pb-4">
                        <div className='category-list'>
                        {
                            category.map((item,id) => {
                                return (
                                    <a className='category-link' key={id} href={item.link}>
                                            <img className='img' src={item.image} alt="category" />
                                            <span>{item.title}</span>
                                    </a>
                                )
                            })
                        }
                        </div>
                    </Col>

                </Row>
            </Container>
            <div className='mt-5 mb-4'>
                <Container fluid>
                    <RecipeCard />
                </Container>
            </div>
        </div>
    )
}

export default products