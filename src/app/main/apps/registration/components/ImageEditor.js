import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import { Button, Icon, Typography } from '@material-ui/core';
// import {Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";

import { Link } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';

// import env server link
const environment = require('../RegistrationEnv');
const SERVER_LINK = (environment.env === 'server') ? environment.ServerLink.prod : environment.ServerLink.env;

const icona = require("tui-image-editor/dist/svg/icon-a.svg");
const iconb = require("tui-image-editor/dist/svg/icon-b.svg");
const iconc = require("tui-image-editor/dist/svg/icon-c.svg");
const icond = require("tui-image-editor/dist/svg/icon-d.svg");

const myTheme = {
  "menu.backgroundColor": "white",
  "common.backgroundColor": "#151515",
  "downloadButton.backgroundColor": "white",
  "downloadButton.borderColor": "white",
  "downloadButton.color": "black",
  "menu.normalIcon.path": icond,
  "menu.activeIcon.path": iconb,
  "menu.disabledIcon.path": icona,
  "menu.hoverIcon.path": iconc,
};

const useStyles = makeStyles(theme => ({
  save_div: {
    display:'flex',
    justifyContent:'space-between'
  },
}));

function PhotoEditor(props) {
  // console.log("single data for updating",props)
  const dispatch = useDispatch();
  const [image, setImage] = useState(props.image);
  const [data,setData] = useState(props.requestData);
  const [rect, setRect] = useState(null);
  const imageEditor = React.createRef();
  const classes = useStyles();

  useEffect(() => {
    setImage(props.image);
  }, [props.image]);

  useEffect(() => {
    setData(props.requestData);
  }, [props.requestData]);

  useEffect(() => {
    props.onCrop(image);
  }, [props, image]);

  const saveImageToDisk = () => {
    const { imageEditorInst } = imageEditor.current;
    const data = imageEditorInst.toDataURL();
    setImage(data);
    console.log('here in cropped data: ', data);
    
    const requestData = props.requestData;
    requestData['mainPhoto'] = data.split(',')[1];
    requestData['mainPhotoContentType'] = data.slice(5, 14);
    const header = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt_access_token')}`,
      }
    };
    const body = {
      ...requestData,
    };
    axios.put(`${SERVER_LINK}/api/attendee-sas`, body, header)
      .then(res => console.log('here in crop image action: ', res.data));
    // console.log(data.slice(5, 14));
    // dispatch(Actions.setImage(requestData));
  };

  // const setCropImage = (e) => {
  //   const cropRect = {
  //     left: e.left,
  //     top: e.top,
  //     width: e.width,
  //     height: e.height,
  //   };
  //   setRect(cropRect);
  // }
  
   return (
      <React.Fragment>
        <div className={classes.save_div}>
          <Typography className="normal-case flex items-center" component={Link} role="button" to="/app/registration/registration" color="inherit">
              <Icon className="text-32 mr-0 sm:mr-12">arrow_back</Icon>
              Back
          </Typography>
          <Button variant="contained" color="secondary" onClick={saveImageToDisk}>Save Cropped Result</Button>
        </div>
        <ImageEditor
          includeUI={{
            loadImage: {
              path: image,
              name: 'SampleImage'
            },
            theme: myTheme,
            menu: ["crop", "flip", "rotate", "draw", "shape", "text", "filter"],
            initMenu: "",
            uiSize: {
              height: `calc(100vh - 20px)`,
            },
            menuBarPosition: "bottom",
          }}
          cssMaxHeight={window.innerHeight}
          cssMaxWidth={window.innerWidth}
          selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70,
          }}
          usageStatistics={true}
          ref={imageEditor}
        />
        
      </React.Fragment>
    );
  }

  export default withReducer('registerApp', reducer)(PhotoEditor);
