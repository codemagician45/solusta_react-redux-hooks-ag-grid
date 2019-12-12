import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import @material-ui components
import { makeStyles } from '@material-ui/core/styles';

// import reducer
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// import utils
import * as Utils from '../../../../utils';

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
        display: 'block'
    },
    backGround: {
        width: '100%'
    },
    nameStyle: {
        position: 'absolute',
        top: '57%',
        width: '100%',
        textAlign: 'center',
        color: 'midnightblue',
        textTransform: 'uppercase'
    },
    companyNameStyle: {
        position: 'absolute',
        top: '64%',
        width: '100%',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    photoImg: {
        width: '100%',
        margin: 'auto'
    },
    modal_print: {
        position: 'relative',
        display: 'block'
    },
    friendly: {
        position: 'absolute',
        top: '45%',
        right: '16%',
        fontSize: '24px',
        color: 'darkblue'
    }
}));

function RegistrationPhotoEditor(props) {
    const attendees = useSelector(({ registerApp }) => registerApp.registration.attendees);
    const attendeeId = props.match.params.id;
    const [attendee, setAttendee] = useState(null);
    const [image, setImage] = useState('');

    useEffect(() => {
        const [temp] = (attendees.length > 0) ? attendees.filter(item => item.id === parseInt(attendeeId)) : [];
        setImage(`data:${temp && temp.mainPhotoContentType};base64, ${temp && temp.mainPhoto}`);
        setAttendee(JSON.parse(JSON.stringify(temp)));
    }, [attendees]);

    const setCroppedImage = (data) => {
        setImage(data);
        console.log('image crop data in parent component: ', data);
        const requestData = {
            ...attendee,
            mainPhotoContentType: data.slice(5, 14),
            mainPhoto: data.slice(22),
        }
        Utils.xapi().put('/attendee-sas', requestData)
            .then(response => {
                console.log('update photo success: ', response.data);
                props.history.push('/app/attendees/registration');
            })
            .catch(error => {
                console.log('update photo error: ', error);
            })
    }

    return (
        <PhotoEditor image={image} attendee={attendee} attendeeId={attendeeId} onCrop={setCroppedImage} />
    )
}

export default withRouter(withReducer('registerApp', reducer)(RegistrationPhotoEditor));
