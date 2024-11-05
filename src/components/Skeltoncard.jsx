import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeltonCard = () => {
    return (
        <>
            <div className="col-md-4">
                <div  >
                    <Skeleton height={"376px"} width={"376"} />

                </div>
            </div>
        </>
    );
}
export default SkeltonCard;