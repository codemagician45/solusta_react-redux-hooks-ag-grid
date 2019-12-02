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

function Image(props)
{
    const dispatch = useDispatch();
    const images = useSelector(({registerApp}) => registerApp.products.data);
    useEffect(() => {
        dispatch(Actions.getProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(Actions.setImage(images));
    }, [dispatch]);

    let id = props.match.params.id;
    let image_url = images.filter((image) => {return image.id = id })[0].mainPhoto;
    let image_type = images.filter((product) => {return product.id = id })[0].mainPhotoContentType;
    const firstName = images.filter((product) => {return product.id = id })[0].firstName;
    const middleName = images.filter((product) => {return product.id = id })[0].middleName;
    const lastName = images.filter((product) => {return product.id = id })[0].lastName;
    const companyName = images.filter((product) => {return product.id = id })[0].companyName;
    const name = firstName+' '+middleName+' '+lastName;
    const image = `data:${image_type};base64,${image_url}`;
    function getModalStyle() {
        const top = 50;
        const left = 50;
        
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
      
    const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
    },
    }));
    const photo = {
        position: 'absolute',
        left: '62%',
        width: '120px',
        height:'180px',
        right: '0',
        top: '15%',
    }
    const background = {
        width:'100%'
    }
    const name_style = {
        position: 'absolute',
        top: '57%',
        left: '24%',
        color: 'midnightblue',
    }
    const companyName_style = {
        position: 'absolute',
        top: '64%',
        left: '40%',
    }
    const photo_img = {
        width:'100%'
    }

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <FusePageCarded
                header = {
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex items-center">
                            <FuseAnimate animation="transition.expandIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/app/registeration/registeration-forms" color="inherit">
                                    <Icon className="text-32 mr-0 sm:mr-12">arrow_back</Icon>
                                </Typography>
                            </FuseAnimate>
                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography className="hidden sm:flex" variant="h6">Registeration</Typography>
                            </FuseAnimate>
                        </div>
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button onClick={handleOpen} className="whitespace-no-wrap" variant="contained">
                                <span className="hidden sm:flex">Print Badge</span>
                                {/* <span className="flex sm:hidden">New</span> */}
                            </Button>
                        </FuseAnimate>
                    </div>
                }
                content={
                     (
                         <div>
                            <HomePage image = {image} />
                            <Modal
                                aria-labelledby="print-modal-title"
                                aria-describedby="print-modal-description"
                                open={open}
                                onClose={handleClose}
                            >
                                <div style={modalStyle}  className={classes.paper}>
                                    <h1 style={name_style}>{name}</h1>
                                    <h2 style={companyName_style}>{companyName}</h2>
                                    <img src ='assets/images/background/background.png' style={background}/>
                                    <div style={photo}>
                                        <img src = {image} style={photo_img} delay={100}/>
                                    </div>
                                    
                                </div>
                            </Modal>
                        </div>
                        )
                }
                innerScroll
            />
        </div>
        
    )
}

export default withReducer('registerApp', reducer)(Image);
