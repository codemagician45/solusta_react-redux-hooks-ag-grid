import React from 'react';
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';

function ImageRender(props){
    const products = useSelector(({registerApp}) => registerApp.products.data);

    let id = props.data.id;
    let image_url = products.filter((product) => {return product.id === parseInt(id) })[0].mainPhoto;
    let image_type = products.filter((product) => {return product.id === parseInt(id) })[0].mainPhotoContentType;

    const style = {
        height:'120px'
    };

    return(
        <Link to={`/app/registration/registration-forms/${id}`}>
            <img src={`data:${image_type};base64, ${image_url}`} style={style} alt={'profile'}/>
        </Link>        
    );
}

export default ImageRender;
