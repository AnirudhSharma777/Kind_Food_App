import React from 'react'
import upper3 from '../assets/upper3.jpg'

const Aside = () => {
    return (
        <div className="offcanvas offcanvas-collapse offcanvas-end" id="blog-sidebar">
            <div className="offcanvas-cap navbar-shadow px-4 mb-3">
                <h5 className="mt-1 mb-0">Sidebar</h5>
                <button className="btn-close lead" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body px-4 pt-3 pt-lg-0 pe-lg-0 ps-lg-2 ps-xl-4" data-simplebar>

                <div className="widget widget-categories mb-5">
                    <h3 className="widget-title">Ingredients</h3>
                    <ul>
                        <li><a className="widget-link" href="#">Apple<small className="text-muted ps-1 ms-2">23</small></a></li>
                        <li><a className="widget-link" href="#">Banana<small className="text-muted ps-1 ms-2">14</small></a></li>
                        <li><a className="widget-link" href="#">Berries<small className="text-muted ps-1 ms-2">7</small></a></li>
                        <li><a className="widget-link" href="#">Cabbage<small className="text-muted ps-1 ms-2">19</small></a></li>
                        <li><a className="widget-link" href="#">Citrus<small className="text-muted ps-1 ms-2">26</small></a></li>
                        <li><a className="widget-link" href="#">Corn<small className="text-muted ps-1 ms-2">8</small></a></li>
                        <li><a className="widget-link" href="#">Cucumber<small className="text-muted ps-1 ms-2">25</small></a></li>
                        <li><a className="widget-link" href="#">Egg<small className="text-muted ps-1 ms-2">14</small></a></li>
                        <li><a className="widget-link" href="#">Herbs<small className="text-muted ps-1 ms-2">27</small></a></li>
                        <li><a className="widget-link" href="#">Potato<small className="text-muted ps-1 ms-2">29</small></a></li>
                        <li><a className="widget-link" href="#">Tomatoes<small className="text-muted ps-1 ms-2">32</small></a></li>
                        <li><a className="widget-link" href="#">Watermelon<small className="text-muted ps-1 ms-2">4</small></a></li>
                    </ul>
                </div>

                <div className="widget mt-n1 mb-5">
                    <h3 className="widget-title pb-1">Popular recipes</h3>
                    <div className="d-flex align-items-start pb-1 mb-3">
                        <a className="d-block flex-shrink-0" href="#">
                            <img className="rounded" src={upper3} alt="Post" width="64" /></a>
                        <div className="ps-2 ms-1">
                            <h4 className="fs-md nav-heading mb-1">
                                <a className="fw-medium" href="#">Sweet Cream Cupcake</a></h4>
                            <p class="fs-xs text-muted mb-0">by Amelie Mayer</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-start pb-1 mb-3">
                        <a className="d-block flex-shrink-0" href="#">
                            <img className="rounded" src={upper3} alt="Post" width="64" /></a>
                        <div className="ps-2 ms-1">
                            <h4 className="fs-md nav-heading mb-1">
                                <a className="fw-medium" href="#">Keto Paleo Carb-Free Breakfast</a></h4>
                            <p className="fs-xs text-muted mb-0">by Amelie Mayer</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-start pb-1 mb-3">
                        <a className="d-block flex-shrink-0" href="#">
                            <img className="rounded" src={upper3} alt="Post" width="64" /></a>
                        <div className="ps-2 ms-1">
                            <h4 className="fs-md nav-heading mb-1">
                                <a className="fw-medium" href="#">Sugar-Free Coconut Yogurt with Mango</a></h4>
                            <p className="fs-xs text-muted mb-0">by Amelie Mayer</p>
                        </div>
                    </div>
                </div>

                <div className="widget mb-5">
                    <h3 className="widget-title pb-1">Popular tags</h3>
                    <a className="btn-tag me-2 mb-2" href="#">#bakery</a>
                    <a className="btn-tag me-2 mb-2" href="#">#cookbook</a>
                    <a className="btn-tag me-2 mb-2" href="#">#cuisine</a>
                    <a className="btn-tag me-2 mb-2" href="#">#asian food</a>
                    <a className="btn-tag me-2 mb-2" href="#">#tips</a>
                    <a className="btn-tag me-2 mb-2" href="#">#recipe</a>
                    <a className="btn-tag me-2 mb-2" href="#">#chef</a>
                    <a className="btn-tag me-2 mb-2" href="#">#vegetarian</a>
                </div>

                <div className="mb-5">
                    <h3 className="widget-title pb-1">Follow me</h3>
                    <a className="btn-social bs-outline bs-facebook me-2 mb-2" href="#">
                        <i className="ai-facebook"></i></a>
                    <a className="btn-social bs-outline bs-twitter me-2 mb-2" href="#">
                        <i className="ai-twitter"></i></a>
                    <a className="btn-social bs-outline bs-instagram me-2 mb-2" href="#">
                        <i className="ai-instagram"></i></a>
                    <a className="btn-social bs-outline bs-pinterest me-2 mb-2" href="#">
                        <i className="ai-pinterest"></i></a>
                </div>
            </div>
        </div>
    )
}

export default Aside