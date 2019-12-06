import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import ReactToPrint from 'react-to-print'; // for Print React component

import { Button, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import Redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

import { FuseAnimate, FusePageCarded } from '@fuse';
import RegistrationTable from './RegistrationTable';
import PrintComponent from '../components/PrintComponent';

function Registration()
{
    const printRef = useRef();
    const dispatch = useDispatch();
    const products = useSelector(({registerApp}) => registerApp.products.data);
    const rows = useSelector(({registerApp}) => registerApp.products.rows);
    const backgrounds = useSelector(({registerApp}) => registerApp.products.backgrounds);
    const page = useSelector(({registerApp}) => registerApp.products.page);
    const size = useSelector(({registerApp}) => registerApp.products.size);
    const count = useSelector(({registerApp}) => registerApp.products.count);
    const friendlyID = useSelector(({ registerApp }) => registerApp.products.friendlyID);

    // useEffect(() => {
    //     if (count === 0) {
    //         return; 
    //     } else {
    //         dispatch(Actions.getProducts(page, size));
    //     }
    // }, [dispatch, page, count, size]);

    useEffect(() => {
        dispatch(Actions.getProducts());
    }, [dispatch]);

    return (
        <FusePageCarded
            classes={{
                content: "flex",
              header : "min-h-24 h-24 sm:h-36 sm:min-h-36"
            }}
            header={
                <div className="flex flex-1 w-full items-center justify-between">
                    <Button className="whitespace-no-wrap" color="secondary" variant="contained" style={{visibility:'hidden'}}>Print Before</Button>
                    <ReactToPrint
                        trigger={() => <Button color="secondary" variant="contained">Print Image</Button>}
                        content={() => printRef.current}
                    />
                    <PrintComponent data={products} rows={rows} backgrounds={backgrounds} ref={printRef}/>
                </div>
            }
            content={
                    <RegistrationTable />
            }
            innerScroll
        />
    );
}

export default withReducer('registerApp', reducer)(Registration);
