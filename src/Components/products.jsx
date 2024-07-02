import React from 'react'
import { Container, Row } from 'react-bootstrap'
import img1 from '../assets/Apple.png'
import img2 from '../assets/dessart.webp'
import img3 from '../assets/Avocado.webp'
import img4 from '../assets/bakery.webp'
import img5 from '../assets/seafood.webp'
import img6 from '../assets/soups.png'
import RecipeCard from './RecipeCard'

const products = () => {

     const category=[
        {
            id:1,
            title:"Healthy",
            image:{img1},
        },
        {
            id:2,
            title:"Desserts",
            image:{img2},
        },
        {
            id:3,
            title:"Vegitarians",
            image:"",
        },
        {
            id:6,
            title:"Bakery",
            image:"",
        },
        {
            id:6,
            title:"Soup",
            image:{img6}
        },
    ]
    return (
        <div >
            <Container fluid>
                <Row>
                    <h2 className="h1 mb-4 pb-3 text-center">Popular categories</h2>
                    <div className="pb-4 d-flex justify-content-evenly flex-wrap gap-5" data-simplebar data-simplebar-auto-hide="false">
                        <p className='d-flex flex-row gap-2'>
                            <a href={'/'} className='d-flex flex-column justify-content-center'>
                                <img className='img' src={img1} alt="healthy" />
                                <span className='ms-3'> Healthy</span>
                            </a>
                        </p>
                        <p className='d-flex flex-row gap-2'>
                            <a href={'/'} className='d-flex flex-column justify-content-center'>
                                <img className='img' src={img2} alt="healthy" />
                                <span className='ms-3'>Dessart</span>
                            </a>
                        </p>
                        <p className='d-flex flex-row gap-2'>
                            <a href={'/'} className='d-flex flex-column justify-content-center'>
                                <img className='img' src={img3} alt="healthy" />
                                <span className='ms-3'>Vegetarian</span>
                            </a>
                        </p>
                        <p className='d-flex flex-row gap-2'>
                            <a href={'/'} className='d-flex flex-column justify-content-center'>
                                <img className='img' src={img4} alt="healthy" />
                                <span className='ms-3'>Bakery</span>
                            </a>
                        </p>
                        <p className='d-flex flex-row gap-2'>
                            <a href={'/'} className='d-flex flex-column justify-content-center'>
                                <img className='img' src={img5} alt="healthy" />
                                <span className='ms-3'>Sea Food</span>
                            </a>
                        </p>
                        <p className='d-flex flex-row gap-2'>
                            <a href={'/'} className='d-flex flex-column justify-content-center'>
                                <img className='img' src={img6} alt="healthy" />
                                <span className='ms-3'>Soups</span>
                            </a>
                        </p>
                    </div>

                </Row>
            </Container>
            <div className='mt-5 mb-4'>
                <Container fuild>
                    <RecipeCard/>
                </Container>
            </div>
        </div>
    )
}

export default products