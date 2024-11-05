import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const ProductSkeltonCard = () => {
    return (
        <>
                    <div  className="product product-2" >
                    <h1><Skeleton wrapper={"Box"} height={"480px"}/></h1>
                    {/* <h2><Skeleton /></h2> */}
                    <h3><Skeleton /></h3>
                    </div>
                 
        </>
    );
}
export default ProductSkeltonCard;