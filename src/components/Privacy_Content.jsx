import React,{useEffect,useState} from "react"; 

const PrivacyContent =() =>{

    const [PrivacyData, SetPrivacyData] = useState([]);

    //============================================Get Privacy Policy From Api===============================

	const getPrivacyApi = async () => {
		const response = await fetch(`${process.env.REACT_APP_BASE_URL}/policies/privacyPolicy`);
		const data = await response.json();
		var insidData = data.data;
		SetPrivacyData(insidData)
	}

    //=====================================================Call Whenever Page Rendered========================

	useEffect(() => {
		getPrivacyApi();
	}, [])

    return(
        <>
            
            <div className="page-content">
            	<div className="categories-page">
	                <div className="container">
                    { PrivacyData.map((data, i) => {
                       return  <div dangerouslySetInnerHTML={{ __html: data.content }} />
                   })}
	                </div>
                </div>
            </div>
        </>
    );
}
export default PrivacyContent;