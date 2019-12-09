import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import @material-ui components
import { makeStyles } from '@material-ui/core/styles';

// import reducer
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// import component
import PhotoEditor from './PhotoEditor';

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
    },
    photo: {
        position: 'absolute',
        left: '62%',
        width: '120px',
        height: '180px',
        right: '0',
        top: '15%',
        display:'block'
    },
    backGround: {
        width: '100%'
    },
    nameStyle: {
        position: 'absolute',
        top: '57%',
        width:'100%',
        textAlign:'center',
        color: 'midnightblue',
        textTransform: 'uppercase'
    },
    companyNameStyle: {
        position: 'absolute',
        top: '64%',
        width:'100%',
        textAlign:'center',
        textTransform:'uppercase'
    },
    photoImg: {
        width: '100%',
        margin:'auto'
    },
    modal_print: {
        position:'relative',
        display:'block'
    },
    friendly: {
        position: 'absolute',
        top: '45%',
        right: '16%',
        fontSize: '24px',
        color: 'darkblue'
    }
}));

function PhotoBeforePrint(props) {
    const [image, setImage] = useState(null);

    const attendees = useSelector(({registerApp}) => registerApp.registration.attendees);
    const attendeeId = props.match.params.id;
    const attendee = attendees && attendees.find(attendee => attendee.id === parseInt(attendeeId));

    useEffect(() => {
        setImage(attendee && (`data:${attendee.mainPhotoContentType};base64,${attendee.mainPhoto}`));
    }, [attendee, attendees]);
    
    const setCropppedIamge = (data) => {
        setImage(data);
    }

    console.log('here in image edito: ', attendee);

    return (
        <PhotoEditor image={image} onCrop={setCropppedIamge} />
    )
}

export default withReducer('registerApp', reducer)(PhotoBeforePrint);

    // const requestData = props.requestData;
    // requestData['mainPhoto'] = data.split(',')[1];
    // requestData['mainPhotoContentType'] = data.slice(5, 14);
    // const header = {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
    //   }
    // };
    // const body = {
    //   ...requestData,
    // };
    // axios.put(`${SERVER_LINK}/api/attendee-sas`, body, header)
    //   .then(res => console.log('here in crop image action: ', res.data));
