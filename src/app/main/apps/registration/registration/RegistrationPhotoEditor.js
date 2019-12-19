import React, { useEffect, useState,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import @material-ui components
import { makeStyles } from '@material-ui/core/styles';

// import reducer
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';

// import utils
import * as Utils from '../../../../utils';

// import component
import PhotoEditor from './PhotoEditor';
import { dispatch } from 'rxjs/internal/observable/pairs';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { FusePageCarded, FuseAnimate } from '@fuse';
import {Icon, IconButton} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles(theme => ({
    success:{
        color:'green',
        fontWeight:'500'
    },
    fail:{
        color:'red',
        fontWeight:'500'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function RegistrationPhotoEditor(props) {
    const dispatch = useDispatch();
    const attendees = useSelector(({ registerApp }) => registerApp.registration.attendees);
    const attendeesSearch = useSelector(({registerApp}) => registerApp.registration.attendeesSearch );
    const searchText = useSelector(({ registerApp }) => registerApp.registration.searchText);
    const printData = (searchText == '') ? (attendees) : (attendeesSearch);

    const attendeeId = props.match.params.id;
    const [attendee, setAttendee] = useState(null);
    const [image, setImage] = useState(null);
    const [openSucess, setOpenSucess] = React.useState(false);
    const [openFail, setOpenFail] = React.useState(false);
    const classes = useStyles();

    const imageRef = useRef();

    useEffect(() => {
        const [temp] = (printData && printData.length > 0) ? printData.filter(item => item.id === parseInt(attendeeId)) : [];
        setImage(`data:${temp && temp.mainPhotoContentType};base64, ${temp && temp.mainPhoto}`);
        // setAttendee(JSON.parse(JSON.stringify(temp)));
        setAttendee(temp)
    }, [printData]);


    const handleCloseSucess = () => {
        setOpenSucess(false);
        props.history.push('/app/attendees/registration');
    };


    const handleCloseFail = () => {
        setOpenFail(false);
        props.history.push('/app/attendees/registration');
    };

    const back = () => {
        props.history.push('/app/attendees/registration');
    }

    const setCroppedImage = (data) => {
        // setImage(data);
        const requestData = {
            ...attendee,
            mainPhotoContentType: data.slice(5, 14),
            mainPhoto: data.slice(22),
        }
        Utils.xapi().put('/attendee-sas', requestData)
            .then(response => {
                dispatch(Actions.updateRegistrationSingleAttendee(response.data));
                setOpenSucess(true);
                dispatch(Actions.setSearchText(''));
            })
            .catch(error => {
                // console.log('update photo error: ', error);
                setOpenFail(true);
                dispatch(Actions.setSearchText(''));

            })
    };

    const selectImg = (e) => {
        if (e.target.files[0]) {
            imageRef.current.loadNewImage(e.target.files[0])
        }
    };

    return (
        <FusePageCarded
            classes={{
                // content: "flex",
                header: "min-h-24 h-24 sm:h-36 sm:min-h-36"
            }}
            header={
                <div className="flex flex-1 w-full items-center justify-between" >
                    <div></div>
                    <div>
                        <IconButton className="w-32 h-32 mx-4 p-0" component="span" onClick={back}>
                            <Icon fontSize="large">arrow_back_icon</Icon>
                        </IconButton>
                        <input
                          accept="image/*"
                          className="hidden"
                          id="button-file"
                          type="file"
                          onChange={selectImg}
                        />
                        <label htmlFor="button-file">
                            <IconButton className="w-32 h-32 mx-4 p-0" component="span">
                                <Icon fontSize="large">publish_icon</Icon>
                            </IconButton>
                        </label>
                        <IconButton className="w-32 h-32 mx-4 p-0" component="span" onClick={(e) => {imageRef.current.saveCroppedImage()}}>
                            <Icon fontSize="large">save_icon</Icon>
                        </IconButton>
                    </div>
                </div>
            }
            content={
                <React.Fragment>
                    <PhotoEditor image={image} onCrop={setCroppedImage} ref={imageRef}/>
                    <Dialog
                        open={openSucess}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseSucess}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Photo Edit Result"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Photo Update <span className={classes.success}>Successed</span>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseSucess} color="primary">
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={openFail}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseFail}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Photo Edit Result"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Photo Update <span className={classes.fail}>Failed</span>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseFail} color="primary">
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            }
            innerScroll
        />
    )
}

export default withRouter(withReducer('registerApp', reducer)(RegistrationPhotoEditor));
