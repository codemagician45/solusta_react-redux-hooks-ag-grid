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
                header : "min-h-32 h-32 sm:h-36 sm:min-h-36"
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
