import React from "react";
import brands_1 from "../assets/images/brands/1.png";
import brands_2 from "../assets/images/brands/2.png";
import brands_3 from "../assets/images/brands/3.png";
import brands_4 from "../assets/images/brands/4.png";
import brands_5 from "../assets/images/brands/5.png";
import brands_6 from "../assets/images/brands/6.png";
import brands_7 from "../assets/images/brands/7.png";
import brands_9 from "../assets/images/brands/9.png";
const Brands = () => {
    return (
        <>
            <div className="page-content pb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="brands-text text-center mx-auto mb-6">
                                <h2 className="title">The world's premium design brands in one destination.</h2>
                                {/* <!-- End .title --> */}
                                <p>Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nis</p>
                            </div>
                            {/* <!-- End .brands-text --> */}
                            <div className="brands-display">
                                <div className="row justify-content-center">
                                    <div className="col-6 col-sm-4 col-md-3">
                                        <a href="#" className="brand">
                                            <img src={brands_1} alt="Brand Name" />
                                        </a>
                                    </div>
                                    {/* <!-- End .col-md-3 --> */}

                                    <div className="col-6 col-sm-4 col-md-3">
                                        <a href="#" className="brand">
                                            <img src={brands_2} alt="Brand Name" />
                                        </a>
                                    </div>
                                    {/* <!-- End .col-md-3 --> */}

                                    <div className="col-6 col-sm-4 col-md-3">
                                        <a href="#" className="brand">
                                            <img src={brands_3} alt="Brand Name" />
                                        </a>
                                    </div>
                                    {/* <!-- End .col-md-3 --> */}

                                    <div className="col-6 col-sm-4 col-md-3">
                                        <a href="#" className="brand">
                                            <img src={brands_7} alt="Brand Name" />
                                        </a>
                                    </div>
                                    {/* <!-- End .col-md-3 --> */}

                                    <div className="col-6 col-sm-4 col-md-3">
                                        <a href="#" className="brand">
                                            <img src={brands_4} alt="Brand Name" />
                                        </a>
                                    </div>
                                    {/* <!-- End .col-md-3 --> */}

                                    <div className="col-6 col-sm-4 col-md-3">
                                        <a href="#" className="brand">
                                            <img src={brands_5} alt="Brand Name" />
                                        </a>
                                    </div>
                                    {/* <!-- End .col-md-3 --> */}

                                    <div className="col-6 col-sm-4 col-md-3">
                                        <a href="#" className="brand">
                                            <img src={brands_6} alt="Brand Name" />
                                        </a>
                                    </div>
                                    {/* <!-- End .col-md-3 --> */}

                                    <div className="col-6 col-sm-4 col-md-3">
                                        <a href="#" className="brand">
                                            <img src={brands_9} alt="Brand Name" />
                                        </a>
                                    </div>
                                    {/* <!-- End .col-md-3 --> */}
                                </div>
                                {/* <!-- End .row --> */}
                            </div>
                            {/* <!-- End .brands-display --> */}
                        </div>
                        {/* <!-- End .col-lg-10 offset-lg-1 --> */}
                    </div>
                    {/* <!-- End .row --> */}
                </div>
                {/* <!-- End .container --> */}
            </div>
        </>
    );
}
export default Brands;