import React from 'react';
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';

function ImageCellRender(props){

    const products = useSelector(({registerApp}) => registerApp.products.data);
    const id = props.data.id;
    // const image_url = products.filter((product) => {return product.id === parseInt(id) })[0].mainPhoto;
    // const image_type = products.filter((product) => {return product.id === parseInt(id) })[0].mainPhotoContentType;
    const product = products.filter((product) => {return product.id === parseInt(id) });

    const style = {
        height:'48px',
        width: '48px',
        padding:'5px'
    };

    if(product && product.length > 0 && product[0].mainPhoto === '')
        return (
          <img src={'assets/images/avatars/profile.jpg'} width={48} height={48} alt={'profile'} style={{padding:'5px'}}/>
        );
    else {
        return(
          <Link to={`/app/registration/registration/${id}`}>
              <img src={`data:${product && product.length > 0 && product[0].mainPhotoContentType};base64, ${product && product.length > 0 && product[0].mainPhoto}`} style={style} alt={'profile'}/>
          </Link>
        );

    }
}

export default ImageCellRender;
