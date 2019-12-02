import React, {useEffect} from 'react';
import {Icon, Typography } from '@material-ui/core';
import {FuseAnimate,FusePageCarded} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';

import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import HomePage from './ImageEditor';

function Image(props)
{
    const dispatch = useDispatch();
    const products = useSelector(({registerApp}) => registerApp.products.data);

    useEffect(() => {
        dispatch(Actions.getProducts());
    }, [dispatch]);

    const { id } = props.match.params;
    const [product] = products && products.filter((product) => {
        return product.id === parseInt(id);
    });
    const image = product && `data:${product.mainPhotoContentType};base64, ${product.mainPhoto}`;
    // console.log('here in hook: ', product, image);

    return (
        <React.Fragment>
            <FusePageCarded
                header = {
                    <FuseAnimate animation="transition.slideRightIn" delay={300}>
                        <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/app/registration/registration-forms" color="inherit">
                            <Icon className="mr-4 text-20">arrow_back</Icon>
                            Registration
                        </Typography>
                    </FuseAnimate>
                }
                content={
                     (<HomePage image={image} />)
                }
                innerScroll
            />
        </React.Fragment>
    )
}

export default withReducer('registerApp', reducer)(Image);
