import React from 'react';
import about2_img_1 from "../assets/images/brands/clothes.jpeg.webp";

const WhoWeAre = () => {

    return (
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="about-text text-center mt-3">
                                <img src={about2_img_1} alt="myimage" className="mx-auto about-images" />
                                <p className='text-left  mt-2'>Welcome to myrung.ae, your go-to online source for stylish and sophisticated fashion! As a family-owned business originally launched in the UK, we have successfully expanded our offerings to the lively markets of the UAE and the Gulf region. Explore our stunning selection of headwear, clothing, and accessories [coming soon!].</p>
                                <p className='text-left mt-2'>Our journey began with a passion for unique headwear that blends traditional elegance with contemporary flair. As we expand our offerings, we embrace the diverse fashion needs of our customers, introducing an exquisite range of garments, stylish ladies' bags, men’s formal shirts, and accessories that reflect the rich cultural tapestry of the region [coming soon!].</p>
                                <p className='text-left mt-2'>Our commitment to quality is unwavering. Each piece is thoughtfully designed and crafted using the finest materials, ensuring that our products are not only stylish but also comfortable and durable. We take pride in our attention to detail and strive to deliver exceptional value to our customers.</p>
                                <p className='text-left mt-2'>As we grow, we remain dedicated to fostering a sense of community among our customers. We understand the importance of connecting with our audience, which is why we actively engage with you through social media and our website. Your feedback and style inspirations help shape our collections, making you a vital part of our fashion journey.</p>
                                <p className='text-left mt-2'>Explore our curated selection and discover the latest trends that resonate with your personal style. We will soon be launching various fashion articles on our website, so stay tuned!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-2"></div>
            </div>
    );
}
export default WhoWeAre;