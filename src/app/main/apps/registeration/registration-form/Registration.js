import React from 'react';
import {FusePageCarded} from '@fuse';

import RegistrationTable from './RegistrationTable';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';

function Registration()
{
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            // header={
            //     <ProductsHeader/>
            // }
            content={
                <RegistrationTable/>
            }
            innerScroll
        />
    );
}

export default withReducer('registerApp', reducer)(Registration);
