import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/images/finellogo-min.png';
import '../assets/css/style.css'
import '../assets/css/skins/skin-demo-5.css';
import '../assets/css/demos/demo-5.css';
import '../assets/css/bootstrap.css';
import '../assets/css/mystyle.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slider = (props) => {

        const [scroll, setScroll] = useState("")
        const [hiddenmenu, setHiddenmenu] = useState(false)
        const [searchValue, setsearchValue] = useState()
        const navigate = useNavigate();
        const location = useLocation();
        const { pathname } = location;
        const splitLocation = pathname.split("/");

        var token;
        var data = props.data.cardData

        useEffect(() => {
                document.addEventListener("scroll", () => {
                        if (window.scrollY > 300) {
                                setScroll("fixed")
                        }
                        else {
                                setScroll("")
                        }
                })

        }, [scroll])

        const notify = () => toast.success("Succesfully Deleted from cart");
        const notifynotLogin = () => {
                toast.error("Please Login first")

        }

        const getData = async () => {
                const data = await JSON.parse((sessionStorage.getItem('user-info_token')))
                token = data
        }

        useEffect(() => {
                getData()
        }, [getData])

        const WhishlistHandler = () => {
                if (token != null) {
                        navigate('/whishlist')
                }
                else {
                        notifynotLogin();
                }
        }

        const toggleSearch = (e) => {
                e.preventDefault()
                navigate(
                        "/search",
                        {
                                state: { searchValue },
                                min: null,
                                max: null
                        })
        }
        const searchHandle = (e) => {
                let key = e.target.value
                setsearchValue(key)
        }

        return (
                <>

                        <div className="mobile-menu-overlay"></div>
                        <div className={(hiddenmenu ? "hidden" : "") + " mobile-menu-container mobile-menu-light"}>
                                <div className=" mobile-menu-wrapper">
                                        <span onClick={() => setHiddenmenu(!hiddenmenu)} className="mobile-menu-close"> <i className="icon-close"></i></span>
                                        <form action="#" onSubmit={toggleSearch} method="get" className="mobile-search">
                                                <label htmlFor="mobile-search" className="sr-only">Search</label>
                                                <input onChange={searchHandle} value={searchValue} type="search" className="form-control" name="mobile-search" id="mobile-search"
                                                        placeholder="Search in..." required />
                                                <button className="btn btn-primary"> <i className="icon-search"></i>
                                                </button>
                                        </form>
                                        <nav className="mobile-nav">
                                                <ul className="mobile-menu">
                                                        <li className={splitLocation[1] === "" ? "active" : ""}>
                                                                <NavLink to='/'>Home</NavLink>
                                                        </li>
                                                        <li className={splitLocation[1] === "shop" ? "active" : ""}>
                                                                <NavLink to='/shop/categories'>Shop</NavLink>
                                                        </li>
                                                        <li className={splitLocation[1] === "faq" ? "active" : ""}>
                                                                <NavLink to='/faq' className="sf-with-ul">FAQ</NavLink>
                                                        </li>
                                                        <li className={splitLocation[1] === "contact" ? "active" : ""}>
                                                                <NavLink to='/contact'>Contact Us</NavLink>
                                                        </li>
                                                        <li className={splitLocation[1] === "about" ? "active" : ""}>
                                                                <NavLink to='/about'>About Us</NavLink>
                                                        </li>
                                                </ul>
                                        </nav>
                                        <div className="social-icons">
                                                <a href="#" className="social-icon" target="_blank" title="Facebook"><i className="icon-facebook-f"></i></a>
                                                <a href="#" className="social-icon" target="_blank" title="Twitter"><i className="icon-twitter"></i></a>
                                                <a href="#" className="social-icon" target="_blank" title="Instagram"><i className="icon-instagram"></i></a>
                                                <a href="#" className="social-icon" target="_blank" title="Youtube"><i className="icon-youtube"></i></a>
                                        </div>
                                </div>
                        </div>
                </>
        );
}
export default Slider;