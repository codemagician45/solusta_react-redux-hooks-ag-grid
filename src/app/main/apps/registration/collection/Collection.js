import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// import Redux
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

import { FusePageCarded } from '@fuse';
import CollectionTable from './CollectionTable';

function Collection() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Actions.getCollectionAttendees());
    }, [dispatch]);

    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header: "min-h-24 h-24 sm:h-36 sm:min-h-36"
            }}
            content={
                <CollectionTable />
            }
            innerScroll
        />
    );
}

export default withReducer('registerApp', reducer)(Collection);
