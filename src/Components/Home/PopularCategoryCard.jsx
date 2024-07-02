// import React, { useRef, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Row, Col, Card } from "react-bootstrap";

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/effect-cube';
// import 'swiper/css/pagination';

// import './PopularCategoryCard.css'

// // import required modules
// import { EffectCube, Pagination } from 'swiper/modules';

// export default function PopularCategoryCard() {

//     const recipes = [
//         {
//             image:
//                 "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFN3ZWV0JTIwQ3JlYW0lMjBDdXBjYWtlfGVufDB8fDB8fHww",
//             title: "Sweet Cream Cupcake",
//             author: "Amalie Mayer",
//         },
//         {
//             image:
//                 "https://media.istockphoto.com/id/1371994396/photo/delicious-egg-muffins-with-green-onions-bacon-cheese-and-tomatoes-on-wooden-board-on-old.webp?b=1&s=170667a&w=0&k=20&c=aYsaeX8h0w8s_E_nA22Pz-v66LGIKR6u6MygrkkCOro=",
//             title: "Egg Muffins",
//             author: "Amalie Mayer",
//         },
//         {
//             image:
//                 "https://media.istockphoto.com/id/1444282976/photo/the-concept-of-healthy-tasty-desserts-tropical-chia-pudding-with-mango-flavor-in-a-glass.webp?b=1&s=170667a&w=0&k=20&c=yg0mzf_Z2YpmqpO6XiAp8IsO8kD86_TAfFqxvEDEzM0=",
//             title: "Mango Yogurt",
//             author: "Amalie Mayer",
//         },
//     ];

//     return (
//         <>
//             <Swiper
//                 effect={'cube'}
//                 grabCursor={true}
//                 cubeEffect={{
//                     shadow: true,
//                     slideShadows: true,
//                     shadowOffset: 20,
//                     shadowScale: 0.94,
//                 }}
//                 pagination={true}
//                 modules={[EffectCube, Pagination]}
//                 className="mySwiper"
//             >
//                 <SwiperSlide>
//                     <Row xs={1} md={2} lg={3} className="g-3 d-flex flex-row">
//                         {recipes.map((recipe, index) => (
//                             <Col key={index} className="w-100">
//                                 <Card className="d-flex flex-row">
//                                     <Card.Img
//                                         variant="top"
//                                         src={recipe.image}
//                                         className="w-75 aside-img"
//                                         style={{ objectFit: "cover" }}
//                                     />
//                                     <Card.Body>
//                                         <Card.Title className="fs-6">{recipe.title}</Card.Title>
//                                         {/* <Card.Text>By {recipe.author}</Card.Text> */}
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         ))}
//                     </Row>
//                 </SwiperSlide>

//             </Swiper>
//         </>
//     );
// }
