import React from 'react'
import { Row, Container, Carousel,Col } from 'react-bootstrap'
import third from '../assets/Frame1.mp4'
import fourth from '../assets/Frame2.mp4'
import first from '../assets/Frame4.mp4'
import second from '../assets/Frame3.mp4'
import Product from '../Components/products'
import CardItem from '../Components/cardItem'
import { products } from '../Data/cardItem'
import ImageSlider from '../Components/Home/ImageSlider'
import Intro from '../Components/About/Intro'
import ProductCard from '../Components/Home/ProductCard'

const Home = () => {

  return (
    <div className='bg-light w-100'>

      <>
        <Row className='w-100 mx-auto h-25'>
            <Carousel>
              <Carousel.Item interval={500}>
                <video autoPlay muted loop className="d-block w-100 " src={second} alt="first" />
              </Carousel.Item>
              <Carousel.Item interval={500}>
                <video autoPlay muted loop className="d-block w-100" src={third} alt="first" />
              </Carousel.Item >
              <Carousel.Item interval={500}>
                <video autoPlay muted loop className="d-block w-100" src={fourth} alt="first" />
              </Carousel.Item>
              <Carousel.Item interval={500}>
                <video autoPlay muted loop className="d-block w-100" src={first} alt="first" />
              </Carousel.Item>
            </Carousel>
        </Row>
      </>
      <Container fluid>

        <Row className='mt-3 mb-5' >
          <h1 className='text-center text-primary p-3'>Menu</h1>
          <div className='d-flex gap-3 flex-wrap mt-3 justify-content-sm-center '>
            {
              products.map((items) => (
                <div key={items.id} className='mt-4 mb-4'>
                  <h4 className='text-dark p-2 '>{items.tag}</h4>
                  <div className='d-flex gap-3 flex-wrap'>
                    {
                      items.dishes.map((item, i) => (

                        <ProductCard key={i} item={item} />
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </Row>
      </Container>
      <Product />
      <Intro/>
      <ImageSlider/>
    </div>
  )
}

export default Home