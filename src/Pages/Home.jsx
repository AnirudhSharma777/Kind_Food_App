import React from 'react'
import { Row, Container } from 'react-bootstrap'
import Product from '../Components/products'
import { products } from '../Data/cardItem'
import ImageSlider from '../Components/Home/ImageSlider'
import ProductCard from '../Components/Home/ProductCard'
import MainSlider from '../Components/Home/MainSlider'

const Home = () => {

  return (
    <div className='home-page'>
      <Container>
        <MainSlider />
      </Container>
      <Container className='home-menu'>
        <div className='text-center'>
          <span className='eyebrow'>Made fresh, served with care</span>
          <h2 className='section-heading'>Explore our menu</h2>
          <p className='section-intro'>Thoughtful ingredients, familiar favorites, and something delicious for every appetite.</p>
        </div>
        <Row className='mt-4 mb-5'>
          <div className='mt-3' id="products">
            {
              products.map((items) => (
                <section key={items.id} className='menu-group' id={items.tag === 'Sea-Food' ? 'sea-food' : items.tag.toLowerCase().replace(/\s+/g, '-')}>
                  <h3 className='menu-group-title'>{items.tag}</h3>
                  <div className='menu-grid'>
                    {
                      items.dishes.map((item, i) => (

                        <ProductCard key={i} item={item} category={items.tag} />
                      ))
                    }
                  </div>
                </section>
              ))
            }
          </div>
        </Row>
      </Container>
      <Product />
      <ImageSlider />
    </div>
  )
}

export default Home