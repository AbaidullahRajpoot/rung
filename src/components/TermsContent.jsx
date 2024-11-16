import React,{useState,useEffect} from "react"

const TermsContent =() =>{

    const [TermData, SetTermData] = useState([]);

    //======================================Get Term and Condition Data================================

	const getTermApi = async () => {
		const response = await fetch(`${process.env.REACT_APP_BASE_URL}/policies/termCondition`);
		const data = await response.json();
		var insidData = data.data;
		SetTermData(insidData)
	}

    //================================================Call Whenever Page Rendered==========================

	useEffect(() => {
		getTermApi();
	}, []);

    return(
        <>
            <div className="page-content">
            	<div className="categories-page">
	                <div className="container">
                   { TermData.map((data, index) => {
                        return  <div key={index} dangerouslySetInnerHTML={{ __html: data.content }} />
                   })}
	                </div>
                </div>
            </div>
        </>
    );
}
export default TermsContent;