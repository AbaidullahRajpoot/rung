
import PaymentMethods from '../components/PaymentMethods';
import {connect} from 'react-redux';
import { addToCart } from "../services/actions/action";

const mapStateToProps=state=>({
    data: state.cardItem
})
const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data)),
    
    
})
{console.warn("container",data)}
export default connect(mapStateToProps,mapDispatchToProps) (PaymentMethods) ;