import React from 'react'
import { Container } from 'react-bootstrap'
import { FaArrowRight } from 'react-icons/fa'
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
        <div className='home-discovery'>
            <section className='promo-categories'>
                <Container>
                    <div className='category-section-heading text-center'>
                        <span className='eyebrow'>Find your favorite</span>
                        <h2 className="section-heading">Popular categories</h2>
                        <p>Pick a craving and find something you’ll love.</p>
                    </div>
                    <div className='category-list'>
                        {
                            category.map((item) => {
                                return (
                                    <a className='category-link' key={item.id} href={item.link}>
                                            <span className='category-image-wrap'>
                                                <img className='img' src={item.image} alt="" />
                                            </span>
                                            <span className='category-link-label'>{item.title}</span>
                                            <FaArrowRight className='category-link-arrow' aria-hidden='true' />
                                    </a>
                                )
                            })
                        }
                    </div>
                </Container>
            </section>
            <section className='recipe-section'>
                <RecipeCard />
            </section>
        </div>
    )
}

export default products