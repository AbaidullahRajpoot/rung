
import Checkout_content from '../components/Checkout_content';
import {connect} from 'react-redux';
import { addToCart } from "../services/actions/action";

const mapStateToProps=state=>({
        data: state.cardItem
    })
    const mapDispatchToProps=dispatch=>({
        addToCartHandler:data=>dispatch(addToCart(data)),
        
    })
export default connect(mapStateToProps,mapDispatchToProps) (Checkout_content) ;