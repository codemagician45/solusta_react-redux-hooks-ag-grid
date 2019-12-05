import React from 'react';
import { Button } from '@material-ui/core';
import { FuseAnimate, FusePageCarded } from '@fuse';
import RegistrationTable from './RegistrationTable';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import printJS from 'print-js';
import {Link} from 'react-router-dom';

function Registration()
{
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            // header={
            //     <div className="flex flex-1 w-full items-center justify-between">
            //         <FuseAnimate animation="transition.slideRightIn" delay={300}>
            //             <Button component={Link} to="/app/registration/mass-print-preview" className="whitespace-no-wrap" color="secondary" variant="contained">
            //                 <span className="hidden sm:flex">Print Multiple Badge</span>
            //             </Button>
            //         </FuseAnimate>
            //     </div>   
            // }
            content={
                    <RegistrationTable/>   
            }
            innerScroll
        />
    );
}

export default withReducer('registerApp', reducer)(Registration);
