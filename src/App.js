import React, { createContext,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './assets/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import './assets/css/style.css';
import './assets/css/mystyle.css';
import './assets/css/demos/demo-5.css';

import PrivateRoute from './components/Privateroute';
import GuestRoute from './components/GuestRoute';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Catagory from './pages/Catagory';
import Products from "./pages/Products";
import Faq from "./pages/FAQ";
import Help from "./pages/Help";
import Terms from "./pages/Terms_Condition";
import Payments_Method from "./pages/PaymentsMethod";
import Money_Back from "./pages/MoneyBack";
import Shipping from "./pages/Shipping";
import OrderPage from "./pages/OrderPage.js";
import Privacy_Policy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import Return from "./pages/Return";
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword.js';
import OtpCode from './pages/OtpPage.js';
import ResetPassword from './pages/ResetPassword';
import Register from './pages/Registeration';
import Verification from './pages/Verification.js';
import Dashboard from './pages/Dashboard';
import ShippingAddress from './pages/ShippingAddress.js';
import ProductFullWidth from './pages/Singelproduct';
import Cart from './pages/Cart';
import Whishlist from './pages/Whishlist';
import Checkout from './pages/checkout';
import PaymentSuccess from './pages/PaymentSuccess.js';
import Search from './pages/Search';
import PamentGatways from './pages/PaymentGatways'

const Pagename = createContext();

function App() {

  return (
    <>
      <Pagename.Provider value="Shop">
        <BrowserRouter>
          <Routes>

            <Route path="/login" element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
            />
            <Route path="/forgot-password" element={
              <GuestRoute>
                <ForgotPassword />
              </GuestRoute>
            }
            />
            <Route path="/otp-code" element={
              <GuestRoute>
                <OtpCode />
              </GuestRoute>
            }
            />
            <Route path="/reset-password" element={
              <GuestRoute>
                <ResetPassword />
              </GuestRoute>
            }
            />
            <Route exact path="/signup" element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            } />
            <Route exact path="/verification-confirmation" element={
              <GuestRoute>
                <Verification />
              </GuestRoute>
            } />

            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>} />

            <Route exact path="/whishlist" element={
              <PrivateRoute>
                <Whishlist />
              </PrivateRoute>

            } />
            <Route exact path="/shipping-address" element={
              <PrivateRoute>
                <ShippingAddress />
              </PrivateRoute>

            } />
            <Route exact path="/order-view" element={
              <PrivateRoute>
                <OrderPage />
              </PrivateRoute>

            } />

            <Route exact index element={<Home />} />
            <Route exact path="/about" element={<AboutUs />} />
            <Route exact path="/shop/categories" element={<Catagory />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop/product/catogeroy/:id" element={<Products />} />
            <Route exact path="/faq" element={<Faq />} />
            <Route exact path="/help" element={<Help />} />
            <Route exact path="/terms" element={<Terms />} />
            <Route exact path="/paymentsmethod" element={<Payments_Method />} />
            <Route exact path="/money-back-guarantee!" element={<Money_Back />} />
            <Route exact path="/returns" element={<Return />} />
            <Route exact path="/shipping" element={<Shipping />} />
            <Route exact path="/privacypolicy" element={<Privacy_Policy />} />
            <Route exact path="/shop/product/catogeroy/fullwidth/:id" element={<ProductFullWidth />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/success" element={<PaymentSuccess />} />
            <Route exact path="/Search" element={<Search />} />
            <Route exact path="/checkout/payments" element={<PamentGatways />} />
          </Routes>
        </BrowserRouter>

      </Pagename.Provider>


    </>
  );
}


export default App;



