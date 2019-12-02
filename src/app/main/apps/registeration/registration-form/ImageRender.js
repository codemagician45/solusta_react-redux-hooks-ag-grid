import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link} from 'react-router-dom';

import * as Actions from '../store/actions';

function ImageRender(props){
    const dispatch = useDispatch();
    const products = useSelector(({registerApp}) => registerApp.products.data);

    useEffect(() => {
        dispatch(Actions.getProducts());
    }, [dispatch]);

    let id = props.data.id;
    let image_url = products.filter((product) => {return product.id = id })[0].mainPhoto;
    let image_type = products.filter((product) => {return product.id = id })[0].mainPhotoContentType;

    const style = {
        height:'120px'
    };

    return(
        <Link to={`/app/registration/registration-forms/${id}`}>
            <img src={`data:${image_type};base64,${image_url}`} style={style} alt={'profile'}/>
        </Link>        
    )
}

export default ImageRender;
