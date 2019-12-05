import React from 'react';
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';

function ImageCellRender(props){

    const products = useSelector(({registerApp}) => registerApp.products.data);
    const id = props.data.id;
    // const image_url = products.filter((product) => {return product.id === parseInt(id) })[0].mainPhoto;
    // const image_type = products.filter((product) => {return product.id === parseInt(id) })[0].mainPhotoContentType;

    const style = {
        height:'48px',
        width: '48px',
        padding:'5px'
    };

    if(!products.filter((product) => {return product.id === parseInt(id) })[0].mainPhoto)
        return (
          <img src={'assets/images/avatars/profile.jpg'} width={48} height={48} alt={'profile'} style={{padding:'5px'}}/>
        );
    else {
        return(
          <Link to={`/app/registration/registration-forms/${id}`}>
              <img src={`data:${products.filter((product) => {return product.id === parseInt(id) })[0].mainPhotoContentType};base64, ${products.filter((product) => {return product.id === parseInt(id) })[0].mainPhoto}`} style={style} alt={'profile'}/>
          </Link>
        );

    }
}

export default ImageCellRender;