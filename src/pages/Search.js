import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product_card_container from "../container/Product_card_container";
import { useLocation } from "react-router-dom";
import ProductSkeltonCard from "../components/Productskeltoncard";
import HeaderContainer from "../container/HeaderContainer";
import ProductPageTitle from "../components/ProductPageTitle";
import Footer2 from '../components/Footer2';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const Search = () => {

    const [isloding, setIsloading] = useState(true);
    const [min, setMin] = useState(null)
    const [max, setMax] = useState(null)
    const [searchNameValue, setSearchNameValue] = useState('')
    const [Product, setProduct] = useState([])
    const [totalpages, setTotalPages] = useState(null);
    const [activePage, setActivePage] = useState(0)

    const location = useLocation()
    const { searchValue } = location.state;
    let name = searchValue
    let searchName = { name }

    let currentUrl = window.location.href.split("=")[1];
    let item_id = currentUrl

    //===========================Call When Range Slider Value Change======================================

    const getRangeSliderValue = (values, handle) => {

        const minValue = Number(values[0])
        const maxValue = Number(values[1])

        setMin(minValue)
        setMax(maxValue)

    }

    //===============================================Get Product Api===========================================

    const getProduct = async (minValue, maxValue) => {
        setProduct([])
        setIsloading(true)
        const userToken = sessionStorage.getItem('user-info_token');
        if (userToken) {
            const userID = await JSON.parse((localStorage.getItem('user-info')))
            let data = { min: minValue, max: maxValue, name: searchName?.name, user_id: userID }
            var Result = await fetch(`${process.env.REACT_APP_BASE_URL}/products/search`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            Result = await Result.json()
            if (Result) {
                setProduct(Result?.data)
            }
        } else {
            localStorage.removeItem('user-info')
            localStorage.removeItem('user')
            localStorage.removeItem('user-name')
            let data = { min: minValue, max: maxValue, name: searchName?.name, user_id: null }
            var Result = await fetch(`${process.env.REACT_APP_BASE_URL}/products/search`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            Result = await Result.json()
            if (Result) {
                setProduct(Result?.data)
            }
        }
        setIsloading(false)
    }

    //===============================================Get Pagination Api===========================================

    const GetPaginationData = async (currentPage) => {

        setIsloading(true)
        let data = { min, max, name }
        setProduct([])
        var response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/pricefilter?page=${currentPage}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const Result = await response.json();
        setIsloading(false)
        if (Result) {
            setProduct(Result?.products?.data)
        }

    }

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1;
        setActivePage(data.selected)
        GetPaginationData(currentPage);

    }


    //===============================================ClearFilter===========================================

    const ClearFilter = () => {
        setMin(null)
        setMax(null)
        getProduct(null, null)
    }

    //===================================================Call Whenever Page Rendered=====================================

    useEffect(() => {
        setMin(null)
        setMax(null)
        getProduct(null, null)
    }, [searchValue])

    useEffect(() => {
        getProduct(min, max)
    }, [min, max])

    return (
        <>
            <HeaderContainer onClickSearch={getProduct} />
            <ProductPageTitle />
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <aside className=" order-lg-first">
                                <div className="sidebar sidebar-shop">
                                    <div className="widget widget-clean">
                                        <label>Filter:</label>
                                        <a style={{ cursor: "pointer", color: "var(--primary-color)" }} onClick={() => { ClearFilter() }} className="sidebar-filter-clear">Clean Filter</a>
                                    </div>
                                    <div className="widget widget-collapsible">
                                        <h3 className="widget-title">
                                            <a data-toggle="collapse" href="#widget-5" role="button" aria-expanded="true" aria-controls="widget-5">
                                                Price
                                            </a>
                                        </h3>
                                        <div className="collapse show" id="widget-5">
                                            <div className="widget-body">
                                                <div className="filter-price">
                                                    <div className="filter-price-text d-flex justify-content-between">
                                                        Price Range:
                                                    </div>
                                                    <Nouislider
                                                        tooltips={true}
                                                        onChange={getRangeSliderValue}
                                                        range={{ min: 0, max: 1000 }}
                                                        start={[20, 500]}
                                                        connect
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                        <div className="col-lg-9">
                            <div className="products mb-3">
                                <div className="row justify-content-center">
                                    {
                                        isloding === true ?
                                            <>
                                                <div className="col-6">
                                                    <ProductSkeltonCard />
                                                </div>
                                                <div className="col-6">
                                                    <ProductSkeltonCard />
                                                </div>
                                            </>
                                            :
                                            Product && Product.length > 0 ? Product.map((product, index) => {
                                                document.getElementById('cat_bred_cumb').innerText = product.category_name;
                                                return <Product_card_container itemId={item_id} array={product} />

                                            })
                                                :
                                                <div>
                                                    <h3>No Record Found.</h3>
                                                </div>
                                    }
                                </div>
                                {
                                    isloding === false && totalpages &&
                                    <ReactPaginate
                                        breakLabel={'...'}
                                        previousLabel="< Previous"
                                        nextLabel="Next >"
                                        pageCount={totalpages}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={2}
                                        onPageChange={handlePageClick}
                                        containerClassName={'pagination justify-content-center'}
                                        pageClassName={'page_item'}
                                        pageLinkClassName={'page-link'}
                                        previousClassName={'page-item'}
                                        previousLinkClassName={'page-link'}
                                        nextClassName={'page-item'}
                                        nextLinkClassName={'page-link'}
                                        breakClassName={'page-item'}
                                        breakLinkClassName={'page-link'}
                                        activeClassName={'active'}
                                        forcePage={activePage}
                                    />
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer2 />
        </>
    );
}
export default Search;
