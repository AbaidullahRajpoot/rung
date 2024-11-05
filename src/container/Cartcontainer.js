
import Cartdata from '../components/Cartdata';
import {connect} from 'react-redux';
import {Incre,Decre, addToCart,removeToCart,Discount } from "../services/actions/action";

const mapStateToProps=state=>({
        data: state.cardItem
})

const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data)),
    IncreHandler:data=>dispatch(Incre(data)),
    DecreHandler:data=>dispatch(Decre(data)),
    DiscountedHandler:data=>dispatch(Discount(data)),
    removeToCartHandler:data=>dispatch(removeToCart(data)),
  
})

export default connect(mapStateToProps,mapDispatchToProps) (Cartdata) ;