
import Slider from '../components/slider';
import {connect} from 'react-redux';
import {removeToCart } from "../services/actions/action";

const mapStateToProps=state=>({
        data: state.cardItem
})
const mapDispatchToProps=dispatch=>({
    
    removeToCartHandler:data=>dispatch(removeToCart(data)),
  
})
export default connect(mapStateToProps,mapDispatchToProps) (Slider) ;