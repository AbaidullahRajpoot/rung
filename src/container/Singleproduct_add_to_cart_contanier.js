
import Fullwitdh from '../components/Fullwitdh';
import {connect} from 'react-redux';
import {Incre,Decre, addToCart } from "../services/actions/action";

const mapStateToProps=state=>({
        data: state.cardItem
})
const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data)),
    IncreHandler:data=>dispatch(Incre(data)),
    DecreHandler:data=>dispatch(Decre(data)),
    
})
export default connect(mapStateToProps,mapDispatchToProps) (Fullwitdh) ;