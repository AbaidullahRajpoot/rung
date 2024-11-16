import React from "react";
import bg_4 from '../assets/images/backgrounds/bg-4.jpg';

const CounterArea = () => {
    return (
        <>
            <div className="page-content pb-3">
                <div className="bg-image pt-7 pb-5 pt-md-12 pb-md-9" style={{ backgroundImage: `url(${bg_4})` }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 col-md-3">
                                <div className="count-container text-center">
                                    <div className="count-wrapper text-white">
                                        <span className="count" data-from="0" data-to="40" data-speed="3000" data-refresh-interval="50">50</span>k+
                                    </div>
                                    {/* <!-- End .count-wrapper --> */}
                                    <h3 className="count-title text-white">Happy Customer</h3>
                                    {/* <!-- End .count-title --> */}
                                </div>
                                {/* <!-- End .count-container --> */}
                            </div>
                            {/* <!-- End .col-6 col-md-3 --> */}

                            <div className="col-6 col-md-3">
                                <div className="count-container text-center">
                                    <div className="count-wrapper text-white">
                                        <span className="count" data-from="0" data-to="20" data-speed="3000" data-refresh-interval="50">70</span>+
                                    </div>
                                    {/* <!-- End .count-wrapper --> */}
                                    <h3 className="count-title text-white">Years in Business</h3>
                                    {/* <!-- End .count-title --> */}
                                </div>
                                {/* <!-- End .count-container --> */}
                            </div>
                            {/* <!-- End .col-6 col-md-3 --> */}

                            <div className="col-6 col-md-3">
                                <div className="count-container text-center">
                                    <div className="count-wrapper text-white">
                                        <span className="count" data-from="0" data-to="95" data-speed="3000" data-refresh-interval="50">0</span>%
                                    </div>
                                    {/* <!-- End .count-wrapper --> */}
                                    <h3 className="count-title text-white">Return Clients</h3>
                                    {/* <!-- End .count-title --> */}
                                </div>
                                {/* <!-- End .count-container --> */}
                            </div>
                            {/* <!-- End .col-6 col-md-3 --> */}

                            <div className="col-6 col-md-3">
                                <div className="count-container text-center">
                                    <div className="count-wrapper text-white">
                                        <span className="count" data-from="0" data-to="15" data-speed="3000" data-refresh-interval="50">5</span>
                                    </div>
                                    {/* <!-- End .count-wrapper --> */}
                                    <h3 className="count-title text-white">Awards Won</h3>
                                    {/* <!-- End .count-title --> */}
                                </div>
                                {/* <!-- End .count-container --> */}
                            </div>
                            {/* <!-- End .col-6 col-md-3 --> */}
                        </div>
                        {/* <!-- End .row --> */}
                    </div>
                    {/* <!-- End .container --> */}
                </div>
                {/* <!-- End .bg-image pt-8 pb-8 --> */}
            </div>
        </>
    );
}
export default CounterArea;