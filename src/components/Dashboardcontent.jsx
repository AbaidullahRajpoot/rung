import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import UserOrders from "./Userorders";
import LoadingSpinner from "./LoadingSpinner";
import AdminWhishlistComponent from "./AdminWishlist";

const Dashboardcontent = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [current_password, setCurrent_password] = useState('');
    const [new_password, setNew_password] = useState('');
    const [confirm_password, setConfirm_password] = useState('');
    const [emptyFeild, setEmptyFeild] = useState(true);

    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const [shippingInfo, setshippingInfo] = useState(null);
    
    const [shippingCountry, setShippingCountry] = useState([]);
    const [shippingState, setShippingState] = useState([]);
    const [shippingCity, setShippingCity] = useState([]);
    
    const [shippingAddress, setShippingAddress] = useState('');
    const [shippingpostal, setShippingPostal] = useState('');
    const [shippingPhone, setShippingPhone] = useState('');
    const [selectedshippingCountry, setSelectedShippingCountry] = useState("");
    const [selectedshippingState, setSelectedShippingState] = useState("");
    const [selectedshippingCity, setSelectedShippingCity] = useState("");

    const [error, setError] = useState({
        name: '',
        email: '',
        current_password: '',
        new_password: '',
        confirm_password: ''
    })

    const [user_id, setUser_id] = useState()
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(false)

    //==========================================get user info===========================================

    useEffect(() => {
        const data = JSON.parse((localStorage.getItem('user-info')))
        const user = JSON.parse((localStorage.getItem('user')))
        setName(user.name)
        setEmail(user.email)
        setUser(user)
        setUser_id(data)
        getShippingInfo()
        getCountry()
    }, [])

    //============================================Model box form add submit=================================

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        let data = {
            user_id: user_id,
            address: shippingAddress,
            country_id: selectedshippingCountry,
            state_id: selectedshippingState,
            city_id: selectedshippingCity,
            postal_code: shippingpostal,
            phone: shippingPhone
        }
        let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/user/shipping/create`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        Result = await Result.json()
        if (Result?.result === true) {
            toast.success(Result.message)
        }
        else if (Result?.result === false) {
            toast.error(Result.message)
        }

        setIsOpenAdd(false);
        setLoading(false)
    }

    //============================================Model box form edit submit=================================

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        let data = {
            user_id: user_id,
            address: shippingAddress,
            country_id: selectedshippingCountry,
            state_id: selectedshippingState,
            city_id: selectedshippingCity,
            postal_code: shippingpostal,
            phone: shippingPhone
        }
        let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/user/shipping/update`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        Result = await Result.json()
        if (Result?.result === true) {
            toast.success(Result.message)
        }
        else if (Result?.result === false) {
            toast.error(Result.message)
        }

        setIsOpenAdd(false);
        setLoading(false)
    };

    //========================================Handle Shipping Country==============================

    const handleShippingCountryChange = (e) => {
        const country_id = e.target.value;
        setSelectedShippingCountry(country_id)
        setShippingState([])
        setShippingCity([])
        fetch(`${process.env.REACT_APP_BASE_URL}/states-by-country/${country_id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const insidData = data?.data;
                if (insidData) {
                    setShippingState(insidData)
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    //========================================Handle Shipping State==============================

    const handleShippingStateChange = (e) => {
        const state_id = e.target.value;
        setSelectedShippingState(state_id)
        fetch(`${process.env.REACT_APP_BASE_URL}/cities-by-state/${state_id}}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const insidData = data?.data;
                if (insidData) {
                    setShippingCity(insidData)
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    //=====================================================Get All Country==============================

    const getCountry = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}/countries`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const insidData = data?.data;
                if (insidData) {
                    setShippingCountry(insidData)
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    //=====================================================Get Shipping Info===========================

    const getShippingInfo = async () => {
        const user = await JSON.parse((localStorage.getItem('user-info')))
        let data = {
            user_id: user,
        }
        let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/user/shipping/address`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        Result = await Result.json()
        if (Result?.data) {
            setshippingInfo(Result?.data)
            setShippingPhone(Result?.data[0]?.phone)
            setShippingPostal(Result?.data[0]?.postal_code)
            setShippingAddress(Result?.data[0]?.address)
        }
        else {
            setshippingInfo(null)
        }

    }


    //=====================================================Edit User Info================================

    const editUserHandler = async (event) => {
        event.preventDefault();
        setEmptyFeild(false)
        setLoading(true)
        setError({
            name: '',
            email: '',
            current_password: '',
            new_password: '',
            confirm_password: '',
        });
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (name.trim() === "") {
            setEmptyFeild(true)
            setError((prevError) => ({
                ...prevError,
                name: "Name feild required."
            }));
        }
        if (email.trim() === "") {
            setEmptyFeild(true)
            setError((prevError) => ({
                ...prevError,
                email: "Email feild required."
            }));
        }
        if (current_password.trim() === "") {
            setEmptyFeild(true)
            setError((prevError) => ({
                ...prevError,
                current_password: "Current password feild required."
            }));
        }
        if (new_password.trim() === "") {
            setEmptyFeild(true)
            setError((prevError) => ({
                ...prevError,
                new_password: "New password feild required."
            }));
        }
        if (confirm_password.trim() === "") {
            setEmptyFeild(true)
            setError((prevError) => ({
                ...prevError,
                confirm_password: "Confirm password feild required."
            }));
        }
        if (emptyFeild === false) {
            if (emailRegex.test(email)) {
                let data = { name, email, current_password, new_password, confirm_password, user_id }
                let Result = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/profile/updateprofile`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                Result = await Result.json()
                if (Result.message === "Profile information updated") {
                    toast.success(Result.message)
                    localStorage.setItem('user', JSON.stringify(Result.data));
                    setName(Result?.data?.name)
                }
                else {
                    toast.error(Result.message)
                }
            }
            else {
                setError((pre) => ({
                    ...pre,
                    email: "Enter valid email address."
                }))
            }

        }
        setLoading(false)

    }

    //=====/============================================Logout Code===================================

    const singoutHandler = () => {
        sessionStorage.removeItem('user-info_token')
        localStorage.removeItem('user-info')
        sessionStorage.removeItem('user-info_token')
        localStorage.removeItem('user-info')
        localStorage.removeItem('user')
        localStorage.removeItem('user-name')
    }

    return (
        <>
            <div className="page-content">
                <div className="dashboard pt-1">
                    {loading && <LoadingSpinner />}
                    <div className="container">
                        <div className="row">
                            <aside className="col-md-3 col-lg-2">
                                <ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="tab-dashboard-link" data-toggle="tab" href="#tab-dashboard" role="tab" aria-controls="tab-dashboard" aria-selected="true">Dashboard</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="tab-orders-link" data-toggle="tab" href="#tab-orders" role="tab" aria-controls="tab-orders" aria-selected="false">Orders</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="tab-address-link" data-toggle="tab" href="#tab-address" role="tab" aria-controls="tab-address" aria-selected="false">Adresses</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="tab-wishlist-link" data-toggle="tab" href="#tab-wishlist" role="tab" aria-controls="tab-wishlist" aria-selected="false">Whishlist</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="tab-account-link" data-toggle="tab" href="#tab-account" role="tab" aria-controls="tab-account" aria-selected="false">Account Details</a>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to='/login' className="nav-link" onClick={singoutHandler}>Sign Out</NavLink>
                                    </li>
                                </ul>
                            </aside>
                            <div className="col-md-9 col-lg-10">
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="tab-dashboard" role="tabpanel" aria-labelledby="tab-dashboard-link">
                                        <p>Hello <span className="font-weight-normal text-dark">{user.name}</span> (<a href="#">Log out</a>)
                                            <br />
                                            From your account dashboard you can view your <a href="#tab-orders" className="tab-trigger-link link-underline">recent orders</a>, manage your <a href="#tab-address" className="tab-trigger-link">shipping and billing addresses</a>, and <a href="#tab-account" className="tab-trigger-link">edit your password and account details</a>.</p>
                                    </div>
                                    <div className="tab-pane fade" id="tab-orders" role="tabpanel" aria-labelledby="tab-orders-link">
                                        <UserOrders />
                                    </div>
                                    <div className="tab-pane fade" id="tab-downloads" role="tabpanel" aria-labelledby="tab-downloads-link">
                                        <p>No downloads available yet.</p>
                                        <a className="btn btn-outline-primary-2"><span>GO SHOP</span><i className="icon-long-arrow-right"></i></a>
                                    </div>
                                    <div className="tab-pane fade" id="tab-address" role="tabpanel" aria-labelledby="tab-address-link">
                                        <p>The following addresses will be used on the checkout page by default.</p>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="card card-dashboard">
                                                    <div className="card-body">
                                                        <h3 className="card-title">Billing Address</h3>
                                                        <p>You have not set up this type of address yet.<br />
                                                            <a href="#">Edit <i className="icon-edit"></i></a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                shippingInfo && shippingInfo.length > 0 ?
                                                    <div className="col-lg-12">
                                                        <div className="card card-dashboard">
                                                            <div className="card-body">
                                                                <h3 className="card-title">Billing Address</h3>
                                                                <p>Name: {user.name}<br />
                                                                    Country: {shippingInfo[0].country_name}<br />
                                                                    State: {shippingInfo[0].state_name}<br />
                                                                    City: {shippingInfo[0].city_name}<br />
                                                                    Postal Code: {shippingInfo[0].postal_code}<br />
                                                                    Phone: {shippingInfo[0].phone}<br />
                                                                    Address: {shippingInfo[0].address}<br />
                                                                    <a href="#" onClick={() => setIsOpenEdit(true)}>Edit <i className="icon-edit"></i></a></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="col-lg-12">
                                                        <div className="card card-dashboard">
                                                            <div className="card-body">
                                                                <h3 className="card-title">Shipping Address</h3>
                                                                <p>You have not set up this type of address yet.<br />
                                                                    <a href="#" onClick={() => setIsOpenAdd(true)}>Add Shipping</a></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                            }

                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="tab-wishlist" role="tabpanel" aria-labelledby="tab-wishlist-link">
                                        <AdminWhishlistComponent />
                                    </div>
                                    <div className="tab-pane fade" id="tab-account" role="tabpanel" aria-labelledby="tab-account-link">
                                        <form action="#" onSubmit={editUserHandler}>
                                            <label>Name *</label>
                                            <input type="text" name="name" value={name} maxLength={250} onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))} className="form-control" />
                                            <p className="text-danger">{error.name !== '' && error.name}</p>
                                            <label>Email address *</label>
                                            <input disabled type="text" name="email" value={email} maxLength={250} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                            <p className="text-danger">{error.email !== '' && error.email}</p>
                                            <label>Current password *</label>
                                            <input type="password" name="current_password" maxLength={250} value={current_password} onChange={(e) => setCurrent_password(e.target.value)} className="form-control" />
                                            <p className="text-danger">{error.current_password !== '' && error.current_password}</p>
                                            <label>New password *</label>
                                            <input type="password" name="new_password" maxLength={250} value={new_password} onChange={(e) => setNew_password(e.target.value)} className="form-control" />
                                            <p className="text-danger">{error.new_password !== '' && error.new_password}</p>
                                            <label>Confirm new password *</label>
                                            <input type="password" name="confirm_password" maxLength={250} value={confirm_password} onChange={(e) => setConfirm_password(e.target.value)} className="form-control" />
                                            <p className="text-danger">{error.confirm_password !== '' && error.confirm_password}</p>
                                            <input type="hidden" id="custId" name={user_id} value={user_id} />
                                            <button type="submit" className="btn btn-outline-primary-2 mt-1">
                                                <span>SAVE CHANGES</span>
                                                <i className="icon-long-arrow-right"></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Model Box Add */}
            {isOpenAdd && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog modal-dialog-scrollable " role="document">
                        <div className="modal-content px-5 py-3">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Shipping Address</h5>
                                <button type="button" className="close" onClick={() => setIsOpenAdd(false)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body  pr-2">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">Address:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="recipient-name"
                                            value={shippingAddress}
                                            onChange={(e) => setShippingAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">Country:</label>
                                        <select
                                            className="form-control form-select"
                                            id="shipping-country"
                                            onChange={handleShippingCountryChange}
                                            aria-label="Shipping country select"
                                        >
                                            <option value="">Select a country</option>
                                            {shippingCountry.map(country => (
                                                <option key={country.id} value={country.id}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">State:</label>
                                        <select
                                            className="form-control form-select"
                                            id="shipping-country"
                                            onChange={handleShippingStateChange}
                                            aria-label="Shipping country select"
                                        >
                                            <option value="">Select a country</option>
                                            {shippingState.map(State => (
                                                <option key={State.id} value={State.id}>
                                                    {State.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">City:</label>
                                        <select
                                            className="form-control form-select"
                                            id="shipping-country"
                                            onChange={(e) => { setSelectedShippingCity(e.target.value) }}
                                            aria-label="Shipping country select"
                                        >
                                            <option value="">Select a country</option>
                                            {shippingCity.map(city => (
                                                <option key={city.id} value={city.id}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">Postal Code:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="recipient-name"
                                            value={shippingpostal}
                                            onChange={(e) => setShippingPostal(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">Phone:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="recipient-name"
                                            value={shippingPhone}
                                            onChange={(e) => setShippingPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setIsOpenAdd(false)}>Close</button>
                                        <button type="submit" className="btn btn-primary">Send message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Model Box Edit */}
            {isOpenEdit && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog modal-dialog-scrollable " role="document">
                        <div className="modal-content px-5 py-3">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Shipping Address</h5>
                                <button type="button" className="close" onClick={() => setIsOpenEdit(false)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body  pr-2">
                                <form onSubmit={handleEditSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">Address:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="recipient-name"
                                            value={shippingAddress}
                                            onChange={(e) => setShippingAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">Country:</label>
                                        <select
                                            className="form-control form-select"
                                            id="shipping-country"
                                            onChange={handleShippingCountryChange}
                                            aria-label="Shipping country select"
                                        >
                                            <option value="">Select a country</option>
                                            {shippingCountry.map(country => (
                                                <option key={country.id} value={country.id}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">State:</label>
                                        <select
                                            className="form-control form-select"
                                            id="shipping-country"
                                            onChange={handleShippingStateChange}
                                            aria-label="Shipping country select"
                                        >
                                            <option value="">Select a country</option>
                                            {shippingState.map(State => (
                                                <option key={State.id} value={State.id}>
                                                    {State.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">City:</label>
                                        <select
                                            className="form-control form-select"
                                            id="shipping-country"
                                            onChange={(e) => { setSelectedShippingCity(e.target.value) }}
                                            aria-label="Shipping country select"
                                        >
                                            <option value="">Select a country</option>
                                            {shippingCity.map(city => (
                                                <option key={city.id} value={city.id}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">Postal Code:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="recipient-name"
                                            value={shippingpostal}
                                            onChange={(e) => setShippingPostal(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">Phone:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="recipient-name"
                                            value={shippingPhone}
                                            onChange={(e) => setShippingPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setIsOpenEdit(false)}>Close</button>
                                        <button type="submit" className="btn btn-primary">Send message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

}
export default Dashboardcontent;