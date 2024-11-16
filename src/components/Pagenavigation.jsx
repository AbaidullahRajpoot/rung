import React,{useState,useEffect} from "react";
import ReactPaginate from "react-paginate";
import Product_card_container from "../container/Product_card_container";
const Navigation=(props)=>{
	
	const [pages, setPages] = useState([]);
	const fetchpageination = async (currentPage) => {
		// alert("hjn")
		// https://cors-anywhere.herokuapp.com/

			var response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/pricefilter?page=${currentPage}`, {
                method: 'POST',
                // body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',

                }
            });
			const data = await response.json();
			 return data;
        }
		// SetCatagories(insidData);
	

	// useEffect(() => {
	// 	fetchpageination();
	// }, []);
	const handlePageClick= async(data)=>{
		let currentPage=data.selected+1;
		const paginationdata=await fetchpageination(currentPage);
		setPages(paginationdata)
	}
    return(
        <>
		{/* {pages?<Product_card_container array={pages}/>:""} */}
		<div>
		<ReactPaginate 
			breakLabel={'...'}
			previousLabel="< previous"
			nextLabel="next >"
			pageCount={10}
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
			
		/>
		</div>

            {/* <nav aria-label="Page navigation">
							    <ul className="pagination justify-content-center">
							        <li className="page-item disabled">
							            <a className="page-link page-link-prev" href="#" aria-label="Previous" tabIndex="-1" aria-disabled="true">
							                <span aria-hidden="true"><i className="icon-long-arrow-left"></i></span>Prev
							            </a>
							        </li>
							        <li className="page-item active" aria-current="page"><a className="page-link" href="#">{props.meta.current_page}</a></li>
							        <li className="page-item"><a className="page-link" href="#">2</a></li>
							        <li className="page-item"><a className="page-link" href="#">3</a></li>
							        <li className="page-item-total">of {props.meta.last_page}</li>
							        <li className="page-item">
							            <a className="page-link page-link-next" href="#" aria-label="Next">
							                Next <span aria-hidden="true"><i className="icon-long-arrow-right"></i></span>
							            </a>
							        </li>
							    </ul>
							</nav> */}
        </>
    );
}
export default Navigation;