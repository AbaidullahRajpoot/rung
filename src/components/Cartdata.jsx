import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from './LoadingSpinner'
import "react-toastify/dist/ReactToastify.css";

const Cartdata = (props) => {

  var data = props.data.cardData;
  var symbolSign = data.length > 0 && data[0].symbol;

  var [coupon_code, setCoupon_code] = useState();
  var [coupon_code_status, setCoupon_code_status] = useState(false);
  var [totalprice, setTotalprice] = useState();
  var [isLoading, setIsLoading] = useState(false);

  var maxtotal;
  var Discount;
  var Result;
  var calculable_price;
  var total;
  var data_quantity;

  if (props.data.discount) {
    var discounted_price = props.data.discount[0].DiscountetdPrice;
  }
  //==========================================Call Whenever Page Rendered===========================================

  useEffect(() => { }, []);
  const discount = () => {
    props.DiscountedHandler({ DiscountetdPrice: totalprice });
  }

  //==========================================Coupen Handler Function===========================================

  const CoupenHandler = async (e) => {
    discount();
    setIsLoading(true)
    e.preventDefault();
    let data = { coupon_code };
    Result = await fetch(`${process.env.REACT_APP_BASE_URL}/check-coupon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    Result = await Result.json();
    setIsLoading(false)
    if (Result.result === true) {
      Discount = Result.discount;
      setCoupon_code_status(true)
      toast.success(Result?.message)
    }
    else if (Result.result === false) {
      toast.error(Result?.message)
    }
    maxtotal = Discount ? total - (total * Discount) / 100 : total;
    setTotalprice(maxtotal);
  };

  //==========================================CoupenValue Update Handler Function===========================================

  const CoupenUpdateHandler = async (e) => {
    e.preventDefault();
    if (coupon_code_status === true) {
      discount();
      setIsLoading(true)
      let data = { coupon_code };
      Result = await fetch(`${process.env.REACT_APP_BASE_URL}/check-coupon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      Result = await Result.json();
      setIsLoading(false)
      if (Result.result === true) {
        Discount = Result.discount;
        toast.success(Result?.message)
      }
      else if (Result.result === false) {
        toast.error(Result?.message)
      }
      maxtotal = Discount ? total - (total * Discount) / 100 : total;
      setTotalprice(maxtotal);
    }
    else {
      toast.error('Apply Coupon Code First')
    }
  };

  //======================================Toast Message=====================================

  const notify = () => toast.success("Succesfully Deleted from cart");

  return (
    <>
      {
        isLoading === true && <LoadingSpinner />
      }
      <div className="page-content">
        <div className="cart">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <table className="table table-cart table-mobile">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {data && data?.length > 0 ? data.map((item, index) => {
                      total = data.reduce(
                        (total, item) =>
                          total +
                          (item.totalprice ? item.totalprice : item.Price),
                        0
                      );
                      data_quantity = item.quantity;
                      var product_id = item.product_id;
                      calculable_price = item.Price;

                      return (
                        <tr key={index}>
                          <td className="product-col">
                            <div className="product">
                              <figure className="product-media">
                                <NavLink to={`/shop/product/catogeroy/fullwidth/${item.product_id}`} >
                                  <img
                                    src={
                                      "https://beta.myrung.co.uk/b/public/" +
                                      item.product_image
                                    }
                                    alt="Product image"
                                  />
                                </NavLink>
                              </figure>
                              <h3 className="product-title">
                                <NavLink to={`/shop/product/catogeroy/fullwidth/${item.product_id}`} >{item.name}</NavLink>
                              </h3>
                            </div>
                          </td>
                          <td className="price-col">
                            {item.symbol} {item.Price}
                          </td>
                          <td className="quantity-col">
                            <div
                              className="cart-product-quantity"
                              style={{ display: "flex" }}
                            >
                              <div className="input-group-prepend">
                                <a
                                  data-id={item.product_id}
                                  onClick={() => {
                                    props.DecreHandler({
                                      Price: calculable_price,
                                      quantity: item.quantity,
                                      product_id: product_id,
                                    });
                                  }}
                                  className="btn btn-qantity-mines btn-decrement btn-spinner"
                                >
                                  <i className="icon-minus"></i>
                                </a>
                              </div>
                              <input
                                type="number"
                                id={"quantity-" + item.product_id}
                                className="form-control"
                                onChange={(e) => e.target.value}
                                value={item.quantity}
                                min="1"
                                max="10"
                                step="1"
                                data-decimals="0"
                                required
                              />
                              <div className="input-group-append">
                                <a
                                  onClick={() => {
                                    props.IncreHandler({
                                      Price: calculable_price,
                                      quantity: item.quantity,
                                      product_id: product_id,
                                    });
                                  }}
                                  data-id={item.product_id}
                                  className="btn btn-qantity-plus btn-increment btn-spinner"
                                >
                                  <i className="icon-plus"></i>
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="total-col">
                            {item.symbol} {item.totalprice}
                          </td>
                          <td className="remove-col">
                            <button
                              onClick={() =>
                                props.removeToCartHandler({ item })
                              }
                              className="btn-remove"
                            >
                              <i onClick={notify} className="icon-close"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                      :
                      <div>
                        <h3 className="text-center mt-5">No Record Found.</h3>
                      </div>
                    }
                  </tbody>
                </table>
                {/* <div className="cart-bottom">
                  <div className="cart-discount">
                    <form action="#">
                      <div className="input-group">
                        <input
                          type="text"
                          onChange={(e) => setCoupon_code(e.target.value)}
                          name="coupon_code"
                          className="form-control"
                          required
                          placeholder="coupon code"
                        />
                        <div className="input-group-append">
                          <button
                            onClick={CoupenHandler}
                            className="btn btn-outline-primary-2"
                            type="submit"
                          >
                            <i className="icon-long-arrow-right"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <a
                    id="update"
                    onClick={CoupenUpdateHandler}
                    className="btn btn-outline-dark-2"
                  >
                    <span>UPDATE CART</span>
                    <i className="icon-refresh"></i>
                  </a>
                </div> */}
              </div>
              <aside className="col-lg-3">
                <div className="summary summary-cart">
                  <h3 className="summary-title">Cart Total</h3>
                  <table className="table table-summary">
                    <tbody>
                      <tr className="summary-subtotal">
                        <td>Subtotal:</td>
                        <td>{symbolSign} {(discounted_price ? discounted_price : total).toFixed(2)}</td>
                      </tr>
                      <tr className="summary-total">
                        <td>Total:</td>
                        <td>{symbolSign} {(discounted_price ? discounted_price : total).toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <NavLink
                    to="/checkout"
                    className="btn btn-outline-primary-2 btn-order btn-block"
                  >
                    PROCEED TO CHECKOUT
                  </NavLink>
                </div>
                <NavLink
                  to="/shop/categories"
                  className="btn btn-outline-dark-2 btn-block mb-3"
                >
                  <span>CONTINUE SHOPPING</span>
                  <i className="icon-refresh"></i>
                </NavLink>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cartdata;
