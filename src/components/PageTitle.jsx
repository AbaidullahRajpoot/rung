import React from 'react';
import { NavLink } from 'react-router-dom';
import Title_img from '../assets/images/page-header-bg.jpg';


const PageTitle = ({name}) => {
    var path = window.location.pathname;
    var splitUrl = path.split('/');
    const nthElement = (splitUrl, n = 0) => (n > 0 ? splitUrl.slice(n, n + 1) : splitUrl.slice(n))[0];
    var Page_Title = nthElement(splitUrl, -1);

    return (
        <>

            <div className="page-header text-center" style={{ backgroundImage: `url(${Title_img})` }}>
                <div className="container">
                    <h1 className="page-title">{name}</h1>
                </div>
            </div>
            <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><NavLink to='/'>Home</NavLink></li>
                        {
                            splitUrl.map((item, i) => {
                                return (
                                    <>
                                        {item === '' ? null :
                                            <li className="breadcrumb-item" ><a href="#">{item}</a></li>}
                                    </>
                                )
                            })
                        }
                    </ol>
                </div>
            </nav>
        </>
    );
}
export default PageTitle;