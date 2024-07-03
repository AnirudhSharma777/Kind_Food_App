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
            title: "Dessarts",
            image: img2,
            link:'#dessart'
        },
        {
            id: 3,
            title: "Vegitarians",
            image: img3,
            link:'#vegitarians'
        },
        {
            id: 4,
            title: "Bakery",
            image: img4,
            link:'#bakery'
        },
        {
            id: 5,
            title: 'Sea-Food',
            image: img5,
            link:'#seafood'
        },
        {
            id: 6,
            title: "Soups",
            image: img6,
            link:'#soup'
        },
    ]
    return (
        <div >
            <Container fluid>
                <Row>
                    <h2 className="h1 mb-4 pb-3 text-center">Popular categories</h2>
                    <Col className="pb-4 d-flex justify-content-evenly flex-wrap gap-5" data-simplebar data-simplebar-auto-hide="false">
                        {
                            category.map((item,id) => {
                                return (
                                    <p className='d-flex flex-row gap-2' key={id}>
                                        <a href={item.link} className='d-flex flex-column justify-content-center'>
                                            <img className='img' src={item.image} alt="category" />
                                            <span className='ms-3'>{item.title}</span>
                                        </a>
                                    </p>
                                )
                            })
                        }
                    </Col>

                </Row>
            </Container>
            <div className='mt-5 mb-4'>
                <Container fuild>
                    <RecipeCard />
                </Container>
            </div>
        </div>
    )
}

export default products