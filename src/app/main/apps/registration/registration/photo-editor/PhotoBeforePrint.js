import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../../store/actions';
import reducer from '../../store/reducers';
import PhotoEditor from '../../components/ImageEditor';
import { makeStyles } from '@material-ui/core/styles';

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
    const dispatch = useDispatch();
    const attendees = useSelector(({ registerApp }) => registerApp.registration.attendees);
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [modalImg, setModalImg] = React.useState(null);
    // const classes = useStyles();
    // const friendlyID = useSelector(({ registerApp }) => registerApp.products.friendlyID);
    // console.log("friendly",friendlyID);

    useEffect(() => {
        dispatch(Actions.getProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(Actions.getFriendlyID(props.match.params.id));
    }, [dispatch]);

    const { id } = props.match.params;
    const attendee = attendees && attendees.filter((attendee) => {
        return attendee.id === parseInt(id);
    });
    // console.log("attendee",attendee)
    const name = attendee && attendee[0] && (attendee[0].firstName + ' ' + attendee[0].middleName + ' ' + attendee[0].lastName);
    const image = attendee && attendee[0] && (`data:${attendee[0].mainPhotoContentType};base64, ${attendee[0].mainPhoto}`);

    const setModalImage = (data) => {
        setModalImg(data);
    }

    function getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
            display:'flex',
            flexDirection:'column'
        };
    }

    return (
        <PhotoEditor image={image} requestData={attendee[0]} onCrop={setModalImage} />
    )
}

export default withReducer('registerApp', reducer)(PhotoBeforePrint);
