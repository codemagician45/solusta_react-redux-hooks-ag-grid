import React from 'react';
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';

function ImageRender(props){

    const products = useSelector(({registerApp}) => registerApp.products.data);
    const id = props.data.id;
    const product = products.filter((product) => {return product.id === parseInt(id) })[0];

    if (!product.mainPhoto) {
        return (
          <img src={'assets/images/avatars/profile.jpg'} width={48} height={48} alt={'profile'} style={{padding:'5px'}}/>
        );
    }
    else {
        return (
          <Link to={`/app/registration/registration-forms/${id}`}>
              <img src={`data:${product.mainPhotoContentType};base64, ${product.mainPhoto}`} width={48} height={48} alt={'profile'} style={{padding:'5px'}}/>
          </Link>
        );
    }
}

export default ImageRender;
