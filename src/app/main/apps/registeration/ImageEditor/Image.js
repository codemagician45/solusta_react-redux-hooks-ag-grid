import React, {useEffect} from 'react';
import {Icon, Typography } from '@material-ui/core';
import {FuseAnimate,FusePageCarded} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import { Link } from 'react-router-dom';
import reducer from '../store/reducers';
import HomePage from './ImageEditor';
function Image(props)
{
    ////////////////////////////////////////////////
    const dispatch = useDispatch();
    const images = useSelector(({registerApp}) => registerApp.products.data);
    useEffect(() => {
        dispatch(Actions.getProducts());
    }, [dispatch]);
    let id = props.match.params.id;
    // console.log(images)
    let image_url = images.filter((image) => {return image.id = id })[0].mainPhoto;
    let image_type = images.filter((product) => {return product.id = id })[0].mainPhotoContentType;
    const image = `data:${image_type};base64,${image_url}`;
    return (
        <div>
            
            <FusePageCarded
                header = {
                    <FuseAnimate animation="transition.slideRightIn" delay={300}>
                        <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/app/registeration/registeration-forms" color="inherit">
                            <Icon className="mr-4 text-20">arrow_back</Icon>
                            Registeration
                        </Typography>
                    </FuseAnimate>
                }
                content={
                     (<HomePage image = {image} />)
                }
                innerScroll
            />
        </div>
        
    )
}

export default withReducer('registerApp', reducer)(Image);
