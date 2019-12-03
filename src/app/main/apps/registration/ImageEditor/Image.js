import React, {useEffect} from 'react';
import {Button,Icon, Typography } from '@material-ui/core';
import {FuseAnimate,FusePageCarded} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import { Link } from 'react-router-dom';
import reducer from '../store/reducers';
import HomePage from './ImageEditor';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import printJS from 'print-js';

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
        height:'180px',
        right: '0',
        top: '15%',
    },

    backGround: {
        width:'100%'
    },

    nameStyle: {
        position: 'absolute',
        top: '57%',
        left: '24%',
        color: 'midnightblue', 
    },

    companyNameStyle: {
        position: 'absolute',
        top: '64%',
        left: '40%',
    },

    photoImg: {
        width:'100%'
    }
}));

function Image(props) {
    
    const dispatch = useDispatch();
    const images = useSelector(({registerApp}) => registerApp.products.data);
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [modalImg, setModalImg] = React.useState(null);
    
    const classes = useStyles();
    
    useEffect(() => {
        dispatch(Actions.getProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(Actions.setImage(images));
    }, [dispatch]);
    
    const { id } = props.match.params;
    const image = images && images.filter((image) => {
        return image.id === parseInt(id);
    });
    const name = image && image[0] && (image[0].firstName + ' ' + image[0].middleName + ' ' + image[0].lastName);
    const imgSrc = image && image[0] && (`data:${image[0].mainPhotoContentType};base64, ${image[0].mainPhoto}`);

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
        };
    }
      
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const print = () => {
        printJS({printable: 'modal-print',type: 'html',scanStyles:true});
    }

    return (
        <div>
            <FusePageCarded
                header = {
                    <div className="flex flex-1 w-full items-center justify-between">
                        <div className="flex items-center">
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/app/registration/registration-forms" color="inherit">
                                    <Icon className="text-32 mr-0 sm:mr-12">arrow_back</Icon>
                                </Typography>
                            </FuseAnimate>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography className="hidden sm:flex" variant="h6">Registration</Typography>
                            </FuseAnimate>
                        </div>
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button onClick={handleOpen} className="whitespace-no-wrap" variant="contained">
                                <span className="hidden sm:flex">Print Badge</span>
                            </Button>   
                        </FuseAnimate>
                        
                    </div>
                }
                content={
                     (
                         <React.Fragment>
                            <HomePage image = {imgSrc} onCrop={setModalImage}/>
                            <Modal
                                aria-labelledby="print-modal-title"
                                aria-describedby="print-modal-description"
                                open={open}
                                onClose={handleClose}
                            >
                                <div style={modalStyle}  className={classes.paper} >
                                    {image && image[0] && (
                                        <React.Fragment>
                                            <div id="modal-print">
                                                <h1 className={classes.nameStyle}>{name}</h1>
                                                <h2 className={classes.companyNameStyle}>{image[0].companyName}</h2>
                                                <img src ='assets/images/background/background.png' className={classes.backGround} alt={'port-0'}   />
                                                <div className={classes.photo}>
                                                    <img src={modalImg} className={classes.photoImg} delay={100} alt={'port-1'}/>
                                                </div>
                                            </div>
                                            
                                            <Button onClick={print} className="whitespace-no-wrap" variant="contained">
                                                <span className="hidden sm:flex">Print Test</span>
                                            </Button>
                                        </React.Fragment>
                                    )}
                                </div>
                            </Modal>
                        </React.Fragment>
                        )
                }
                innerScroll
            />
        </div>
        
    )
}

export default withReducer('registerApp', reducer)(Image);
