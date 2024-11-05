import React,{useEffect,useState} from "react"; 

const Returns_content =() =>{

    const [ReturnData, SetReturnData] = useState([]);

    //===========================================Get Return Policy from Api=========================================

	const getReturnApi = async () => {
		const response = await fetch(`${process.env.REACT_APP_BASE_URL}/policies/return`);
		const data = await response.json();
		var insidData = data.data;
		SetReturnData(insidData)
	}

    //==================================================Call whenever Page Rendered==================================

	useEffect(() => {
		getReturnApi();
	}, [])

    return(
        <>
            
            <div className="page-content">
            	<div className="categories-page">
	                <div className="container">
                    { ReturnData.map((data, i) => {
                        return  <div dangerouslySetInnerHTML={{ __html: data.content }} />
                   })}
	                </div>
                </div>
            </div>
        </>
    );
}
export default Returns_content;