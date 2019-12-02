import React from 'react';
import {FusePageCarded} from '@fuse';
import RegisterationTable from './RegisterationTable';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
// import reducer from '../../app-solusta/store/reducers';

function Registeration()
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
                <RegisterationTable/>
            }
            innerScroll
        />
    );
}
export default withReducer('registerApp', reducer)(Registeration);