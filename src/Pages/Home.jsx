import React from 'react'
import { Row, Container} from 'react-bootstrap'
import Product from '../Components/products'
import { products } from '../Data/cardItem'
import ImageSlider from '../Components/Home/ImageSlider'
import ProductCard from '../Components/Home/ProductCard'
import MainSlider from '../Components/Home/MainSlider'

const Home = () => {

  return (
    <div className='bg-light w-100 d-flex flex-column justify-content-center align-i'>

      <Container >
        {/* <Row className='w-100 mx-auto'>
          <Col> */}
            <MainSlider />
          {/* </Col>
        </Row> */}
      </Container>
      <Container fluid>

        <Row className='mt-3 mb-5' >
          <h1 className='text-center text-primary p-3'>Menu</h1>
          <div className='d-flex gap-3 flex-wrap mt-3 justify-content-sm-center ' id="products">
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
      {/* <Intro /> */}
      <div className='bg-white h-100'>
      <ImageSlider />
      </div>
    </div>
  )
}

export default Home