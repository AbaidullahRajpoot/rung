
import Featured from '../components/Featured';
import {connect} from 'react-redux';
import { addToCart } from "../services/actions/action";

const mapStateToProps=state=>({
})
const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data)),
    
})
export default connect(mapStateToProps,mapDispatchToProps) (Featured) ;