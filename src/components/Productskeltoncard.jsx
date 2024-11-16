import React from "react";
import Skeleton from "react-loading-skeleton";
const ProductSkeltonCard = () => {
    return (
        <>
            <div className="product product-2" >
                <h1><Skeleton height={"480px"} /></h1>
                <h3><Skeleton /></h3>
            </div>

        </>
    );
}
export default ProductSkeltonCard;